const mongoose = require("mongoose")
const AuraUser = require("../models/signupmodels")

const customer = async (req, res) => {
  const getAllUser = await AuraUser.find({})
  console.log("getAllUser", getAllUser);
  res.send(getAllUser)
  }
  const deleteItem = async (req, res) => {
  try {
      const delid = req.params.id;
      const resdel = await AuraUser.findByIdAndDelete(delid);
      console.log(delid);
      if (resdel) {
        res.json({ status: 200, message: "User Deleted Successfully" });
      } else {
        res.status(404).json({ status: 404, message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  };

  const Update = async (req, res) => {
    let upid     = req.params.id;
    let upFname  = req.body.firstName;
    let upLname  = req.body.lastName;
    let upemail  = req.body.emailId;
    let upmobile = req.body.mobileNo;
    let upimage  = req.body.image
    const resp = await AuraUser.findByIdAndUpdate({_id:upid},{ $set: { firstName: upFname, lastName: upLname, emailId: upemail, mobileNo: upmobile,image :upimage} })
    console.log(resp);
    res.send(resp)
  }
  const getUserById = async (req, res) => {
    const userId = req.params.id;
    console.log("----",userId);
    const user = await AuraUser.findById(userId)
  
    res.send(user);
    console.log(user)
  }
  module.exports= {customer,deleteItem,Update,getUserById}
  