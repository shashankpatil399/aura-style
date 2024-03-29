const mongoose = require("mongoose")
const AuraUser = require("../models/signupmodels")
const bcrypt = require("bcrypt")
const Yup = require('yup');




const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  emailId : Yup.string().email('Invalid email format').test(
      'isValidDomain',
      'Invalid domain extension',
      (value) => {
        if (!value) return false; // If value is empty, return false
        const domainParts = value.split('@')[1].split('.');
        const domainExtension = domainParts[domainParts.length - 1];
        return ['com', 'org', 'net'].includes(domainExtension.toLowerCase()); // Add more valid extensions if needed
      }
  ),
  mobileNo: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .required('Mobile No. is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});
const validateSignupData = async (data) => {
  try {
      await signupValidationSchema.validate(data, { abortEarly: false });
      return { isValid: true, errors: null };
  } catch (errors) {
      return { isValid: false, errors: errors.inner.map(error => ({ [error.path]: error.message })) };
  }
};

const Signup =  async (req, res) => {

  const { isValid, errors } = await validateSignupData(req.body);
  if (!isValid) {
      return res.status(422).json({ errors });
  }

const password = req.body?.password
const confirmPassword = req.body?.confirmPassword
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
const confirmHashedPassword = await bcrypt.hash(confirmPassword, saltRounds);

try {
  const data = new AuraUser({
    firstName:       req.body?.firstName,
    lastName:        req.body?.lastName,
    emailId:         req.body?.emailId,
    mobileNo:        req.body?.mobileNo,
    password:        hashedPassword,
    confirmPassword: confirmHashedPassword,
  });
  console.log("data",data);
const exist = await AuraUser.findOne({emailId:req.body?.emailId}) 
    if (exist) {
      return res.status(409).json({
        status: 409,
        message: "User already registered",
        data: null,
      });
    }

    if (password !== confirmPassword){
  return res.status(408).json({
    status: 408,
    message: "password missmatched",
    data: null,
  });

}
    


    const savedUser = await data.save();
    res.status(200).json({
      status: 200,
      message: "User registered successfully",
      data: savedUser,
    });

  
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error saving user",
      data: null,
    });
  }
};

module.exports = { Signup };


