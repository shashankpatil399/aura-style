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
    console.log("drtfwe",updatedProfileData);

    const user = await AuraUser.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    firstName =  updatedProfileData.firstName;
    lastName  =  updatedProfileData.lastName;
    emailId   =  updatedProfileData.emailId;
    mobileNo  =  updatedProfileData.mobileNo;
    image     =  updatedProfileData.image;
    password  =  updatedProfileData.password;

    
 console.log(user);
    await user.save();

    return res.status(200).json({
     data : user
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const testUpdate = async(req,res)=>{
  try{
    console.log(req.body)
  }
  catch(err){
    console.log(err)
  }
}


  module.exports = {profile,updateProfile,testUpdate};