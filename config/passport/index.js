const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require('../../db/player');

//set up database actions for user

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    user.findUserId(id)
        .then(({ id, username }) => done(null, { id, username }))
        .catch(error => done(error));
});

passport.use(new LocalStrategy((username, pass, done) => {

    user.findUsername(username)
        .then(({ id, username, password }) => {
            if (password == pass) {
                return done(null, { id, username });
            } else {
                return done(null, false, {
                    message: "User Credentials Incorrect"
                });
            }
        })
        .catch(error => {
            done(null, false, { error })
            console.log(error);
        });
}));

module.exports = passport;