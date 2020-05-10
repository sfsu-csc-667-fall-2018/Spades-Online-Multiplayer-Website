const db = require('./index');
const game = require('./game');

const getEmptyPostion = ( position_arr ) => {
    if(position_arr.length == 0)  return 1;
    if(!position_arr.some(element => element.position === 1)) return 1;
    if(!position_arr.some(element => element.position === 2)) return 2;
    if(!position_arr.some(element => element.position === 3)) return 3;
    if(!position_arr.some(element => element.position === 4)) return 4;
}

const getPositions = ( game_id ) => {
    return db.manyOrNone(`SELECT position from games_players WHERE game_id=${ game_id };`);
};

const addPlayer = async ( game_id, player_id ) => {
    var position_arr = await getPositions( game_id );
    var emptyPos = getEmptyPostion( position_arr );
    var team = getTeam(emptyPos);
    return db.none(`INSERT INTO games_players (game_id, player_id, position, team) VALUES (
        ${ game_id },
        ${ player_id },
        ${ emptyPos },
        ${ team }
    );`);
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

const getPlayers = (gameId) => {
    return db.one(`SELECT player_id FROM games_players WHERE game_id = '${gameId}'`);
};  

module.exports = {
    // getPositions,
    addPlayer,
    checkPlayerExists,
    checkInGame,
    getPlayers,
    getTeam
};