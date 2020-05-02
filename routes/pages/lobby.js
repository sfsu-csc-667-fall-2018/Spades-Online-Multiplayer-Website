const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../config/passport/isAuthenticated');
//const io = require('../../socket');
//const lobbyIO = io.of('/lobby');

router.get('/', isAuthenticated, (request, response) => {
    const { user } = request;
    const err = request.query.error;

    response.render('lobby', { user: user, error: err });
});

router.get('/logout', (request, response) => {
    request.logout();
    response.redirect('/');
});

/*lobbyIO.on('connection', socket => {
    console.log('connected to lobby');
});*/

module.exports = router;