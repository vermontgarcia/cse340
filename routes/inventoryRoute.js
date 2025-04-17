const { Router } = require('express');
const {
  buildByClassificationId,
  buildByInventoryId,
  buildDeleteByInventoryId,
  buildManagement,
  buildAddClass,
  addClassification,
  buildAddInventory,
  addInventory,
  getInventoryByClasId,
  buildEditInventory,
  editInventory,
  deleteInventory,
  addInventoryReview,
} = require('../controllers/inventoryController');
const { handleErrors, isEmployeeOrAdmin } = require('../utilities');
const {
  addClassificaitonRules,
  checkAddClassificatonData,
  addInventoryRules,
  checkAddInventoryData,
  checkEditInventoryData,
  addReviewRules,
  checkAddReviewData,
} = require('../utilities/inventory-validation');

const inventoryRouter = new Router();

// Open Routes
inventoryRouter.get('/type/:clasId', buildByClassificationId);
inventoryRouter.get('/detail/:invId', buildByInventoryId);
inventoryRouter.get(
  '/getInventory/:clasId',
  handleErrors(getInventoryByClasId)
);
inventoryRouter.post(
  '/review/:invId',
  addReviewRules(),
  checkAddReviewData,
  handleErrors(addInventoryReview)
);

// Protected Routes
inventoryRouter.get('/', isEmployeeOrAdmin, buildManagement);
inventoryRouter.get('/classification', isEmployeeOrAdmin, buildAddClass);
inventoryRouter.get('/inventory', isEmployeeOrAdmin, buildAddInventory);
inventoryRouter.get('/edit/:invId', isEmployeeOrAdmin, buildEditInventory);
inventoryRouter.get(
  '/delete/:invId',
  isEmployeeOrAdmin,
  buildDeleteByInventoryId
);

inventoryRouter.post(
  '/classification',
  isEmployeeOrAdmin,
  addClassificaitonRules(),
  checkAddClassificatonData,
  handleErrors(addClassification)
);
inventoryRouter.post(
  '/inventory',
  isEmployeeOrAdmin,
  addInventoryRules(),
  checkAddInventoryData,
  handleErrors(addInventory)
);
inventoryRouter.post(
  '/edit/:invId',
  isEmployeeOrAdmin,
  addInventoryRules(),
  checkEditInventoryData,
  handleErrors(editInventory)
);
inventoryRouter.post(
  '/delete/:invId',
  isEmployeeOrAdmin,
  handleErrors(deleteInventory)
);

module.exports = inventoryRouter;
