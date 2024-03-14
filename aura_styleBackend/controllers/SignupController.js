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
      data: null,
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

// const mongoose = require("mongoose");
// const AuraUser = require("../models/signupmodels");
// const bcrypt = require("bcrypt");
// const otpGenerator = require('otp-generator');
// const nodemailer = require('nodemailer');

// const Signup = async (req, res) => {
//   try {
//     const { firstName, lastName, emailId, mobileNo, password, confirmPassword } = req.body;

//     // Validate if password and confirmPassword match
//     if (password !== confirmPassword) {
//       return res.status(400).json({
//         status: 400,
//         message: "Passwords do not match",
//         data: null,
//       });
//     }

//     // Check if user with the same email already exists
//     const exist = await AuraUser.findOne({ emailId });
//     if (exist) {
//       return res.status(409).json({
//         status: 409,
//         message: "User already registered",
//         data: null,
//       });
//     }

//     // Generate hashed passwords
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     const confirmHashedPassword = await bcrypt.hash(confirmPassword, saltRounds);

//     // Save user data to database without OTP
//     const newUser = new AuraUser({
//       firstName,
//       lastName,
//       emailId,
//       mobileNo,
//       password: hashedPassword,
//       confirmPassword: confirmHashedPassword,
//     });

//     await newUser.save();

//     return res.status(200).json({
//       status: 200,
//       message: "User registered successfully",
//       data: null,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: "Error saving user",
//       data: null,
//     });
//   }
// };

// const sendOTP = async (req, res) => {
//   try {
//     const { emailId } = req.body;
//     if (!emailId) {
//       return res.status(400).json({ error: 'Email address is required' });
//     }

//     // Generate OTP
//     const otp = otpGenerator.generate(6, {
//       digits: true,
//       lowerCaseAlphabets: false,
//       alphabets: false,
//       upperCase: false,
//       specialChars: false
//     });

//     // Save OTP to user document
//     await AuraUser.findOneAndUpdate({ emailId }, { otp });

//     // Send OTP via email
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true,
//       auth: {
//         user: 'tjerry548@gmail.com',
//         pass: 'mgeswrvfvgofsnnl'
//       }
//     });

//     const mailOptions = {
//       from: 'shashank',
//       to: emailId,
//       subject: 'OTP Verification',
//       text: `Your OTP for verification is: ${otp}`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log('Error occurred while sending email:', error);
//         return res.status(500).json({ error: 'Error occurred while sending email' });
//       } else {
//         console.log('Email sent successfully:', info.response);
//         return res.status(200).json({ message: 'Email sent successfully' });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: "Error sending OTP",
//       data: null,
//     });
//   }
// };

// module.exports = { Signup, sendOTP };

// const mongoose = require("mongoose");
// const AuraUser = require("../models/signupmodels");
// const bcrypt = require("bcrypt");
// const otpGenerator = require('otp-generator');
// const nodemailer = require('nodemailer');

// const SignupAndOTP = async (req, res) => {
//   try {
//     const { firstName, lastName, emailId, mobileNo, password, confirmPassword } = req.body;

//     // Validate if password and confirmPassword match
//     if (password !== confirmPassword) {
//       return res.status(400).json({
//         status: 400,
//         message: "Passwords do not match",
//         data: null,
//       });
//     }

//     // Check if user with the same email already exists
//     const exist = await AuraUser.findOne({ emailId });
//     if (exist) {
//       return res.status(409).json({
//         status: 409,
//         message: "User already registered",
//         data: null,
//       });
//     }

//     // Generate hashed passwords
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     const confirmHashedPassword = await bcrypt.hash(confirmPassword, saltRounds);

//     // Generate OTP
//     const otp = otpGenerator.generate(6, {
//       digits: true,
//       lowerCaseAlphabets: false,
//       alphabets: false,
//       upperCase: false,
//       specialChars: false
//     });

//     // Save user data to database
//     const newUser = new AuraUser({
//       firstName,
//       lastName,
//       emailId,
//       mobileNo,
//       password: hashedPassword,
//       confirmPassword: confirmHashedPassword,
//       otp: otp, // Add OTP to the user data
//     });

//     await newUser.save();

//     // Send OTP via email
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true,
//       auth: {
//         user: 'tjerry548@gmail.com',
//         pass: 'mgeswrvfvgofsnnl'
//       }
//     });

//     const mailOptions = {
//       from: 'emizen813@gmail.com',
//       to: emailId,
//       subject: 'OTP Verification',
//       text: `Your OTP for verification is: ${otp}`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log('Error occurred while sending email:', error);
//         return res.status(500).json({ error: 'Error occurred while sending email' });
//       } else {
//         console.log('Email sent successfully:', info.response);
//         return res.status(200).json({ message: 'Email sent successfully' });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: "Error saving user or sending email",
//       data: null,
//     });
//   }
// };

// module.exports = { SignupAndOTP };

