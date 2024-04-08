const mongoose = require("mongoose")
const AuraCategory = new mongoose.Schema ({

    category : {
        type : String
    }
})

module.exports = mongoose.model("AuraCategory",AuraCategory)