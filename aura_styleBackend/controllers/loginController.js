const mongoose = require("mongoose")
const AuraUser = require("../models/signupmodels")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const Yup = require('yup');


const validationSchema = Yup.object().shape({
  emailId: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
});


const validateData = async (data) => {
  try {
      await validationSchema.validate(data, { abortEarly: false });
      return { isValid: true, errors: null };
  } catch (errors) {
      return { isValid: false, errors: errors.inner.map(error => ({ [error.path]: error.message })) };
  }
};



async function login(req, res) {

  const { isValid, errors } = await validateData(req.body);
  if (!isValid) {
      return res.status(422).json({ errors });
  }
  try {
    const { emailId, password } = req.body;
    console.log("password", password);
    const user = await AuraUser.findOne({emailId : emailId});
    console.log("user", user);
    if(!user){
        return res.status(404).json({ error: 'user Not Found' });
    }

    const passwordMatch =await  bcrypt.compare(password, user.password);
    console.log('Password Match', passwordMatch);
    

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Password Is wrong' });
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    });
    res.status(200).json({
      status: 200,
      message: "User login!",
      data: user,
      token: token
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
}
  module.exports = {login};