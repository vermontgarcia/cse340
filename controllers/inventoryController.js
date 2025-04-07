const { createClassification } = require('../models/inventory-model');
const {
  getNav,
  buildClassificationGrid,
  buildInventoryGrid,
  buildManagementGrid,
  buildAddClassGrid,
} = require('../utilities');

const buildByClassificationId = async (req, res, next) => {
  const clasId = req.params.clasId;
  const { grid, title } = await buildClassificationGrid(clasId);
  const nav = await getNav();

  res.render('./inventory/classification', {
    title,
    nav,
    grid,
    errors: null,
  });
};

const buildByInventoryId = async (req, res, next) => {
  const invId = req.params.invId;
  const { grid, title } = await buildInventoryGrid(invId);
  const nav = await getNav();

  res.render('./inventory/inventory', {
    title,
    grid,
    nav,
    errors: null,
  });
};

const buildManagement = async (req, res, next) => {
  const { grid, title } = await buildManagementGrid();
  const nav = await getNav();

  res.render('./inventory/management', {
    title,
    grid,
    nav,
    errors: null,
  });
};

const buildAddClass = async (req, res, next) => {
  const { title } = await buildAddClassGrid();
  const nav = await getNav();

  res.render('./inventory/add-classification', {
    title,
    nav,
    errors: null,
  });
};

const addClassification = async (req, res) => {
  const { clas_name } = req.body;
  const result = await createClassification(clas_name);
  if (result) {
    req.flash('notice', `Classification "${clas_name}" added`);
    const { grid, title } = await buildManagementGrid();
    const nav = await getNav();
    res.render('./inventory/management', {
      title,
      grid,
      nav,
      errors: null,
    });
  } else {
    req.flash('notice', `Error adding "${clas_name}" classification`);
    const nav = await getNav();
    const { title } = buildAddClassGrid();
    res.render('./inventory/add-classification', {
      title,
      nav,
      errors: null,
    });
  }
};

module.exports = {
  buildByClassificationId,
  buildByInventoryId,
  buildManagement,
  buildAddClass,
  addClassification,
};
