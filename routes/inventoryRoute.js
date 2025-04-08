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
} = require('../controllers/inventoryController');
const { handleErrors } = require('../utilities');
const {
  addClassificaitonRules,
  checkAddClassificatonData,
  addInventoryRules,
  checkAddInventoryData,
  checkEditInventoryData,
} = require('../utilities/inventory-validation');

const inventoryRouter = new Router();

inventoryRouter.get('/type/:clasId', buildByClassificationId);
inventoryRouter.get('/detail/:invId', buildByInventoryId);
inventoryRouter.get('/', buildManagement);
inventoryRouter.get('/classification', buildAddClass);
inventoryRouter.get('/inventory', buildAddInventory);

inventoryRouter.post(
  '/classification',
  addClassificaitonRules(),
  checkAddClassificatonData,
  handleErrors(addClassification)
);
inventoryRouter.post(
  '/inventory',
  addInventoryRules(),
  checkAddInventoryData,
  handleErrors(addInventory)
);
inventoryRouter.get(
  '/getInventory/:clasId',
  handleErrors(getInventoryByClasId)
);

inventoryRouter.get('/edit/:invId', buildEditInventory);
inventoryRouter.post(
  '/edit/:invId',
  addInventoryRules(),
  checkEditInventoryData,
  handleErrors(editInventory)
);

inventoryRouter.get('/delete/:invId', buildDeleteByInventoryId);
inventoryRouter.post('/delete/:invId', handleErrors(deleteInventory));

module.exports = inventoryRouter;
