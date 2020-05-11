const db = require('./index');

const getCard = (card_id) => {
    return db.one(`SELECT * FROM cards WHERE id=${ card_id };`);
};

const getSuit = (card_id) => {
    return db.one(`SELECT suit FROM cards WHERE id=${ card_id };`);
};

const getValue = (card_id) => {
    return db.one(`SELECT value FROM cards WHERE id=${ card_id };`);
};

const getName = (card_id) => {
    return db.one(`SELECT name FROM cards WHERE id=${ card_id };`);
};

const getImage = (card_id) => {
    return db.one(`SELECT image FROM cards WHERE id=${ card_id };`);
};

module.exports = {
    getCard,
    getSuit,
    getValue,
    getName,
    getImage
};