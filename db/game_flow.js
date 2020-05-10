const db = require('./index');

const setFlow = (game_id, leading_suit, trick_pos, round_pos) => {
    return db.none(`INSERT INTO game_flow (game_id, leading_suit, trick_pos, round_pos) VALUES (
        ${ game_id },
        ${ leading_suit },
        ${ trick_pos },
        ${ round_pos }
    );`);
}

const initFlow = (game_id) => {
    return setFlow(game_id, -1, 1, 1);
}

const setLeadingSuit = (game_id, leading_suit) => {
    return db.none(`UPDATE game_flow SET leading_suit=${ leading_suit } WHERE game_id=${ game_id };`);
}

const setTrickPos = (game_id, trick_pos) => {
    return db.none(`UPDATE game_flow SET trick_pos=${ trick_pos } WHERE game_id=${ game_id };`);
}

const setRoundPos = (game_id, round_pos) => {
    return db.none(`UPDATE game_flow SET round_pos=${ round_pos } WHERE game_id=${ game_id };`);
}

const getFlow = (game_id) => {
    return db.one(`SELECT * FROM game_flow WHERE game_id=${ game_id };`);
}

const getLeadingSuit = (game_id) => {
    return db.one(`SELECT leading_suit FROM game_flow WHERE game_id=${ game_id };`);
}

const getTrickPos = (game_id) => {
    return db.one(`SELECT leading_suit FROM game_flow WHERE game_id=${ game_id };`);
}

const getRoundPos = (game_id) => {
    return db.one(`SELECT leading_suit FROM game_flow WHERE game_id=${ game_id };`);
}

const deleteFlow = (game_id) => {
    return db.none(`DELETE FROM game_flow WHERE game_id=${ game_id }`)
}

module.exports = {
    initFlow,
    setFlow,
    setLeadingSuit,
    setTrickPos,
    setRoundPos,
    getFlow,
    getLeadingSuit,
    getTrickPos,
    getRoundPos,
    deleteFlow
};