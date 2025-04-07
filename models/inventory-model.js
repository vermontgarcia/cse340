const pool = require('../database');

const getClassifications = async () => {
  return await pool.query('SELECT * FROM classification ORDER BY clas_name');
};

const getClassificationById = async (clasId) => {
  try {
    const { rows } = await pool.query(
      'SELECT clas_name FROM classification WHERE clas_id=$1',
      [clasId]
    );
    return rows[0].clas_name;
  } catch (error) {
    console.error('getClassificationById error', error);
  }
};

const getInventoryByClassificationId = async (clasId) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM inventory AS i JOIN classification AS c ON i.clas_id = c.clas_id WHERE i.clas_id = $1`,
      [clasId]
    );
    return rows;
  } catch (error) {
    console.log('getInventoryByClassificationId error', error);
  }
};

const getDetailsByInventoryId = async (invId) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM inventory WHERE inv_id = $1`,
      [invId]
    );
    return rows[0];
  } catch (error) {
    console.log('getDetailsByInventoryId error', error);
  }
};

const createClassification = async (clas_name) => {
  try {
    const sql =
      'INSERT INTO classification (clas_name) VALUES ($1) RETURNING *';
    return await pool.query(sql, [clas_name]);
  } catch (error) {
    return error.message;
  }
};

const createInventory = async (formData) => {
  const arrayValues = [
    formData.clas_id,
    formData.inv_make,
    formData.inv_model,
    formData.inv_year,
    formData.inv_description,
    formData.inv_image,
    formData.inv_thumbnail,
    formData.inv_price,
    formData.inv_miles,
    formData.inv_color,
  ];
  try {
    const sql =
      'INSERT INTO inventory (clas_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
    return await pool.query(sql, arrayValues);
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getDetailsByInventoryId,
  createClassification,
  getClassificationById,
  createInventory,
};
