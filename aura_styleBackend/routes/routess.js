const express = require("express");
const router = express.Router() 
const SignupController = require("../controllers/SignupController")
const { validate } = require('../Mddleware/signUpValidate.js');
const loginController = require("../controllers/loginController.js")
const forgetController = require("../controllers/forgetController.js")
const verifyController = require("../controllers/forgetController.js")
const resetpassController = require("../controllers/resetpassController.js")
const logoutController = require("../controllers/logoutController.js")
const customerController = require("../controllers/customerController.js")
const changepassController = require("../controllers/changepassController.js")
const verifyTokenmiddle = require('../Mddleware/verifyToken.js');
const profileController = require("../controllers/profileController.js")


router.get("/verifyToken",verifyTokenmiddle)
router.post("/Update/:id",customerController.Update)
router.post("/Update/:id",customerController.Update)
router.post("/getUserById/:id",customerController.getUserById)
router.get("/customer",customerController.customer)
router.delete("/deleteItem/:id",customerController.deleteItem)
router.post("/verifyOtp",verifyController.verifyOtp)
router.post("/resetpass",resetpassController.resetPass)
router.post("/forget",forgetController.forgetPass)
router.post("/login",loginController.login)
router.post("/Signup",validate,SignupController.Signup)
router.post("/ChangePass",verifyTokenmiddle,changepassController.changePass)
router.get("/profile",verifyTokenmiddle,profileController.profile)


module.exports = router;