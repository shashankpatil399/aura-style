const mongoose = require("mongoose")
const AuraUser = require("../models/signupmodels")

const update2 = async (req, res) => {
    try {
      let image = "";
  
      if (req.file) {
        image = req.file.originalname;
      }
      // let updateId = req.userId;
      console.log("req----", req?.body)
      const userId = req.userId;
      let ufirstName = req.body.firstName;
      let ulastName = req.body.lastName;
      let uemailId = req.body.emailId;
      let umobileNo = req.body.mobileNo;
      console.log("first",ufirstName);
  
      console.log("user",userId);
      const exist = await AuraUser.findByIdAndUpdate(
        userId,
        { firstName: ufirstName,lastName: ulastName,emailId: uemailId, mobileNo: umobileNo, image: image },
        { new: true }
      );
     if(!exist)
     {
      return res.status(400).json({
        status:400,
        error: 'user data are not Update '
      })
  
     }
  
      console.log(exist);
      return res.status(200).json({
        status: 200,
        message: "profile update Successfuly",
  
        data: exist,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Server error",
      });
    }
  };
  module.exports = {update2};