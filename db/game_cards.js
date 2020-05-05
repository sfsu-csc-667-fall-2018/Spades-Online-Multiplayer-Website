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
}

/* PROMISE */
/* uses an array of shuffled indexes to create a shuffled deck in the db */
/*  */
const createDeck = async (game_room_id, player_id_array) => { 
    var shuffledArr = shuffledArray(); // returns a shuffled array of indexes
    var card_id = 1;
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 13; j++) {
            await db.none(`INSERT INTO game_cards (game_id, player_id, card_id, card_order) VALUES (
                ${ game_room_id },
                ${ player_id_array[i] },
                ${ card_id },
                ${ shuffledArr[card_id - 1] }
              )`);
            card_id++;
        }
    } 
}

/* PROMISE */
/* delete a 'game_deck' from the db based on the deck's 'id' */
/* returns 'true' if id/row deleted 'error' if no id/row exists */
const deleteDeck = ( game_id ) => {
    return db.none(`DELETE FROM game_cards WHERE game_id=${ game_id }`);
}
/* PROMISE */
/* get a card from a deck in 'decks' table */
/* returns the 'card' object at 'index' in the deck associated with 'id' */
const getCard = ( deck_id, card_index ) => {
    if(card_index >= 1 && card_index <= 52 ) { 
        return db.one(`SELECT * FROM cards WHERE id= (SELECT card_${ card_index } FROM decks WHERE id=${ deck_id })`);
    } else {
        return undefined;
    }
}

module.exports = {
    createDeck,
    deleteDeck,
    getCard
};