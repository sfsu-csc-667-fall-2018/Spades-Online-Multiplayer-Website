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
/* returns the inserted deck 'id' */
const createDeck = () => { 
    var shuffledArr = shuffledArray(); // returns a shuffled array of indexes
    return db.one(`INSERT INTO decks (
        card_1,
        card_2,
        card_3,
        card_4,
        card_5,
        card_6,
        card_7,
        card_8,
        card_9,
        card_10,
        card_11,
        card_12,
        card_13,
        card_14,
        card_15,
        card_16,
        card_17,
        card_18,
        card_19,
        card_20,
        card_21,
        card_22,
        card_23,
        card_24,
        card_25,
        card_26,
        card_27,
        card_28,
        card_29,
        card_30,
        card_31,
        card_32,
        card_33,
        card_34,
        card_35,
        card_36,
        card_37,
        card_38,
        card_39,
        card_40,
        card_41,
        card_42,
        card_43,
        card_44,
        card_45,
        card_46,
        card_47,
        card_48,
        card_49,
        card_50,
        card_51,
        card_52
    ) VALUES (
        ${ shuffledArr[0]  },
        ${ shuffledArr[1]  },
        ${ shuffledArr[2]  },
        ${ shuffledArr[3]  },
        ${ shuffledArr[4]  },
        ${ shuffledArr[5]  },
        ${ shuffledArr[6]  },
        ${ shuffledArr[7]  },
        ${ shuffledArr[8]  },
        ${ shuffledArr[9]  },
        ${ shuffledArr[10] },
        ${ shuffledArr[11] },
        ${ shuffledArr[12] },
        ${ shuffledArr[13] },
        ${ shuffledArr[14] },
        ${ shuffledArr[15] },
        ${ shuffledArr[16] },
        ${ shuffledArr[17] },
        ${ shuffledArr[18] },
        ${ shuffledArr[19] },
        ${ shuffledArr[20] },
        ${ shuffledArr[21] },
        ${ shuffledArr[22] },
        ${ shuffledArr[23] },
        ${ shuffledArr[24] },
        ${ shuffledArr[25] },
        ${ shuffledArr[26] },
        ${ shuffledArr[27] },
        ${ shuffledArr[28] },
        ${ shuffledArr[29] },
        ${ shuffledArr[30] },
        ${ shuffledArr[31] },
        ${ shuffledArr[32] },
        ${ shuffledArr[33] },
        ${ shuffledArr[34] },
        ${ shuffledArr[35] },
        ${ shuffledArr[36] },
        ${ shuffledArr[37] },
        ${ shuffledArr[38] },
        ${ shuffledArr[39] },
        ${ shuffledArr[40] },
        ${ shuffledArr[41] },
        ${ shuffledArr[42] },
        ${ shuffledArr[43] },
        ${ shuffledArr[44] },
        ${ shuffledArr[45] },
        ${ shuffledArr[46] },
        ${ shuffledArr[47] },
        ${ shuffledArr[48] },
        ${ shuffledArr[49] },
        ${ shuffledArr[50] },
        ${ shuffledArr[51] }
    ) RETURNING id`);
}

/* PROMISE */
/* delete a 'game_deck' from the db based on the deck's 'id' */
/* returns 'true' if id/row deleted 'error' if no id/row exists */
const deleteDeck = async (id) => {
    return db.one(`DELETE FROM decks WHERE id=${ id } RETURNING TRUE`);
}

module.exports = {
    createDeck,
    deleteDeck
};