const mongoose = require("mongoose")
const otpGen = new mongoose.Schema({



email : {
    type : String
},
 otp : {
    type : Number
 }

})

module.exports = mongoose.model("otpGen",otpGen)