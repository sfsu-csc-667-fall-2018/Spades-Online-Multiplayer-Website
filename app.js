const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

if (process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}

const indexRouter = require('./routes/pages/index');
const lobbyRouter = require('./routes/pages/lobby');
const registerRouter = require('./routes/pages/register');
const gameRouter  = require('./routes/api/game');
//const testsRouter = require('./routes/test');
const passport = require('./config/passport');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'ssssh', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/lobby', lobbyRouter);
app.use('/game', gameRouter);
//app.use('/tests', testsRouter);
app.use('/*', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err);
    res.render('error');
});

module.exports = app;