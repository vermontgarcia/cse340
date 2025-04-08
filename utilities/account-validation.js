const { body, validationResult } = require('express-validator');
const { buildSignupGrid, getNav } = require('.');
const { checkExistingEmail } = require('../models/account-model');

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
const signupRules = () => {
  return [
    // firstname is required and must be string
    body('acc_firstname')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Please provide a first name.'), // on error this message is sent.

    // lastname is required and must be string
    body('acc_lastname')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage('Please provide a last name.'), // on error this message is sent.

    // valid email is required and cannot already exist in the DB
    body('acc_email')
      .trim()
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage('A valid email is required.')
      .custom(async (acc_email) => {
        const emailExist = await checkExistingEmail(acc_email);
        if (emailExist) {
          throw new Error(
            'Email already exists. Please login or register with a different email.'
          );
        }
      }),

    // password is required and must be strong password
    body('acc_password')
      .trim()
      .notEmpty()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage('Password does not meet requirements.'),
  ];
};

/*  **********************************
 *  Login Data Validation Rules
 * ********************************* */
const loginRules = () => {
  return [
    // valid email is required and cannot already exist in the DB
    body('acc_email')
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage('Invalid credentials, please review and try again.'),

    // password is required and must be strong password
    body('acc_password')
      .trim()
      .notEmpty()
      .withMessage('Invalid credentials, please review and try again.'),
  ];
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
const checkUserData = async (req, res, next) => {
  const { acc_firstname, acc_lastname, acc_email } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await getNav();
    const { grid, title } = buildSignupGrid();
    res.render('account/signup', {
      errors,
      title,
      nav,
      grid,
      acc_firstname,
      acc_lastname,
      acc_email,
    });
    return;
  }
  next();
};

module.exports = { signupRules, loginRules, checkUserData };
