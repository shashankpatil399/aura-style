const mongoose = require("mongoose")
const  productModel = new mongoose.Schema({

image : { 
    type : String
},

productName : { 
    type  : String
},
description : { 
    type : String
},
price: {
    type: Number,
    required: true,
  },
availableSizes  : { 
    type : String
},
availableColors : {

    type :String
},
materialType  : { 
    type : String
},

category : {

    type :String
}
})

module.exports = mongoose.model("productModel",productModel)