const { Router } = require('express');
const {
  buildByClassificationId,
  buildByInventoryId,
  buildManagement,
  buildAddClass,
  addClassification,
  buildAddInventory,
  addInventory,
} = require('../controllers/inventoryController');
const { handleErrors } = require('../utilities');
const {
  addClassificaitonRules,
  checkAddClassificatonData,
  addInventoryRules,
  checkAddInventoryData,
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

module.exports = inventoryRouter;
