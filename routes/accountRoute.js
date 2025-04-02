const { Router } = require('express');
const { handleErrors } = require('../utilities');
const {
  buildLogin,
  buildSignup,
  signupUser,
} = require('../controllers/accountController');

const accountRouter = new Router();

accountRouter.get('/login', handleErrors(buildLogin));
accountRouter.get('/signup', handleErrors(buildSignup));
accountRouter.post('/signup', handleErrors(signupUser));

module.exports = accountRouter;
