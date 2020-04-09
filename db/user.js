const db = require('./index');

//create user in db
const createUser = (username, password) => {
    return db.none("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password]);
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