const mongoose =require("mongoose")
const bcrypt = require("bcrypt")
const AuraUser = require("../models/signupmodels")
const Yup = require('yup');



const validationSchema = Yup.object().shape({
    emailId: Yup.string().email('Invalid email').required('Email is required'), 
    password: Yup.string().required('Password is required'),
});


const validateData = async (data) => {
    try {
        await validationSchema.validate(data, { abortEarly: false });
        return { isValid: true, errors: null };
    } catch (errors) {
        return { isValid: false, errors: errors.inner.map(error => ({ [error.path]: error.message })) };
    }
  };

const resetPass = async(req,res)=>{
    const { isValid, errors } = await validateData(req.body);
  if (!isValid) {
      return res.status(422).json({ errors });
  }
const emailId = req.body.emailId
const password = req.body.password
const confirmPassword = req.body.confirmPassword

const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
const confirmHashedPassword = await bcrypt.hash(confirmPassword, saltRounds);

const reset = await AuraUser.findOneAndUpdate({emailId:emailId}, {password:hashedPassword}
    ,{confirmPassword:confirmHashedPassword})
if(!reset){
    return res.status(400).json({
        status : 400,
        message : "user invalid"
    })
}
else {
    return res.status(200).json({
        message:"paswword change"
    })
}
}
module.exports = {resetPass}