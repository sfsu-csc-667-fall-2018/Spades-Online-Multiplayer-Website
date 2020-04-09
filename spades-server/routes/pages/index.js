const express = require('express');
const router = express.Router();
const db = require('../../db');

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

router.post('/users/register', (request, response, _) => {
  db.any(
    `INSERT INTO player (first_name, last_name, username, email, password) VALUES (
        '${request.body.first_name}', 
        '${request.body.last_name}', 
        '${request.body.username}', 
        '${request.body.email}',
        '${request.body.password}'
      )`
  )
  .then( results => response.json( results ) )
  .catch( error => {
    console.log( error )
    response.json({ error })
  });
  response.render('index', {
    title: 'Index'
  });
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