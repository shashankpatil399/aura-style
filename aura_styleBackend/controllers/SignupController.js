const mongoose = require("mongoose")
const AuraUser = require("../models/signupmodels")
const bcrypt = require("bcrypt")

const Signup = async (req, res) => {

  const password = req.body?.password
const confirmPassword = req.body?.confirmPassword
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
const confirmHashedPassword = await bcrypt.hash(confirmPassword, saltRounds);

try {
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

    const data = new AuraUser({
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      emailId: req.body?.emailId,
      mobileNo: req.body?.mobileNo,
      password: hashedPassword,
      confirmPassword: confirmHashedPassword,
    });


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
