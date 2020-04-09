const express = require('express');
const router = express.Router();
const user = require('../../db/user');

//express validator
//for now ensure fields have values

const validator = (request, password) => {
  require.checkBody("username_value", "Please enter a username").notEmpty();
  require.checkBody("password_value", "Please Enter a password").notEmpty();
  require.checkBody("confirmPassword", "Passwords must match").notEmpty().equals(password);

  return request.validatonErrors();
};

router.get('/', (request, response) => {
  response.render('register');
});

router.post('/', (request, response) => {
  const {username_value: username, password_value: password} = req.body;
  const errors = validator(request, password);

  if(errors){
    response.render('register', {errors: errors});
  }else {

    user.createUser(username, password)
      .then(() => {
        response.render('login');        
      })
      .catch(error => {

      const {message} = error;

      response.render('register', {
        errors: [
          {
            message: message    
          }
        ]
      });
    });
  }
});

module.exports = router;