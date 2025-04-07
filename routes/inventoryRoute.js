const { Router } = require('express');
const {
  buildByClassificationId,
  buildByInventoryId,
  buildManagement,
  buildAddClass,
  addClassification,
} = require('../controllers/inventoryController');
const { handleErrors } = require('../utilities');
const {
  addClassificaitonRules,
  checkAddClassificatonData,
} = require('../utilities/inventory-validation');

const inventoryRouter = new Router();

inventoryRouter.get('/type/:clasId', buildByClassificationId);
inventoryRouter.get('/detail/:invId', buildByInventoryId);
inventoryRouter.get('/', buildManagement);
inventoryRouter.get('/classification', buildAddClass);
inventoryRouter.post(
  '/classification',
  addClassificaitonRules(),
  checkAddClassificatonData,
  handleErrors(addClassification)
);

module.exports = inventoryRouter;
