const {
  getClassifications,
  getInventoryByClassificationId,
} = require('../models/inventory-model');

const navItemTemplate = (item) =>
  `<li><a href="/inv/type/${item.clas_id}" title="See our inventory of ${item.clas_name} vehicles">${item.clas_name}</a></li>`;

const navTemplate = (data) =>
  `<ul><li><a href="/" title="Home page">Home</a></li>${data.rows
    .map(navItemTemplate)
    .join('')}</ul>`;

const getNav = async (req, res, next) => {
  const data = await getClassifications();
  return navTemplate(data);
};

const gridItemTemplate = (vehicle) =>
  `<li><a href="../../inv/detail/${vehicle.inv_id}" title="View ${
    vehicle.inv_make
  } ${vehicle.inv_model} details"><img src="${
    vehicle.inv_thumbnail
  }" alt="Image of ${vehicle.inv_make} ${
    vehicle.inv_model
  } on CSE Motors"></a><div class="name-price"><hr><h2><a href="../../inv/detail/${
    vehicle.inv_id
  }" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">${
    vehicle.inv_make
  } ${vehicle.inv_model}</a></h2><span>$ ${new Intl.NumberFormat(
    'en-US'
  ).format(vehicle.inv_price)}</span></div></li>`;

const gridTemplate = (rows) =>
  `<ul id="inv-display">${rows.map(gridItemTemplate).join('')}</ul>`;

const noVehiclesTemplate = `<p class="notice">Sorry, no matching vehicles could be found in this category.</p>`;

const buildClassificationGrid = async (clasId) => {
  const inventory = await getInventoryByClassificationId(clasId);
  const title = `${inventory[0].clas_name} Vehicles`;
  if (inventory.length > 0) {
    return {
      grid: gridTemplate(inventory),
      title,
    };
  } else {
    return {
      grid: noVehiclesTemplate,
      title,
    };
  }
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
const handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = {
  getNav,
  buildClassificationGrid,
  handleErrors,
};
