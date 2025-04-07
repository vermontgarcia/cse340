const { body, validationResult } = require('express-validator');
const { buildAddClassGrid, getNav } = require('.');

const addClassificaitonRules = () => {
  return [
    body('clas_name')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Name is required')
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage('No special characters or spaces allowed!'),
  ];
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
const checkAddClassificatonData = async (req, res, next) => {
  const { clas_name } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const nav = await getNav();
    const { title } = await buildAddClassGrid();
    res.render('./inventory/add-classification', {
      errors,
      title,
      nav,
      clas_name,
    });
    return;
  }
  next();
};

module.exports = {
  addClassificaitonRules,
  checkAddClassificatonData,
};
