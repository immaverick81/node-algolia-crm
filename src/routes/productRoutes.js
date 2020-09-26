const express = require('express');
const authController = require('./../controllers/authController');
const productController = require('./../controllers/productController');
const router = express.Router();
router.use(authController.protect);
//router.use(authController.restrictTo('admin'));

router.post('/loadAllProducts', productController.addproduct);
router.post('/products', productController.getAllProducts);
router.put('/updateProduct', productController.updateProduct);
router.post('/upload', productController.syncDataToAlgolia);
module.exports = router;
