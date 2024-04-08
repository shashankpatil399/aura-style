const mongoose = require("mongoose")
const  product = new mongoose.Schema({

image : { 
    type : String
},

productName : { 
    type  : String
},
description : { 
    type : String
},
price : { 
    type : String
},
availableSizes  : { 
    type : String
},
availableColors : {

    type :String
},
materialType  : { 
    type : String
}
})

module.exports = mongoose.model("product",product)