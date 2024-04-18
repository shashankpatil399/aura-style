// const mongoose = require("mongoose")
// const AuraUser = new mongoose.Schema({

// firstName : {

//     type : String
//  },
 
// lastName : {

//     type:  String
// }, 
// emailId : {
//     type : String
// },
//  mobileNo :  { 
//     type : String
//  },

//  image : {
//     type : String
//  },
// password : {
//  type : String
// },
// confirmPassword : {
//     type : String
// },
// otp : {
//     type : String,
//     default : ""
// }
// })
// module.exports = mongoose.model("auraUser",AuraUser)





const mongoose = require("mongoose");

const AuraUser = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    unique: true,
  },
  mobileNo: {
    type: String,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  otp: {
    type: String,
    default: "",
  },
  role: {
    type: String,
  },
});

module.exports = mongoose.model("auraUser", AuraUser);
