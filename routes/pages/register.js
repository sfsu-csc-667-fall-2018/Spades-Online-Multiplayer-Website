const express = require('express');
const router = express.Router();
const user = require('../../db/player');

//express validator
//const { check, validationResult } = require('express-validator');
//for now ensure fields have values

//validator updated, needs fixing
/*const validator = (request, password) => {
  // console.log("Password entered: " + password);
  check("username_value", "Please enter a username").notEmpty();
  check("password_value", "Please Enter a password").notEmpty();
  check("confirmPassword", "Passwords must match").notEmpty().equals(password);

  return request.validatonErrors();
};*/

router.get('/', (request, response) => {
  response.render('register');
});

router.post('/', (request, response) => {
  // const errors = validator(request, request.body.password);
  const errors = false;
  if(errors){
    response.render('register', {errors: errors});
  }else {

    user.createUser(
        request.body.first_name,
        request.body.last_name,
        request.body.username,
        request.body.email,
        request.body.password
      )
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