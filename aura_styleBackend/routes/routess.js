const express = require("express");
const router = express.Router() 
const SignupController = require("../controllers/SignupController")
const { signUpValidate, validate } = require('../Mddleware/signUpValidate.js');
const otpController = require("../controllers/otpController");
const loginController = require("../controllers/loginController.js")

router.post("/login",loginController.login)
router.post('/sendOTP', otpController.sendOTP)
router.post("/Signup",validate,SignupController.Signup)


module.exports = router;

