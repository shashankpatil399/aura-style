const mongoose = require("mongoose")
const AuraUser = new mongoose.Schema({

firstName : {

    type : String
 },
 
lastName : {

    type:  String
},
emailId : {
    type : String
},
 mobileNo :  { 
    type : Number
 },
password : {
 type : String
},
confirmPassword : {
    type : String
},
otp : {
    type : String,
    default : ""
}
})
module.exports = mongoose.model("auraUser",AuraUser)