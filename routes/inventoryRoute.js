const { Router } = require('express');
const {
  buildByClassificationId,
  buildByInventoryId,
} = require('../controllers/inventoryController');

const inventoryRouter = new Router();

inventoryRouter.get('/type/:clasId', buildByClassificationId);
inventoryRouter.get('/detail/:invId', buildByInventoryId);

module.exports = inventoryRouter;
