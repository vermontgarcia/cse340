const { Router } = require('express');
const { handleErrors } = require('../utilities');
const {
  buildLogin,
  buildSignup,
  signupUser,
  loginUser,
  buildAccount,
} = require('../controllers/accountController');
const {
  signupRules,
  loginRules,
  checkUserData,
} = require('../utilities/account-validation');

const accountRouter = new Router();

accountRouter.get('/', handleErrors(buildAccount));

accountRouter.get('/login', handleErrors(buildLogin));
accountRouter.get('/signup', handleErrors(buildSignup));

accountRouter.post(
  '/signup',
  signupRules(),
  checkUserData,
  handleErrors(signupUser)
);

accountRouter.post(
  '/login',
  loginRules(),
  checkUserData,
  handleErrors(loginUser)
);

module.exports = accountRouter;
