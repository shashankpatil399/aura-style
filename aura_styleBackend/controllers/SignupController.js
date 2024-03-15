const mongoose = require("mongoose")
const AuraUser = require("../models/signupmodels")
const bcrypt = require("bcrypt")
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');


const Signup = async (req, res) => {

  const password = req.body?.password
const confirmPassword = req.body?.confirmPassword
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
const confirmHashedPassword = await bcrypt.hash(confirmPassword, saltRounds);

try {
const exist = await AuraUser.findOne({emailId : req.body?.emailId}) 
    if (exist) {
      return res.status(409).json({
        status: 409,
        message: "User already registered",
        data: null,
      });
    }
    // console.log(emailId);

    if (password !== confirmPassword){
  return res.status(408).json({
    status: 408,
    message: "password missmatched",
    data: null,
  });



}const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
console.log(otp,"otp");

// Send OTP via email
await sendOTP(req.body?.emailId, otp);
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
    console.log(data,"saved");

  
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error saving user",
      data: null,
    });
  }
};
// Send OTP via Email
async function sendOTP(email, otp) {
  let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'your_email@gmail.com', // Your Gmail email address
          pass: 'your_password' // Your Gmail password
      }
  });

  let info = await transporter.sendMail({
      from: '"Your Name" <your_email@gmail.com>',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for registration is: ${otp}`
  });

  console.log('Message sent: %s', info.messageId);
}


module.exports = { Signup };



