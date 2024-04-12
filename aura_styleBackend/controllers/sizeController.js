const mongoose = require("mongoose")
const AuraSize = require("../models/sizeModels")

const addSize = async (req,res) => {

    try{
        const size = req.body.color;
        console.log("size",size);


        const data  = new AuraSize ({
            size : req.body.size,
        })

        const saveuser = await data.save();
        res.status(200).json({
            status : 200,
            message : "size add succefull",
            data : saveuser
     })}

    catch(error){
        res.status(500).json({
            
            status : 500,
            message : "category not added",
            data : null
        }) }}

const getSize = async(req,res) =>{
try{

    const getAllSize = await AuraSize.find({})

    res.send(getAllSize)

}
catch(error){
console.error("data not found");

}
}
const deleteSize = async (req, res) => {
    try {
        const delid = req.params.id;
        const resdel = await AuraSize.findByIdAndDelete(delid);
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

    

module.exports = {addSize,getSize,deleteSize}