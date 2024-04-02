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

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; 
    console.log("user",userId);
    const updatedProfileData = req.body;

    const user = await AuraUser.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = updatedProfileData.firstName;
    user.lastName = updatedProfileData.lastName;
    user.emailId = updatedProfileData.emailId;
    user.mobileNo = updatedProfileData.mobileNo;
    user.image = updatedProfileData.image;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


  module.exports = {profile,updateProfile};