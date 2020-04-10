const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../config/passport/isAuthenticated');
const io = require('../../http/socket');
const lobbyIO = io.of('/lobby');

router.get('/', isAuthenticated, (request, response) => {
    const { user } = request;
    const err = request.query.error;

    response.render('lobby', { user: user, error: err });

});

module.exports = router;