const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

const appError = require('./utils/appError');
const globalErrorHandler = require('./utils/globalErrorHandler');

const userRoutes = require('./routes/users');
const categoryRoute = require('./routes/category');
const subRoute = require('./routes/sub');
const productRoute = require('./routes/product');
const cloudinaryRoute = require('./routes/cloudinary');
const cartRoute = require('./routes/cart');
const couponRoute = require('./routes/coupon');
const paymentRoute = require('./routes/stripe');
const orderRoute = require('./routes/order');

dotenv.config({ path: '.env'});

const app = express()

app.use(express.json({limit: '50mb'}));

app.use(cors());
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


app.use('/api/v1/users',userRoutes);
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/sub',subRoute);
app.use('/api/v1/product',productRoute);
app.use('/api/v1/image', cloudinaryRoute);
app.use('/api/v1/cart',cartRoute);
app.use('/api/v1/coupon', couponRoute);
app.use('/api/v1/payment', paymentRoute);
app.use('/api/v1/order',orderRoute);

app.all('*',(req,res,next) =>{
    next(new appError(`${req.originalUrl} path is not defined yet.`, 400));
})


app.use(globalErrorHandler)

module.exports = app;