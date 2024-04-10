const mongoose = require("mongoose")
const productmodel = require ("../models/productModel");



const product = async (req,res)=>{
try{
  
  let image = "";
   if(req.file){
    image = req.file.originalname
   }  
   console.log("image",image);
    console.log("req----", req?.body)
const data = new productmodel({

    image :             image,
    productName :       req.body?.productName,
    description :       req.body?.description,
    price :             req.body?.price,
    availableSizes :    req.body?.availableSizes,
    availableColors :   req.body?.availableColors,
    materialType :      req.body?.materialType,
    category :               req.body?.category,


})
console.log("test",data);


const savedUser = await data.save();
    res.status(200).json({
      status: 200,
      message: "product saved ",
      data: savedUser,
    });
  }
   catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error saving porduct",
      data: null,
    });
  }
}

const getProduct = async (req, res) => {
  const getAllProduct = await productmodel.find({})
  console.log("getAllProduct", getAllProduct);
  res.send(getAllProduct)
  }


  const deleteProduct = async (req, res) => {
    try {
        const delid = req.params.id;
        const resdel = await productmodel.findByIdAndDelete(delid);
        console.log(delid);
        if (resdel) {
          res.json({ status: 200, message: "User Deleted Successfully" });
        } else {
          res.status(404).json({ status: 404, message: "User not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      }
    };
  
    const UpdateProduct = async (req, res) => {

      console.log("body----",req.body);
      try {
        let id = req.params.id;
        let productName = req.body.productName;
        let description = req.body.description;
        let price = req.body.price;
        let availableSizes = req.body.availableSizes;
        let availableColors = req.body.availableColors;
        let materialType = req.body.materialType;
        let category = req.body.category;
        let image = req.body.image;
    
        const resp = await productmodel.findByIdAndUpdate(id, {
          $set: {
            productName: productName,
            description: description,
            price: price,
            availableSizes: availableSizes,
            availableColors: availableColors,
            materialType: materialType,
            category: category,
            image: image,
          },
        });
    
        console.log(resp);
        res.send(resp);
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      }
    };
    
   
  


module.exports = {product,getProduct,deleteProduct,UpdateProduct}