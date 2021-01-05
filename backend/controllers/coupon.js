const catchAsync = require('../utils/catchAsync');
const Coupon = require('../models/coupon');
const User = require('../models/users');
const Cart = require('../models/cart');
const moment = require('moment');
exports.coupons = catchAsync(async(req,res) => {

    const coupons = await Coupon.find().sort({ createdAt: -1})

    return res.status(200).json({
        status: 'ok',
        message: 'Coupon found',
        data: coupons
    })

})

exports.createCoupon = catchAsync(async(req,res) => {

    const { name, expiry, discounts } = req.body;

    await Coupon.create({
        name, expiry, discounts
    })

    return res.status(201).json({
        status: 'ok',
        message: 'coupons created',
        data: true
    })

})


exports.applyCoupon = catchAsync(async(req,res) => {

    const { coupon } = req.body;
    console.log('COUPON', coupon)
    // This checks the coupon is valid or not 
    const isCouponValid  = await Coupon.findOne({ name: coupon})
    if(isCouponValid === null) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid coupon',
            data: true
        })
    }
    console.log('Is coupons valid', isCouponValid)
    // present date  
    const presentDate = moment(new Date()).format('MMM Do YYYY, h:mm:ss a')
    console.log('present date', presentDate)
    // This checks the validity of coupon
    if(presentDate < isCouponValid.expiry ) {
        return res.status(400).json({
            status: 'fail',
            message: 'Coupon has been expired',
            data: true
        })
    }

    // this found whom the user want to apply that coupon
    const user = await User.findOne({ email: req.user.email});



    let { products, cartTotal } = await Cart.findOne({ orderBy: user._id}).populate('products.product', '_id title price');
    console.log('cartTotal ', cartTotal)
    let totalAfterDiscount = Number(cartTotal - (cartTotal * isCouponValid.discounts) / 100).toFixed(2);
    console.log('TotalAfterDiscount', totalAfterDiscount);


    await Cart.findOneAndUpdate({ orderBy: user._id}, {
        totalAfterDiscount
    }, {
        new :true
    })


    console.log('products',products)
    return res.status(201).json({
        status: 'ok',
        message: 'coupon applied',
        data: true
    })

})



exports.deleteCoupon = catchAsync(async(req,res) => {
    await Coupon.findByIdAndDelete(req.params.id);
    return res.status(201).json({
        status: 'ok',
        message: 'coupons created',
        data: true
    })

})