const db = require('./index');

const getEmptyPostion = ( position_arr ) => {
    if(position_arr.length == 0)  return 0;
    if(!position_arr.some(element => element.position === 0)) return 0;
    if(!position_arr.some(element => element.position === 1)) return 1;
    if(!position_arr.some(element => element.position === 2)) return 2;
    if(!position_arr.some(element => element.position === 3)) return 3;
}

const getPositions = ( game_id ) => {
    return db.manyOrNone(`SELECT position from games_players WHERE game_id=${ game_id };`);
};

const addPlayer = async ( game_id, player_id ) => {
    var position_arr = await getPositions( game_id );
    var emptyPos = getEmptyPostion( position_arr );
    return db.none(`INSERT INTO games_players (game_id, player_id, position) VALUES (
        ${ game_id },
        ${ player_id },
        ${ emptyPos }
    );`);
};

const checkPlayerExists = (game_id, player_id) => {
    // select exists(select 1 from contact where id=12)
    return db.one(`SELECT EXISTS(SELECT * FROM games_players WHERE game_id=${ game_id } AND player_id=${ player_id });`);
}

module.exports = {
    // getPositions,
    addPlayer,
    checkPlayerExists
};