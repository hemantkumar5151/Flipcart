const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});


const catchAsync = require("../utils/catchAsync");
const User = require('../models/users')
const Cart = require('../models/cart');
const Coupon = require('../models/coupon')
const Product = require('../models/product');

exports.initiatePayment = catchAsync(async(req,res) => {
    
    const user = await User.findOne({ email: req.user.email});

    const cart = await Cart.findOne({ orderBy: user._id}).populate(' products.product', '_id title price totalAfterDiscount')

    console.log('cart', cart)
    const { cartTotal ,totalAfterDiscount, } = cart
    
    console.log('address',user.address)

    const amountToBePaid = totalAfterDiscount ? totalAfterDiscount : cartTotal;
    const paymentIntent = await stripe.paymentIntents.create({
        description: `You have a pay for Flipcart `,
        shipping: {
            name: user.name,
            address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
            }
        },
        amount: amountToBePaid ,
        currency: 'usd',
        payment_method_types: ['card'],
    })

    return res.status(200).json({
        status: 'ok',
        message: 'payment received',
        data: paymentIntent.client_secret
    })
})