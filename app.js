
require('dotenv').config()

const express = require('express');
const app = express();
const productRouter = require('./routes/productRoutes');
const fileUpload = require('express-fileupload');

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// DB connection
const connectDB = require('./db/connection');

// middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));


// custom middleware 
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// product route
app.use('/api/v1/products', productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


app.get('/', (req, res) => {
    res.send('upload image')
})

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`server is listening on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();
