const Product = require('../models/product');
const { StatusCodes } = require('http-status-codes');


const createProduct = async (req, res) => {

    const product = await Product.create(req.body);
    return res.status(StatusCodes.CREATED).json({ product })
}

const getAllProduct = async (req, res) => {
    const products = await Product.find({});
    return res.status(StatusCodes.OK).json({ products })
}


module.exports = { createProduct, getAllProduct }