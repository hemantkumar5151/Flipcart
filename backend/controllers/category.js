const Category = require('../models/category');
const Subcategory = require('../models/sub');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createCategory = catchAsync(async(req,res,next) => {
    const category = await Category.create(req.body);

    if(!category) {
        return next(new AppError('Category not created successfully',404));
    }

    return res.status(201).json({
        status: 'ok',
        message: 'Category created successfully',
        data: category
    })
})

exports.allCategories = catchAsync(async(req,res,next) => {
    const categories = await Category.find().sort({ createdAt: -1 });
    if(categories.length === 0) {
        return next(new AppError('Not category found',404));
    }
    return res.status(200).json({
        status: 'ok',
        message: 'Total categories is ' + categories.length,
        data: categories
    })
    
})

exports.singleCategory = catchAsync(async(req,res,next) => {
    const category = await Category.findOne({ slug: req.params.slug })
    if(!category) {
        return next(new AppError('Not category found',404));
    }
    return res.status(200).json({
        status: 'ok',
        message: 'Categories found ',
        data: category
    })
})

exports.updateCategory = catchAsync(async(req,res,next) => {
    
    const category = await Category.findOne({ slug : req.params.slug});
    if(!category) {
        return next(new AppError('Not category found',404));
    }

    category.name = req.body.name ? req.body.name : category.name;

    await category.save();
    
    return res.status(200).json({
        status: 'ok',
        message: 'Category updated successfully',
        data: category
    })

})

exports.deleteCategory = catchAsync(async(req,res,next) => {
    console.log(req.user.authtoken, req.params.slug)
    await Category.findOneAndDelete({ slug: req.params.slug })
    
    return res.status(200).json({
        status: 'ok',
        message: 'Category deleted successfully',
        data: null
    })
})

exports.getSubCategory = catchAsync(async(req,res,next) => {
    const sub = await Subcategory.find({ parent: req.params.id });
    if(sub.length === 0) {
        return next(new AppError('Not sub category found',404));
    }

    return res.status(200).json({
        status: 'ok',
        message: 'Total sub categories is ' + sub.length,
        data: sub
    })
    
})
