const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../config/passport/isAuthenticated');
<<<<<<< HEAD
=======
const io = require('../../http/socket');
const lobbyIO = io.of('/lobby');
>>>>>>> 82ea49de4803b3f7c4e47b905c31fd3b66d9dbbd

router.get('/', isAuthenticated, (request, response) => {
    const { user } = request;
    const err = request.query.error;

    response.render('lobby', { user: user, error: err });
<<<<<<< HEAD
});

router.get('/logout', (request, response) => {
    request.logout();
    response.redirect('/');
=======

>>>>>>> 82ea49de4803b3f7c4e47b905c31fd3b66d9dbbd
});

module.exports = router;