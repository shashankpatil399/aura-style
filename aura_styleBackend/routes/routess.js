const express = require("express");
const router = express.Router() 
const SignupController = require("../controllers/SignupController")
const { validate } = require('../Mddleware/signUpValidate.js');
const loginController = require("../controllers/loginController.js")
const forgetController = require("../controllers/forgetController.js")
const verifyController = require("../controllers/forgetController.js")
const resetpassController = require("../controllers/resetpassController.js")


router.post("/verifyOtp",verifyController.verifyOtp)
router.post("/resetpass",resetpassController.resetPass)
router.post("/forget",forgetController.forgetPass)
router.post("/login",loginController.login)
router.post("/Signup",validate,SignupController.Signup)
module.exports = router;