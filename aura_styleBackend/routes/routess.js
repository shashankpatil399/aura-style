const express = require("express");
const router = express.Router();
const { body } = require('express-validator');

const SignupController =  require("../controllers/SignupController");
const loginController =   require("../controllers/loginController");
const verifyTokenmiddle = require('../Mddleware/verifyToken');
const adminController =   require("../controllers/adminController");
const productController = require("../controllers/productController");
const profileController = require("../controllers/profileController");
const upload =            require("../Mddleware/ImageUpload");
const dashboardController = require("../controllers/dashboardcontroller")
const sizeController =    require("../controllers/sizeController")
const addCategoriesController = require("../controllers/addcategoriesController")

router.post('/Signup',
[
    // Validation middleware
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('emailId').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('mobileNo').notEmpty().withMessage('Mobile number is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('confirmPassword').notEmpty().withMessage('Confirm password is required')
],
upload.single('image'), SignupController.Signup);

router.post("/login",
[
    // Validation middleware
    body('emailId').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
],
loginController.login);

router.get("/verifyToken", verifyTokenmiddle);

// Admin routes with checkRole middleware
router.get('/admin/users/:id', verifyTokenmiddle, adminController.getUserById);
router.get("/admin", adminController.getAllUser);
router.delete("/admin/delete/:id", adminController.deleteItem);
router.post('/admin/update/:id', upload.single('image') , adminController.update);
router.post('/admin/addData',upload.single('image') , adminController.addData);


// Product routes
router.get("/getProduct", productController.getProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);
router.post("/product", upload.single('image'), productController.product);
router.put("/UpdateProduct/:id", upload.single('image'), productController.UpdateProduct);
router.get("/product/:productName", productController.getProductName);
router.get("/product/:getDescription", productController.getDescription);
router.get("/sortProduct", productController.sortProduct);

// Profile routes
router.post("/test", profileController.testUpdate);
router.get("/profile", verifyTokenmiddle, profileController.profile);
router.post("/updateProfile", verifyTokenmiddle, profileController.updateProfile);

//Dashboard
router.get("/dashboard", dashboardController.dashboard);

//size
router.get("/getSize", sizeController.getSize);
router.delete("/deleteSize/:id", sizeController.deleteSize);
router.post("/addSize", sizeController.addSize);


//category
router.get("/getCategory", addCategoriesController.getCategory);
router.delete("/deleteItemcat/:id", addCategoriesController.deleteItemcat);
router.post("/addcategory", addCategoriesController.addcategory);

module.exports = router;
