const User = require('../models/users');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createOrUpdateUser = catchAsync(async(req,res,next) => {

    const { name, picture, email } = req.user;

    const user = await User.findOneAndUpdate({ email }, {
        name: name ? name : email.split('@')[0],
        email,
        picture
    }, {
        new: true, 
    })

    if(user) {
        return res.status(200).json({
            status: 'ok',
            message: 'You are updated successfully',
            data: user
        })
    } else {
        const newUser = await User.create({
            name: name ? name : email.split('@')[0],
            email,
            picture
        })

        return res.status(201).json({
            status: 'ok',
            message: 'You are created successfully',
            data: newUser
        })
    }
})

exports.currentUser = catchAsync(async(req,res,next) => {
    const user = await User.findOne({ email: req.user.email });
    if(!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'No user found',
            data: null
        })
    } 
    
    return res.status(200).json({
        status: 'fail',
        message: 'User found successfully',
        data: user
    })

})

exports.adminCheck = catchAsync(async(req,res,next) => {
    const user = await User.findOne({ email: req.user.email });
    if(user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            status: 'fail',
            message: 'You are not authorized to perform this action. ',
            data: null
        })
    }
})

exports.saveAddress = catchAsync(async(req,res,next) => {

     await User.findOneAndUpdate({ email: req.user.email}, {
        address: req.body.address
    })

    return res.status(200).json({
        status: 'ok',
        message: 'Address saved successfully',
        data: true
    })
})


exports.addWishlist = catchAsync(async(req,res,next) => {

    await User.findOneAndUpdate({ email: req.user.email}, {
       $addToSet: { wishlist: req.body.id},
   }, {
       new: true
   })

   return res.status(200).json({
       status: 'ok',
       message: 'wishlist saved successfully',
       data: true
   })
})

exports.allWishlist = catchAsync(async(req,res,next) => {
    const wishlist  = await User.findOne({email: req.user.email }).populate('wishlist');

   return res.status(200).json({
       status: 'ok',
       message: 'wishlist found',
       data: wishlist
   })
})


exports.removeWishlist = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $pull: { wishlist: id} }
    ).exec();
 
    return res.status(200).json({
        status: 'ok',
        message: 'Wishlist updated successfully',
        data: true
    })
})