const {
  getNav,
  buildClassificationGrid,
  buildInventoryGrid,
  buildManagementGrid,
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
  const invId = req.params.invId;
  const { grid, title } = await buildManagementGrid(invId);
  const nav = await getNav();

  res.render('./inventory/management', {
    title,
    grid,
    nav,
    errors: null,
  });
};

module.exports = {
  buildByClassificationId,
  buildByInventoryId,
  buildManagement,
};
