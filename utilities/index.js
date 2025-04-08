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
  gridManagementTemplate,
  noVehiclesTemplate,
  clasOptionsTemplate,
  accountGridTemplate,
} = require('../templates');

const getNav = async (req, res, next) => {
  const data = await getClassifications();
  return navTemplate(data);
};

const getClasOptions = async (clas_id) => {
  const data = await getClassifications();
  return clasOptionsTemplate(data, clas_id);
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

const buildAddEditInvGrid = async (type = 'Add', clas_id) => {
  const nav = await getNav();
  const clasOptions = await getClasOptions(clas_id);
  formData = {};
  const formAction = type === 'Edit' ? '/inv/edit' : '/inv/inventory';
  return {
    title: `${type} Vehicle`,
    nav,
    clasOptions,
    formData,
    formAction,
  };
};

const buildDeleteInventoryGrid = async (invId) => {
  const inventoryDetail = await getDetailsByInventoryId(invId);
  return {
    grid: gridInventoryDetailsTemplate(inventoryDetail),
    title: `Delete Confirmation - ${inventoryDetail.inv_year} ${inventoryDetail.inv_make} ${inventoryDetail.inv_model}`,
    deleteMessage:
      'Are you sure you want to delete this vehicle? Delete is permanent and cannot be undone!',
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
  buildAddEditInvGrid,
  buildDeleteInventoryGrid,
};
