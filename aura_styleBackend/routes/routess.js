const express = require("express");
const router = express.Router() 
const SignupController = require("../controllers/SignupController")



router.post("/Signup",SignupController.Signup)

module.exports = router;