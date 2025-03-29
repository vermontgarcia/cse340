const {
  getNav,
  buildClassificationGrid,
  buildInventoryGrid,
} = require('../utilities');

const buildByClassificationId = async (req, res, next) => {
  const clasId = req.params.clasId;
  const { grid, title } = await buildClassificationGrid(clasId);
  const nav = await getNav();

  res.render('./inventory/classification', {
    title,
    nav,
    grid,
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
  });
};

module.exports = {
  buildByClassificationId,
  buildByInventoryId,
};
