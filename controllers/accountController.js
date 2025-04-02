const { createUser } = require('../models/account-model');
const { getNav, buildLoginGrid, buildSignupGrid } = require('../utilities');

const buildLogin = async (req, res, next) => {
  const nav = await getNav();
  const { grid, title } = buildLoginGrid();
  res.render('account/loginAndSignup', {
    title,
    nav,
    grid,
  });
};

const buildSignup = async (req, res, next) => {
  const nav = await getNav();
  const { grid, title } = buildSignupGrid();
  res.render('account/loginAndSignup', {
    title,
    nav,
    grid,
  });
};

const signupUser = async (req, res) => {
  let nav = await getNav();
  const { acc_firstname, acc_lastname, acc_email, acc_password } = req.body;

  const regResult = await createUser(
    acc_firstname,
    acc_lastname,
    acc_email,
    acc_password
  );

  if (regResult) {
    req.flash(
      'notice',
      `Congratulations ${acc_firstname}, you\'re registered. Hurray!!! Please log in.`
    );
    const { grid, title } = buildLoginGrid();
    res.status(201).render('account/loginAndSignup', {
      title,
      nav,
      grid,
    });
  } else {
    req.flash('notice', 'Sorry, the registration failed.');
    const { grid, title } = buildSignupGrid();
    res.status(501).render('account/loginAndSignup', {
      title,
      nav,
      grid,
    });
  }
};

module.exports = { buildLogin, buildSignup, signupUser };
