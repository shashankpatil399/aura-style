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
      console.log("body----", req.body);
    
      try {
        let id = req.params.id;
        let productName = req.body.productName;
        let description = req.body.description;
        let price = req.body.price;
        let availableSizes = req.body.availableSizes;
        let availableColors = req.body.availableColors;
        let materialType = req.body.materialType;
        let category = req.body.category;
    
        let image = ''; // Default empty string
    
        if (req.file) {
          image = req.file.filename; // Set image to the filename saved by multer
        } else {
          image = req.body.image; // Use existing image if no new image is uploaded
        }
    
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
        }, { new: true });
    
        console.log(resp);
        res.send(resp);
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      }
    };

    const getProductName = async (req, res) => {
      try {
        const productName = req.params.productName;
        const products = await productmodel.find({ productName: { $regex: new RegExp(productName, "i") } });
    
        if (!products || products.length === 0) {
          return res.status(404).json({ message: 'Products not found' });
        }
    
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    };
    const getDescription = async (req, res) => {
      try {
        const Description = req.params.Description;
        const Descriptions = await productmodel.find({ Description: { $regex: new RegExp(Description, "i") } });
    
        if (!Descriptions || Descriptions.length === 0) {
          return res.status(404).json({ message: 'Products not found' });
        }
    
        res.status(200).json(Descriptions);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    };

    // productController.js
const sortProduct = async (req, res) => {
  try {
    let sortQuery = {};

    if (req.query.sort === 'asc') {
      sortQuery = { price: 1 }; // Ascending order
    } else if (req.query.sort === 'desc') {
      sortQuery = { price: -1 }; // Descending order
    }

    const products = await productmodel.find().sort(sortQuery);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};



module.exports = {product,getProduct,deleteProduct,UpdateProduct,getProductName,getDescription,sortProduct}