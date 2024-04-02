const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AuraUser = require("../models/signupmodels");


const changePass = async (req, res) => {

  
  try {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const userId      = req.userId;
    const user = await AuraUser.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "Invalid user",
      });
    }
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: 401,
        message: "Old password is incorrect",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await AuraUser.findByIdAndUpdate(userId, { password: hashedPassword });

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
module.exports = { changePass };



