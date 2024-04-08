const mongoose = require("mongoose")
const AuraCategory = require("../models/categoriesmodels")

const addcategory = async (req,res) => {

    console.log("addcateogry");
    try{
        const category = req.body.category;
        console.log("cateogry",category);


        const data  = new AuraCategory ({
            category : req.body.category,
        })
        console.log("data",data);

        const saveuser = await data.save();
        res.status(200).json({
            status : 200,
            message : "category add succefull",
            data : saveuser
     })}

    catch(error){
        res.status(500).json({
            
            status : 500,
            message : "category not added",
            data : null
        }) }}

const getCategory = async(req,res) =>{
try{

    const getAllCategories = await AuraCategory.find({})
    console.log(getAllCategories);

    res.send(getAllCategories)

}
catch(error){
console.error("data not found");

}
}
const deleteItemcat = async (req, res) => {
    try {
        const delid = req.params.id;
        const resdel = await AuraCategory.findByIdAndDelete(delid);
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

    

module.exports = {addcategory,getCategory,deleteItemcat}