const product = require('../models/product');
const { StatusCodes } = require('http-status-codes');
const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary').v2


const uploadProductImageLocal = async (req, res) => {

    if (!req.files) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "no file upload" })
    }

    const productImage = req.files.image;

    if (!productImage.mimetype.startsWith('image')) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "please provide image" })
    }

    const maxSize = 1024 * 1024;
    if (productImage.size > maxSize) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "please upload image smaller then 1k" })

    }

    const imagePath = path.join(__dirname, "../public/uploads/" + `${productImage.name}`)
    await productImage.mv(imagePath)

    return res.status(StatusCodes.OK).json({ image: { src: `/uploads/${productImage.name}` } })

}

const uploadProductImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true,
    })
    fs.unlinkSync(req.files.image.tempFilePath)
    return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } })
}

module.exports = { uploadProductImage }