const mongoose =require("mongoose")
const bcrypt = require("bcrypt")
const AuraUser = require("../models/signupmodels")

const resetPass = async(req,res)=>{
const emailId = req.body.emailId
const password = req.body.password
const confirmPassword = req.body.confirmPassword

const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
const confirmHashedPassword = await bcrypt.hash(confirmPassword, saltRounds);

const reset = await AuraUser.findOneAndUpdate({emailId:emailId}, {password:hashedPassword}
    ,{confirmPassword:confirmHashedPassword})
if(!reset){
    return res.status(400).json({
        status : 400,
        message : "user invalid"
    })
}
else {
    return res.status(200).json({
        message:"paswword change"
    })
}
}
module.exports = {resetPass}