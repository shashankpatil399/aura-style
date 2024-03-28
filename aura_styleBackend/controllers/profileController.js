const mongoose = require("mongoose")
const AuraUser = require("../models/signupmodels")

const profile = async (req, res) => {

    const userId = req.userId;
    const user = await AuraUser.findById(userId);
    res.send(user)
    console.log("user", user);
    if (!user) {
        return res.status(400).json({
          status: 400,
          message: "Invalid user",
        });
      }
  }

  module.exports = {profile};