/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const static = require('./routes/static');
const { buildHome } = require('./controllers/baseController');
const inventoryRouter = require('./routes/inventoryRoute');
const { getNav } = require('./utilities');

/* ***********************
 * View Engine and Templates
 *************************/
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/layout'); // not at views root

/* ***********************
 * Routes
 *************************/
app.use(static);

// Index route
app.get('/', buildHome);
// Inventory Routes
app.use('/inv', inventoryRouter);

/* ***********************
 * Route Not Found
 * Must be keep after all other routes
 *************************/
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, it seems that page doesn't exists!" });
});

/* ***********************
 * Express Error Handler
 * Must be keep after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  nav = await getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  res.render('errors/error', {
    title: err.status || 'Server Error',
    message: err.message,
    nav,
  });
});

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
