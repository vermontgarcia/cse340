const {
  createClassification,
  createInventory,
  getInventoryByClassificationId,
  getDetailsByInventoryId,
  updateInventory,
  deleteInventoryById,
  createReview,
} = require('../models/inventory-model');
const {
  getNav,
  buildClassificationGrid,
  buildInventoryGrid,
  buildDeleteInventoryGrid,
  buildManagementGrid,
  buildAddClassGrid,
  buildAddEditInvGrid,
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
  const { grid, title, nav } = await buildInventoryGrid(invId);
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
  const { grid, title, deleteMessage } = await buildDeleteInventoryGrid(invId);
  const nav = await getNav();

  res.render('./inventory/delete-confirm', {
    title,
    deleteMessage,
    grid,
    nav,
    invId,
    errors: null,
  });
};

const buildAddInventory = async (req, res, next) => {
  const { title, nav, clasOptions, formData, formAction } =
    await buildAddEditInvGrid();
  res.render('./inventory/add-update-inventory', {
    title,
    nav,
    clasOptions,
    formData,
    formAction,
    errors: null,
  });
};

const buildEditInventory = async (req, res, next) => {
  const { invId } = req.params;
  const formData = await getDetailsByInventoryId(invId);
  const { title, nav, clasOptions, formAction } = await buildAddEditInvGrid(
    'Edit',
    formData.clas_id
  );
  res.render('./inventory/add-update-inventory', {
    title,
    nav,
    clasOptions,
    formAction: `${formAction}/${invId}`,
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

const editInventory = async (req, res) => {
  const { invId } = req.params;
  const formData = req.body;
  formData.inv_id = invId;
  const result = await updateInventory(formData);
  if (result) {
    req.flash(
      'notice',
      `Vehicle ${formData.inv_make} ${formData.inv_model} Updated`
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

const addInventoryReview = async (req, res) => {
  const { invId } = req.params;
  const formData = req.body;
  formData.inv_id = invId;
  const result = await createReview(formData);
  if (result) {
    req.flash('notice', `Review Added successfully!`);
    res.redirect(`/inv/detail/${invId}`);
  }
};

const getInventoryByClasId = async (req, res, next) => {
  const clas_id = parseInt(req.params.clasId);
  const invData = await getInventoryByClassificationId(clas_id);
  console.log(invData);
  return res.json(invData);
};

const deleteInventory = async (req, res) => {
  const { invId } = req.params;
  try {
    const result = await deleteInventoryById(invId);
    if (result) {
      req.flash(
        'notice',
        `${result.inv_year} ${result.inv_make} ${result.inv_model} deleted successfully!`
      );
      return res.redirect('/inv');
    } else {
      req.flash('notice', `Vehicle couldn't be deleted!`);
      return res.redirect(`/inv/delete/${invId}`);
    }
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
  buildEditInventory,
  editInventory,
  deleteInventory,
  getInventoryByClasId,
  addInventoryReview,
};
