const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/users');
const catchAsync = require('../utils/catchAsync');


exports.createOrder =  catchAsync(async(req,res) => {
    const paymentIntent = req.body.stripeResponse.paymentIntent ? req.body.stripeResponse.paymentIntent: {};
    const user = await User.findOne({ email: req.user.email})

    let { products } = await Cart.findOne({ orderBy: user._id});
    const paymentMode = req.body.paymentMode
    const isPaid = paymentMode === 'Stripe' ? 'Paid' : 'Unpaid'
    await Order.create({
        paymentIntent,
        orderBy: user._id,
        products,
        paymentMode,
        isPaid
    })


    let bulkOption = products.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.product._id }, // IMPORTANT item.product
            update: { $inc: { quantity: -item.count, sold: +item.count } },
          },
        };
      });
    
      let updated = await Product.bulkWrite(bulkOption, {});
      console.log("PRODUCT QUANTITY-- AND SOLD++", updated);
    return res.status(201).json({
        status: 'ok',
        message: 'order created',
        data: true
    })
})

exports.allOrder = catchAsync(async(req,res) => {
    const user = await User.findOne({ email: req.user.email})

    const orders = await Order.find({ orderBy : user._id }).populate("products.product").sort({ createdAt: -1})

    return res.status(200).json({
        status: 'ok',
        message: 'order found',
        data: orders
    })
})

exports.allAdminOrder = catchAsync(async(req,res) => {

    const orders = await Order.find({}).populate("products.product").sort({ createdAt: -1});

    return res.status(200).json({
        status: 'ok',
        message: 'order found',
        data: orders
    })
})

exports.updateOrderByAdmin = catchAsync(async(req,res) => {

    const order = await Order.findById(req.params.id)
        .populate("products.product")
    if(!order) {
        return res.status(404).json({
            status: 'ok',
            message: 'Order not found',
            data: order
        })
    }

    order.orderStatus = req.body.orderStatus ? req.body.orderStatus : order.orderStatus
    order.isPaid = req.body.isPaid  ? req.body.isPaid : order.isPaid
    await order.save({ validateBeforeSave: false});
    
    return res.status(200).json({
        status: 'ok',
        message: 'order found',
        data: order
    })
})