const { getClassifications } = require('../models/inventory-model');

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

module.exports = {
  getNav,
};
