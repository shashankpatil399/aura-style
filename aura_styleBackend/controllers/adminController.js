const AuraUser = require("../models/signupmodels");
const bcrypt = require('bcrypt');

const getAllUser = async (req, res) => {
  try {
    const users = await AuraUser.find({});
    console.log("getAllUser", users);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await AuraUser.findByIdAndDelete(id);
    
    if (user) {
      res.status(200).json({ status: 200, message: "User Deleted Successfully" });
    } else {
      res.status(404).json({ status: 404, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

const update = async (req, res) => {
  
  console.log("body -=--",req.body);
  try {
    const { id } = req.params;
    const { firstName, lastName, emailId, mobileNo,role } = req.body;

    
    const updatedUser = await AuraUser.findByIdAndUpdate(
      id,
      { firstName, lastName, emailId, mobileNo,role },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ status: 404, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await AuraUser.findById(id);
  
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ status: 404, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};


const addData = async (req, res) => {
  try {
    // Check if a user with the same email exists
    const existingUser = await AuraUser.findOne({ emailId: req.body.emailId });

    if (existingUser) {
      return res.status(400).json({
        status: 400,
        message: "User with this email already exists",
        data: null,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const data = new AuraUser({
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      emailId: req.body?.emailId,
      mobileNo: req.body?.mobileNo,
      password: hashedPassword,
      role: req.body?.role,
    });

    const savedUser = await data.save();

    res.status(200).json({
      status: 200,
      message: "User saved successfully",
      data: savedUser,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: 500,
      message: "Error saving data",
      data: null,
    });
  }
};



module.exports = {
  getAllUser,
  deleteItem,
  update,
  getUserById,
  addData
};
