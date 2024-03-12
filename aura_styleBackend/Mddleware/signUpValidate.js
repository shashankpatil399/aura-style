const { body, validationResult } = require('express-validator');

const  signUpValidate = [
    body("firstName").not().trim().notEmpty().withMessage('Invalid First Name'),
    body("lastName").notEmpty().trim().withMessage('Invalid Last Name'), 
  body('emailId').isEmail().trim().withMessage('Invalid email format'),

  body('password').trim().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).withMessage('Password must include at least one uppercase letter, one lowercase letter, and one number'),

  body('mobileNo').trim().isMobilePhone().withMessage("Invalid Mobile No."),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
module.exports = { signUpValidate, validate };