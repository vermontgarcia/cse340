const pool = require('../database');

/* *****************************
 *   Register new account
 * *************************** */
const createUser = async (
  acc_firstname,
  acc_lastname,
  acc_email,
  acc_password
) => {
  try {
    const sql =
      "INSERT INTO account (acc_firstname, acc_lastname, acc_email, acc_password, acc_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *";
    return await pool.query(sql, [
      acc_firstname,
      acc_lastname,
      acc_email,
      acc_password,
    ]);
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  createUser,
};
