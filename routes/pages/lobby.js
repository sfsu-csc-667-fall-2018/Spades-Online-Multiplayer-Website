const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../config/passport/isAuthenticated');

router.get('/', isAuthenticated, (request, response) => {
    const { user } = request;
    const err = request.query.error;

    response.render('lobby', { user: user, error: err });
});

/*router.post('/creategame', isAuthenticated, (request, response) => {
    const { user } = request;


});*/

router.get('/logout', (request, response) => {
    request.logout();
    response.redirect('/');
});

module.exports = router;