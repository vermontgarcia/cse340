const {
  createClassification,
  createInventory,
  getInventoryByClassificationId,
} = require('../models/inventory-model');
const {
  getNav,
  buildClassificationGrid,
  buildInventoryGrid,
  buildDeleteInventoryGrid,
  buildManagementGrid,
  buildAddClassGrid,
  buildAddInvGrid,
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
  const { grid, title, nav, clasOptions } = await buildManagementGrid();
  res.render('./inventory/management', {
    title,
    grid,
    nav,
    clasOptions,
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

const buildDeleteByInventoryId = async (req, res, next) => {
  const invId = req.params.invId;
  const { grid, title } = await buildDeleteInventoryGrid(invId);
  const nav = await getNav();

  res.render('./inventory/delete-confirm', {
    title,
    grid,
    nav,
    errors: null,
  });
};

const buildAddInventory = async (req, res, next) => {
  const { title, nav, clasOptions, formData } = await buildAddInvGrid();
  res.render('./inventory/add-inventory', {
    title,
    nav,
    clasOptions,
    formData,
    errors: null,
  });
};

const addClassification = async (req, res) => {
  const { clas_name } = req.body;
  const result = await createClassification(clas_name);
  if (result) {
    req.flash('notice', `Classification "${clas_name}" added`);
    const { grid, title, nav, clasOptions } = await buildManagementGrid();
    res.render('./inventory/management', {
      title,
      nav,
      grid,
      clasOptions,
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

const addInventory = async (req, res) => {
  const formData = req.body;
  console.log(formData);
  const result = await createInventory(formData);
  if (result) {
    req.flash(
      'notice',
      `Vehicle ${formData.inv_make} ${formData.inv_model} added to inventory`
    );
    const { title, nav, grid, clasOptions } = await buildManagementGrid();
    res.render('./inventory/management', {
      title,
      nav,
      grid,
      clasOptions,
      errors: null,
    });
  }
};

const getInventoryByClasId = async (req, res, next) => {
  const clas_id = parseInt(req.params.clasId);
  const invData = await getInventoryByClassificationId(clas_id);
  console.log(invData);
  return res.json(invData);
};

const deleteInvById = async (req, res) => {
  try {
    return res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  buildByClassificationId,
  buildByInventoryId,
  buildDeleteByInventoryId,
  buildManagement,
  buildAddClass,
  addClassification,
  buildAddInventory,
  addInventory,
  deleteInvById,
  getInventoryByClasId,
};
