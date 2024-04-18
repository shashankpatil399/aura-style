const mongoose = require("mongoose")
const AuraUser = require("../models/signupmodels")

const update2 = async (req, res) => {
    try {
      let image = "";
  
      if (req.file) {
        image = req.file.originalname;
      }
      const userId =         req.userId;
      let ufirstName = req.body.firstName;
      let ulastName = req.body.lastName;
      let uemailId = req.body.emailId;
      let umobileNo = req.body.mobileNo;
      let uimage = image || null;

      const updateData = {
        firstName: ufirstName,
        lastName: ulastName,
        emailId: uemailId,
        mobileNo: umobileNo,
    };
    if (uimage) {
      updateData.image = uimage;
  }

  const exist = await AuraUser.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
  );

  if (!exist) {
      return res.status(400).json({
          status: 400,
          error: 'User data was not updated'
      });
  }

  return res.status(200).json({
      status: 200,
      message: "Profile updated successfully",
      data: exist,
  });
} catch (error) {
  return res.status(500).json({
      status: 500,
      error: "Server error",
  });
}
};

module.exports = { update2 };