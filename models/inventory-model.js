const pool = require('../database');

const getClassifications = async () => {
  return await pool.query('SELECT * FROM classification ORDER BY clas_name');
};

module.exports = {
  getClassifications,
};
