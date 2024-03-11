const mongoose = require("mongoose")
const  AuraUser = require("../models/signupmodels")

const Signup = async (req, res) => {
    
    console.log("req", req.body);
    const data = new AuraUser({
      id: req.body?.id,
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      emailId: req.body?.emailId,
      mobileNo: req.body?.mobileNo,
      password: req.body?.password,
      confirmPassword: req.body?.confirmPassword,

    });
  
    const email = req.body.email;
    const exist = await AuraUser.findOne({ email });
  
    if (exist) {
      return res.status(200).json({
        status: 200,
        message: "User already registered",
        data: null,
      });
    }
  
    try {
      const savedUser = await data.save();
      res.status(201).json({
        status: 201,
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

  module.exports = {Signup};