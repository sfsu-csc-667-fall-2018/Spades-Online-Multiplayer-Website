const db = require('./index');

//create user in db
const createUser = (first_name, last_name, username, email, password) => {
    return db.none(`INSERT INTO player (first_name, last_name, username, email, password) VALUES (
        '${first_name}', 
        '${last_name}', 
        '${username}', 
        '${email}',
        '${password}'
      )`);
};

//find user by username/user id
const findUsername = (username) => {
    return db.one("SELECT * FROM users WHERE username = $1", [username]);
};

const findUserId= (user_id) => {
    return db.one("SELECT * FROM users WHERE user_id = $1", [user_id]);
};

module.exports = {
    createUser,
    findUsername,
    findUserId
};