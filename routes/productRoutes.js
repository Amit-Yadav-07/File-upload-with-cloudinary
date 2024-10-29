const mongoose = require('express');
const route = mongoose.Router();
const { createProduct, getAllProduct } = require('../controllers/productController');
const { uploadProductImage } = require('../controllers/uploadsController');

route.get('/', getAllProduct);
route.post('/', createProduct);
route.post('/uploads', uploadProductImage);


module.exports = route;