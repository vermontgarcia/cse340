require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
  getClassifications,
  getInventoryByClassificationId,
  getDetailsByInventoryId,
  getClassificationById,
} = require('../models/inventory-model');
const {
  gridInventoryDetailsTemplate,
  gridTemplate,
  navTemplate,
  gridInventoryDetailsDeleteTemplate,
  gridManagementTemplate,
  noVehiclesTemplate,
  clasOptionsTemplate,
  accountGridTemplate,
} = require('../templates');

const getNav = async (req, res, next) => {
  const data = await getClassifications();
  return navTemplate(data);
};

const getClasOptions = async () => {
  const data = await getClassifications();
  return clasOptionsTemplate(data);
};

const buildClassificationGrid = async (clasId) => {
  const inventory = await getInventoryByClassificationId(clasId);
  if (inventory.length > 0) {
    const title = `${inventory[0].clas_name} Vehicles`;
    return {
      grid: gridTemplate(inventory),
      title,
    };
  } else {
    const clasName = await getClassificationById(clasId);
    return {
      grid: noVehiclesTemplate,
      title: `${clasName} Vehicles`,
    };
  }
};

const buildInventoryGrid = async (invId) => {
  const inventoryDetail = await getDetailsByInventoryId(invId);
  return {
    grid: gridInventoryDetailsTemplate(inventoryDetail),
    title: `${inventoryDetail.inv_year} ${inventoryDetail.inv_make} ${inventoryDetail.inv_model}`,
  };
};

const buildManagementGrid = async () => {
  const nav = await getNav();
  const clasOptions = await getClasOptions();
  return {
    title: `Vehicle Management`,
    nav,
    grid: gridManagementTemplate(),
    clasOptions,
  };
};

const buildAddClassGrid = async () => {
  const nav = await getNav();
  return {
    title: `Add Classification`,
    nav,
  };
};

const buildAddInvGrid = async () => {
  const nav = await getNav();
  const clasOptions = await getClasOptions();
  formData = {};
  return {
    title: `Add Vehicle`,
    nav,
    clasOptions,
    formData,
  };
};

const buildDeleteInventoryGrid = async (invId) => {
  const inventoryDetail = await getDetailsByInventoryId(invId);
  return {
    grid: gridInventoryDetailsDeleteTemplate(inventoryDetail),
    title: `${inventoryDetail.inv_year} ${inventoryDetail.inv_make} ${inventoryDetail.inv_model}`,
  };
};

const buildLoginGrid = () => {
  const title = `Login`;
  return {
    title,
  };
};

const buildSignupGrid = () => {
  const title = `Signup`;
  return {
    title,
  };
};

const buildAccountGrid = () => {
  const title = `You are logged in`;
  return {
    grid: accountGridTemplate(),
    title,
  };
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
const handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/* ****************************************
 * Middleware to check token validity
 **************************************** */
const checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      (err, accountData) => {
        if (err) {
          req.flash('Please log in');
          res.clearCookie('jwt');
          return res.redirect('/account/login');
        }
        res.locals.accountData = accountData;
        res.locals.loggedin = 1;
        next();
      }
    );
  } else {
    next();
  }
};

module.exports = {
  getNav,
  buildClassificationGrid,
  buildInventoryGrid,
  handleErrors,
  buildLoginGrid,
  buildSignupGrid,
  buildAccountGrid,
  checkJWTToken,
  buildManagementGrid,
  buildAddClassGrid,
  buildAddInvGrid,
  buildDeleteInventoryGrid,
};
