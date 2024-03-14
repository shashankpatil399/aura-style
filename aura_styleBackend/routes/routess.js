const express = require("express");
const router = express.Router() 
const SignupController = require("../controllers/SignupController")
const { signUpValidate, validate } = require('../Mddleware/signUpValidate.js');
const otpController = require("../controllers/otpController");

router.post('/sendOTP', otpController.sendOTP)
router.post("/Signup",signUpValidate,validate,SignupController.Signup)


module.exports = router;

