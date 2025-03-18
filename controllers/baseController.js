const { getNav } = require('../utilities');

const buildHome = async (req, res) => {
  const nav = await getNav();
  console.log(nav);
  res.render('index', { title: 'Home', nav });
};

module.exports = {
  buildHome,
};
