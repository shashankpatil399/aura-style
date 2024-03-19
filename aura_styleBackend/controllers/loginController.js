const mongoose = require("mongoose")
const AuraUser = require("../models/signupmodels")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
async function login(req, res) {
  try {
    const { emailId, password } = req.body;
    console.log("password", password);
    const user = await AuraUser.findOne({emailId : emailId});
    console.log("user", user);
    if(!user){
        return res.status(404).json({ error: 'user Not Found' });
    }

    const passwordMatch =await  bcrypt.compare(password, user.password);
    console.log('Password Match', passwordMatch);
    

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Password Is wrong' });
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    });
    res.status(200).json({
      status: 200,
      message: "User login!",
      data: user,
      token: token
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
}
  module.exports = {login};