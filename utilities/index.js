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
  loginGridTemplate,
  gridManagementTemplate,
  noVehiclesTemplate,
  clasOptionsTemplate,
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
  return {
    title: `Vehicle Management`,
    nav,
    grid: gridManagementTemplate(),
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

const buildLoginGrid = () => {
  const title = `Login`;
  return {
    grid: loginGridTemplate(),
    title,
  };
};

const buildSignupGrid = () => {
  const title = `Signup`;
  return {
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

module.exports = {
  getNav,
  buildClassificationGrid,
  buildInventoryGrid,
  handleErrors,
  buildLoginGrid,
  buildSignupGrid,
  buildManagementGrid,
  buildAddClassGrid,
  buildAddInvGrid,
};
