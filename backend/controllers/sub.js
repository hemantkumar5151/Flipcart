const Sub = require('../models/sub');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createSub = catchAsync(async(req,res,next) => {
    const sub = await Sub.create(req.body);

    if(!sub) {
        return next(new AppError('Sub category not created successfully',404));
    }

    return res.status(201).json({
        status: 'ok',
        message: 'Sub category created successfully',
        data: sub
    })
})

exports.allSub = catchAsync(async(req,res,next) => {
    const sub = await Sub.find().sort({ createdAt: -1 });
    if(sub.length === 0) {
        return next(new AppError('Not Sub category found',404));
    }
    return res.status(200).json({
        status: 'ok',
        message: 'Total sub category is ' + sub.length,
        data: sub
    })
})

exports.singleSub = catchAsync(async(req,res,next) => {
    const sub = await Sub.findOne({ slug: req.params.slug }).populate('parent', 'name')
    if(!sub) {
        return next(new AppError('Not Sub  category found',404));
    }
    return res.status(200).json({
        status: 'ok',
        message: ' Sub category  found',
        data: [sub]
    }) 
})

exports.updateSub = catchAsync(async(req,res,next) => {
    
    const sub = await Sub.findOne({ slug : req.params.slug});
    if(!sub) {
        return next(new AppError('Not sub found',404));
    }

    sub.name = req.body.name ? req.body.name : sub.name;
    sub.parent = req.body.parent ? req.body.parent : sub.parent;

    await sub.save();
    
    return res.status(200).json({
        status: 'ok',
        message: 'Sub category updated successfully',
        data: sub
    })

})

exports.deleteSub = catchAsync(async(req,res,next) => {
    await Sub.findOneAndDelete({ slug: req.params.slug })
    
    return res.status(200).json({
        status: 'ok',
        message: 'Sub category deleted successfully',
        data: null
    })
})
