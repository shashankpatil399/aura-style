const mongoose = require("mongoose")
const AuraUser = require("../models/signupmodels")
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const Yup = require('yup');


const validationSchema = Yup.object().shape({
    emailId: Yup.string().email('Invalid email address').required('Required'),
    otp: Yup.string().min(6, 'OTP must be 6 characters').max(6, 'OTP must be 6 characters').required('Required'),
})

const validateData = async (data) => {
    try {
        await validationSchema.validate(data, { abortEarly: false });
        return { isValid: true, errors: null };
    } catch (errors) {
        return { isValid: false, errors: errors.inner.map(error => ({ [error.path]: error.message })) };
    }
  };

const otpSend = async (req, res) => {
    const { isValid, errors } = await validateData(req.body);
    if (!isValid) {
        return res.status(422).json({ errors });
    }


    const emailId = req.body.emailId
    const exist = await AuraUser.findOne({ emailId: req.body?.emailId })
    console.log("email", emailId);
    if (!exist) {
        return res.status(401).json({
            status: 401,
            message: "user is not register",
            data: null
        })
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'tjerry548@gmail.com',
            pass: 'mgeswrvfvgofsnnl'
        }
    });

    const otp = otpGenerator.generate(6,{ digits: true, lowerCaseAlphabets: false, alphabets: false, upperCase: false, specialChars: false });

    const update = await AuraUser.findOneAndUpdate({ emailId: emailId }, { otp: otp })
    console.log("em", otp);

    console.log("update", update);
    if (!update) {
        return res.status(401).json({
            status: 401,
            message: "  user ivnvalid",

        })
    }
    const mailOptions = {
        from: 'tjerry548@gmail.com',
        to: emailId,
        subject: 'OTP Verification',
        text: `Your OTP for verification is: ${otp}`
    };
    console.log(emailId, "eao");

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred while sending email:', error);
            return res.status(500).json({ error: 'Error occurred while sending email' });
        } else {
            console.log('Email sent successfully:', info.response);
            return res.status(200).json({ message: 'Email sent successfully' });
        }
    });
    }

const verifyOtp = async (req, res) => {

    const { isValid, errors } = await validateData(req.body);
    if (!isValid) {
        return res.status(422).json({ errors });
    }


    const { otp } = req.body
    const existOtp = await AuraUser.findOne({ otp: otp })
    if (existOtp) {
        return res.status(202).json({
            status: 200,
            message: "otp validate"
        })
    }
    else {
        return res.status(404).json({
            status: 404,
            message: "invalid otp"
        })
    }
    }
module.exports = { otpSend,verifyOtp}
