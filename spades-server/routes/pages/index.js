const express = require('express');
const router = express.Router();
const passport = require('../../config/passport');
const db = require('../../db');

/* GET login page or go to lobby if auth */
router.get('/', (request, response) => {
  if(request.isAuthenticated()) {
    response.redirect('/lobby');
  }else{
    response.render('login');
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/lobby',
  failureRedirect: '/'
  })
);

module.exports = router;