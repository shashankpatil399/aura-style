const mongoose = require("mongoose")
const productmodel = require ("../models/product")

const product = async (req,res)=>{
try{ 

    console.log("req----", req?.body)
const data = new productmodel({

    image :             req.file.originalname,
    productName :       req.body?.productName,
    description :       req.body?.description,
    price :             req.body?.price,
    availableSizes :    req.body?.availableSizes,
    availableColors :   req.body?.availableColors,
    materialType :      req.body?.materialType
})

console.log("productname", productName);
const savedUser = await data.save();
    res.status(200).json({
      status: 200,
      message: "product saved ",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error saving porduct",
      data: null,
    });
  }
}



module.exports = {product}