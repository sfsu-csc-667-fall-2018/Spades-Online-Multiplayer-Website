const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (request, response, next) => {
  response.render('index', { 
    title: 'Index' 
  });
});

router.get('/users/register', (request, response, next) => {
  response.render('unauthenticated/register', {
    title: 'Register'
  })
});

router.get('/users/login', (request, response, next) => {
  response.render('unauthenticated/login', {
    title: 'Login'
  })
});

router.get('/users/layout', (request, response, next) => {
  response.render('unauthenticated/layout', {
    title: 'Layout'
  })
});

module.exports = router;
