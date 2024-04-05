const express = require("express");
const router = express.Router()
const { body } = require('express-validator');


const SignupController = require("../controllers/SignupController")
const loginController = require("../controllers/loginController.js")
const forgetController = require("../controllers/forgetController.js")
const verifyController = require("../controllers/forgetController.js")
const resetpassController = require("../controllers/resetpassController.js")
const customerController = require("../controllers/customerController.js")
const changepassController = require("../controllers/changepassController.js")
const verifyTokenmiddle = require('../Mddleware/verifyToken.js');
const profileController = require("../controllers/profileController.js")
const upload = require("../Mddleware/ImageUpload.js")
const updatecontroller = require("../controllers/updatecontroller.js")



router.post('/Signup', 
[
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('emailId').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('mobileNo').notEmpty().withMessage('Mobile number is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('confirmPassword').notEmpty().withMessage('Confirm password is required')
],
upload.single('image'),SignupController.Signup);

router.post("/login",
[
    body('emailId').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
],
loginController.login)

router.get("/verifyToken",verifyTokenmiddle)
router.get("/getUserById/:id",customerController.getUserById)
router.get("/customer",customerController.customer)
router.delete("/deleteItem/:id",customerController.deleteItem)
router.post("/verifyOtp",

verifyController.verifyOtp)
router.post("/resetpass",resetpassController.resetPass)
router.post("/otpSend",forgetController.otpSend)
router.post("/test",profileController.testUpdate)
router.post("/ChangePass",verifyTokenmiddle,changepassController.changePass)
router.get("/profile",verifyTokenmiddle,profileController.profile)
router.put("/updateProfile",verifyTokenmiddle,profileController.updateProfile)
router.post("/updateone",verifyTokenmiddle,updatecontroller.update2)
module.exports = router;