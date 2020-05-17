const db = require('./index');

/* returns an array of shuffled 'indexes' to correspond with card ids from db table 'cards' */
const shuffledArray = () => {
    var unshuffledCards = [];
    var shuffledCards = [];
    for(let i = 1; i <= 52; i++) {
        unshuffledCards.push(i);
    }
    for(let i = 0; i < 52; i++) {
        shuffledCards.push(unshuffledCards.splice(Math.floor(Math.random() * (52 - i)), 1).pop());
    }
    return shuffledCards;
};

/* uses an array of shuffled indexes to create a shuffled deck in the db */
/* game_id(FK), player_id(FK), card_id(FK), card_order */
const createDeck = async (game_room_id, player_id_array) => { 
    var shuffledArr = shuffledArray(); // returns a shuffled array of indexes
    var card_id = 1;
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 13; j++) {
            await db.none(`INSERT INTO game_cards (game_id, player_id, card_id, card_order) VALUES (
                ${ game_room_id },
                ${ player_id_array[i].player_id },
                ${ shuffledArr[card_id - 1] },
                ${ card_id }
              );`);
            card_id++;
        }
    } 
};

/* delete cards associated with a 'game_room' */
const deleteDeck = ( game_id ) => {
    return db.none(`DELETE FROM game_cards WHERE game_id=${ game_id };`);
};

/* delete card associated with 'card_index' or 'card_order' */
const deleteCard = ( game_id, card_index ) => {
    return db.none(`DELETE FROM game_cards WHERE game_id=${ game_id } AND card_order=${ card_index };`);
};

/* return the 'card' with the given 'card_id' */
const getCard = ( card_id ) => {
    return db.one(`SELECT * FROM cards WHERE id=${ card_id };`);
};

/* returns the 'card' at ('card_index' OR 'card_order') in the deck associated with 'game_id' */
const getCardAt = ( game_id, card_index ) => {
    return db.one(`SELECT * FROM game_cards, cards WHERE card_id=cards.id AND game_id=${ game_id } AND card_order=${ card_index };`);
};

/* returns the next card associated with a 'player' based on card_order low to high */
const getNextCard = ( game_id, player_id ) => {
    return db.one(`SELECT * FROM game_cards, cards WHERE card_id = cards.id AND game_id=${ game_id } AND player_id=${ player_id } ORDER BY card_order ASC LIMIT 1;`);
};

/* returns an array of 'cards' from a 'player' in a 'game_room' */
const getPlayerCards = ( game_id, player_id ) => {
    return db.manyOrNone(`SELECT * FROM game_cards, cards WHERE card_id=cards.id AND game_id=${ game_id } AND player_id=${ player_id } ORDER BY card_order ASC;`);
};

/* returns an array of 'cards' from a 'game_room' */
const getGameCards = ( game_id ) => {
    return db.manyOrNone(`SELECT * FROM game_cards, cards WHERE card_id=cards.id AND game_id=${ game_id } ORDER BY card_order ASC;`);
};

const deckReady = async (game_id) => {
    result = await db.one(`SELECT EXISTS(SELECT * FROM game_cards WHERE game_id=${ game_id });`);
    return result.exists;
};

const setCardToInPlay = (game_id, card_id) => {
    return db.none(`UPDATE game_cards SET card_order=0 WHERE game_id=${ game_id } AND card_id=${ card_id };`);
}
/******************2.0********************** */
const deleteInPlayCards = (gameId) => {
    return db.none(`DELETE FROM game_cards WHERE game_id=${gameId} AND card_order=0`)
}
/******************2.0********************** */

module.exports = {
    createDeck,
    deleteDeck,
    deleteCard,
    getCard,
    getCardAt,
    getNextCard,
    getPlayerCards,
    getGameCards,
    deckReady,
    setCardToInPlay,
    deleteInPlayCards
};