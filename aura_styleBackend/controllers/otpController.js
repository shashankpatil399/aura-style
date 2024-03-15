const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

function sendOTP(req, res) {

    const transporter = nodemailer.createTransport({
        

        host:'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'tjerry548@gmail.com',
            pass: 'mgeswrvfvgofsnnl'
        }
    });
 
    const { emailId } = req.body;
    if (!emailId) {
        return res.status(400).json({ error: 'Email address is required' });
    }
    const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, alphabets: false, upperCase: false, specialChars: false });


    const mailOptions = {
        from: 'tjerry548@gmail.com',
        to: emailId,
        subject: 'OTP Verification',
        text: `Your OTP for verification is: ${otp}`
    };

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

module.exports = {
    sendOTP
};
 











