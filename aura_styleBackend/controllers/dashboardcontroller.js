const mongoose = require("mongoose")
const productmodel = require("../models/productModel")
const categoriesmodels = require("../models/categoriesmodels")
const sizeModels = require("../models/sizeModels")



const dashboard =  async (req, res) => {
    try {
        const numProducts = await productmodel.countDocuments();
        const numCategories = await categoriesmodels.countDocuments();
        const numSizes = await sizeModels.countDocuments();

        res.json({
            numProducts,
            numCategories,
            numSizes
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {dashboard}
