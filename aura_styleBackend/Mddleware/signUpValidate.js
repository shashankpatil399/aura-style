const yup = require("yup")
const signUpValidate = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    emailId: yup.string().email('Invalid email').required('Email is required'),
    mobileNo: yup.string().required('Mobile No. is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});
const validate = async (req, res, next) => {
  try {
      await signUpValidate.validate(req.body, { abortEarly: false });
      next();
  } catch (error) {
      return res.status(400).json({ errors: error.errors });
  }
};
module.exports = {validate };






