const { Router } = require('express');
const {
  buildByClassificationId,
  buildByInventoryId,
  buildManagement,
} = require('../controllers/inventoryController');

const inventoryRouter = new Router();

inventoryRouter.get('/type/:clasId', buildByClassificationId);
inventoryRouter.get('/detail/:invId', buildByInventoryId);
inventoryRouter.get('/', buildManagement);

module.exports = inventoryRouter;
