const mongoose = require("mongoose")
const AuraSize = new mongoose.Schema ({

    size : {
        type : String
    }
})

module.exports = mongoose.model("AuraSize",AuraSize)