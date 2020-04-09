const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require('../../db/user');

//set up database actions for user

passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser((user_id, done) => {

});

passport.use(new LocalStrategy((username, password, done) => {

    user.findUsername(username)
        .then(({user_id, username, password: storedPW}) => {
            if(password === storedPW){
                return done(null, {user_id, username});
            }else {
                return done(null, false, {
                    message: "User Credentials Incorrect"
                });
            }
        })
        .catch(error => done(null, false, {error}));
    })
);

module.exports = passport;