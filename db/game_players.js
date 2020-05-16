const db = require('./index');
const game = require('./game');

const getEmptyPostion = ( position_arr ) => {
    if( position_arr.length < 4 ) {
        return position_arr.length + 1
    } else {
        return null;
    }
    
}

const getPositions = ( game_id ) => {
    return db.manyOrNone(`SELECT position from games_players WHERE game_id=${ game_id };`);
};

const addPlayer = ( game_id, player_id ) => {
    return new Promise(function(resolve, reject) { 
        getPositions( game_id )
        .then((positions) => {
            console.log("POSITIONS: ", positions)
            var emptyPos = getEmptyPostion( positions );
            if(emptyPos != null) {
                var team = getTeam(emptyPos);
                console.log("game_id: ", game_id)
                console.log("player: ", player_id)
                console.log("emptyPos: ", emptyPos)
                console.log("team: ", team)
                db.none(`INSERT INTO games_players (game_id, player_id, position, team) VALUES ($1,$2,$3,$4)`, 
                [game_id, player_id, emptyPos, team])
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject("Failed to add player to games_players")
                })
            } else {
                reject("GAME ALREADY FULL")
            }
            
        })
        .catch((error) => {
            reject("Failed to get positions")
        })
    })  
};

/* returns { exists: true } OR { exists: false } */
const checkPlayerExists = (game_id, player_id) => {
    return db.one(`SELECT EXISTS(SELECT * FROM games_players WHERE game_id=${ game_id } AND player_id=${ player_id });`);
}

const getTeam = (position) => {
    if(position == 1 || position == 3) return 1; 
    if(position == 2 || position == 4) return 2;
};

const checkInGame = (playerId) => {
    return db.any(`SELECT game_id FROM games_players WHERE player_id = '${playerId}'`);
  };


const getNumPlayers = (gameId) => {
    return db.one(`SELECT COUNT(*) FROM games_players WHERE game_id=${ gameId };`);
};

const getPlayers = (gameId) => {
    return db.many(`SELECT * FROM games_players WHERE game_id=${ gameId };`);
};

const getPlayer = (gameId, playerId) => {
    return db.oneOrNone(`SELECT * FROM games_players WHERE game_id=${gameId} AND player_id=${playerId};`);
}

const getPlayerPos = (gameId, playerId) => {
    return db.oneOrNone(`SELECT position FROM games_players WHERE game_id=${gameId} AND player_id=${playerId};`);
}

module.exports = {
    // getPositions,
    addPlayer,
    checkPlayerExists,
    checkInGame,
    getNumPlayers,
    getPlayers,
    getTeam,
    getPlayer,
    getPlayerPos
};