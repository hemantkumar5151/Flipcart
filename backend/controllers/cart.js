const User = require('../models/users');
const Cart = require('../models/cart');
const Product = require('../models/product');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.userCart = catchAsync(async(req,res,next) => {
    const { cart } = req.body;
    let products = []
    console.log(req.body)
    const user = await User.findOne({ email: req.user.email});
    if(!user) return next(new AppError('You are not login',401));

    let cartExistByUser = await Cart.findOne({ orderBy: user._id});

    if(cartExistByUser) {
        cartExistByUser.remove();
    }
    for (let i = 0; i<cart.length ; i++) {
        let object = {};
        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.color = cart[i].color;
        object.img = cart[i].images[0].url

        let  { price } = await Product.findById(cart[i]._id).select('price');

        object.price = price;

        products.push(object);
    }

    let cartTotal = 0;
    for (i=0;i<products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count;
    }



    await Cart.create({
         products,
         cartTotal,
         orderBy: user._id

    })

    return res.status(201).json({
        status: 'ok',
        message: 'Cart saved into the database',
        data: true
    })

})


exports.getUserCart = catchAsync(async(req,res,next) => {
    const user = await User.findOne({ email: req.user.email });

    const cart = await Cart.findOne({orderBy: user._id}).populate('products.product','slug brand shipping');

        if(cart !== null) {
            const { products ,cartTotal, totalAfterDiscount } = cart;
        
            return res.status(200).json({
                status: 'ok',
                message: 'Cart item found',
                data: {
                    products,
                    cartTotal,
                    totalAfterDiscount,
                }
            })
        }

        return res.status(404).json({
            status: 'ok',
            message: 'No item in your cart',
            data: null
        })
})



exports.deleteSingleItem = catchAsync(async(req,res,next) => {
    const user = await User.findOne({ email: req.user.email });

    await Cart.findOneAndRemove({ orderBy: user._id});

    return res.status(200).json({
        status: 'ok',
        message: 'product deleted successfully',
        data: true
    })
})
exports.resetCart = catchAsync(async(req,res,next) => {
    const user = await User.findOne({ email: req.user.email });

    await Cart.findOneAndRemove({ orderBy: user._id});

    return res.status(200).json({
        status: 'ok',
        message: 'product deleted successfully',
        data: true
    })
    
})