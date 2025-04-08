require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, getAccountByEmail } = require('../models/account-model');
const {
  getNav,
  buildLoginGrid,
  buildSignupGrid,
  buildAccountGrid,
} = require('../utilities');

const buildAccount = async (req, res, next) => {
  const nav = await getNav();
  const { grid, title } = buildAccountGrid();
  res.render('./account/', {
    title,
    nav,
    grid,
    errors: null,
  });
};

const buildLogin = async (req, res, next) => {
  const nav = await getNav();
  const { title } = buildLoginGrid();
  res.render('./account/login', {
    title,
    nav,
    errors: null,
  });
};

const buildSignup = async (req, res, next) => {
  const nav = await getNav();
  const { grid, title } = buildSignupGrid();
  res.render('./account/signup', {
    title,
    nav,
    // grid,
    errors: null,
  });
};

const signupUser = async (req, res) => {
  let nav = await getNav();
  const { acc_firstname, acc_lastname, acc_email, acc_password } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hashSync(acc_password, 10);
  } catch (error) {
    req.flash(
      'notice',
      'Sorry, there was an error processing the registration.'
    );
    res.status(500).render('./account/register', {
      title: 'Registration',
      nav,
      errors: null,
    });
  }

  const regResult = await createUser(
    acc_firstname,
    acc_lastname,
    acc_email,
    hashedPassword
  );

  if (regResult) {
    req.flash(
      'notice',
      `Congratulations ${acc_firstname}, you\'re registered. Hurray!!! Please log in.`
    );
    const { grid, title } = buildLoginGrid();
    res.status(201).render('account/login', {
      title,
      nav,
      grid,
      errors: null,
    });
  } else {
    req.flash('notice', 'Sorry, the registration failed.');
    const { grid, title } = buildSignupGrid();
    res.status(501).render('./account/signup', {
      title,
      nav,
      // grid,
      errors: null,
    });
  }
};

/* ****************************************
 *  Process login request
 * ************************************ */
const loginUser = async (req, res) => {
  let nav = await getNav();
  const { acc_email, acc_password } = req.body;
  const { title } = buildLoginGrid();
  const accountData = await getAccountByEmail(acc_email);
  if (!accountData) {
    req.flash('notice', 'Please check your credentials and try again.');

    res.status(400).render('./account/login', {
      title,
      nav,
      errors: null,
      acc_email,
    });
    return;
  }
  try {
    if (await bcrypt.compare(acc_password, accountData.acc_password)) {
      delete accountData.acc_password;
      const accessToken = jwt.sign(
        accountData,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 3600 * 1000 }
      );
      if (process.env.NODE_ENV === 'development') {
        res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 3600 * 1000 });
      } else {
        res.cookie('jwt', accessToken, {
          httpOnly: true,
          secure: true,
          maxAge: 3600 * 1000,
        });
      }
      return res.redirect('/account/');
    } else {
      req.flash(
        'message notice',
        'Please check your credentials and try again.'
      );
      res.status(400).render('./account/login', {
        title,
        nav,
        errors: null,
        acc_email,
      });
    }
  } catch (error) {
    throw new Error('Access Forbidden');
  }
};

module.exports = {
  buildLogin,
  buildSignup,
  signupUser,
  loginUser,
  buildAccount,
};
