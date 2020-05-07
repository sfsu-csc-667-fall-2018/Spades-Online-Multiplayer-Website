const db = require('./index');

//create player in db
const createUser = (first_name, last_name, username, email, password) => {
    return db.none(`INSERT INTO player (first_name, last_name, username, email, password) VALUES (
        '${first_name}', 
        '${last_name}', 
        '${username}', 
        '${email}',
        '${password}'
      )`);
};

//find player by username/id
const findUsername = (username) => {
    return db.one(`SELECT * FROM player WHERE username = '${username}'`);
};

const findUserId = (id) => {
    return db.one(`SELECT * FROM player WHERE id = '${id}'`);
};

module.exports = {
    createUser,
    findUsername,
    findUserId
};