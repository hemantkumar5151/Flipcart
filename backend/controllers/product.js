const Product = require('../models/product');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/users');
const Category = require('../models/category');
const SubCategory = require('../models/sub');

exports.createProduct = catchAsync(async(req,res,next) => {
    const product = await Product.create(req.body);
   
    if(!product) {
        return next(new AppError('Product not created successfully',404));
    }

    return res.status(201).json({
        status: 'ok',
        message: 'Category created successfully',
        data: product
    })
})

exports.allProduct = catchAsync(async(req,res,next) => {


    const products = await Product.find().sort({ createdAt: -1});
    if(products.length === 0) {
        return next(new AppError('Not product found',404));
    }
    return res.status(200).json({
        status: 'ok',
        message: 'Total products is ' + products.length,
        data: products
    })
})

exports.singleProduct = catchAsync(async(req,res,next) => {
    const product = await  Product.findOne({ slug: req.params.slug }).populate('category').populate('sub');
    if(!product) {
        return next(new AppError('Not product found',404));
    }
    return res.status(200).json({
        status: 'ok',
        message: 'Product found ',
        data: product
    })
})

exports.updateProduct = catchAsync(async(req,res,next) => {
    
    const { title , brand, color , price, description, category, sub , sold, quantity } = req.body;
    const product = await Product.findOne({ slug : req.params.slug});
    if(!product) {
        return next(new AppError('Not product found',404));
    }

    product.title = title  ? title : product.title;
    product.brand = brand ? brand : product.brand;
    product.color = color ? color : product.color;
    product.price = price ? price : product.price;
    product.description = description ? description : product.description;
    product.category = category ? category : product.category;
    product.sub = sub ? sub : product.sub;
    product.sold  = sold ? sold : product.sold;
    product.quantity = quantity ? quantity : product.quantity;

    await product.save({ validateBeforeSave: false });
    
    return res.status(200).json({
        status: 'ok',
        message: 'Product updated successfully',
        data: product
    })

})

exports.deleteProduct = catchAsync(async(req,res,next) => {
    await Product.findOneAndDelete({ slug: req.params.slug })
    
    return res.status(200).json({
        status: 'ok',
        message: 'Product deleted successfully',
        data: null
    })
})

exports.list = catchAsync(async(req,res,next) => {

    const { page , order , sort  } = req.body
    const currentPage = page || 1;
    const perPage =  3;
    const skipDoc = (currentPage  - 1) * perPage;

    const products = await Product.find({})
        .skip(skipDoc)
        .populate('category')
        .populate('sub')
        .sort([[sort, order]])
        .limit(perPage);

    if(products.length === 0) {
        return next(new AppError('Not product found',404));
    }
    return res.status(200).json({
        status: 'ok',
        message: 'Total products is ' + products.length,
        data: products
    })
})

exports.totalProduct = catchAsync(async(req,res) => {
    const totalCounts = await Product.countDocuments()
    return res.status(200).json({
        status: 'ok',
        message: 'total documents',
        data: totalCounts
    })
})

exports.productRating = catchAsync(async(req,res,next) => {
  const product = await Product.findById(req.params.id);
  const user = await User.findOne({ email: req.user.email });
  const { star } = req.body;

  // who is updating?
  // check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (ele) => String(ele.postedBy) == String(user._id)
  );

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    return res.status(200).json({
        status: 'ok',
        message: 'You have successfully updating reviews',
        data: ratingAdded
    })

  } else {
    // if user have already left rating, update it
    const ratingUpdated = await Product.updateOne(
        {
          ratings: { $elemMatch: existingRatingObject },
        },
        { $set: { "ratings.$.star": star } },
        { new: true }
      ).exec();
      
        return res.status(200).json({
            status: 'ok',
            message: 'you have updated rating',
            data: ratingUpdated
    })
  }

})

exports.relatedProduct = catchAsync(async(req,res,next) => {

    const product = await Product.findById(req.params.id);

    
    const products = await Product.find({
        _id:  { $ne : product._id},
        category: product.category
    })
    .limit(3)
    .populate('category')
    .populate('sub')
    .populate('postedBy',);

    
    return res.status(200).json({
        status: 'ok',
        message: 'related product found',
        data: products
    })

})

exports.productRelatedToSpecificCategory = catchAsync(async(req, res, next) => {

    const categoryId = await Category.findOne({slug: req.params.id})
    const products = await Product.find({ category: categoryId._id }).populate('category').populate('sub');

    if(products.length === 0) {
        return next(new AppError('No product found with this category'));
    }

    return res.status(200).json({
        status: 'ok',
        message: 'All product found',
        data: products
    })
})


exports.productRelatedToSpecificSubCategory = catchAsync(async(req, res, next) => {

    const subId = await SubCategory.findOne({slug: req.params.id})
    const products = await Product.find({ sub: subId._id }).populate('category').populate('sub');

    if(products.length === 0) {
        return next(new AppError('No product found with this category'));
    }

    return res.status(200).json({
        status: 'ok',
        message: 'All product found',
        data: products
    })
})

const SearchHandler = catchAsync(async(req,res,query) => {
    const products = await Product.find({
        $text: { $search: query }
    }).populate('category')
    .populate('sub')
    .populate('postedBy');

    if(products.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'Product not found',
            data: null
        })
    };

    return res.status(200).json({
        status: 'ok',
        message: 'product found',
        data: products
    })
})
const filterProductByPrice = catchAsync(async(req,res,price) => {

    const products = await Product.find({
        price: {
            $gt: price[0],
            $lt: price[1],
        }
    })
    .populate('category')
    .populate('sub')
    .populate('postedBy');
    
    if(products.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'Product not found',
            data: null
        })
    };

    return res.status(200).json({
        status: 'ok',
        message: 'product found',
        data: products
    })

})

const handleStar = (req, res, star) => {
    Product.aggregate([
      {
        $project: {
          document: "$$ROOT",
          // title: "$title",
          floorAverage: {
            $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
          },
        },
      },
      { $match: { floorAverage: star } },
    ])
      .limit(12)
      .exec((err, aggregates) => {
        if (err) console.log("AGGREGATE ERROR", err);
        Product.find({ _id: aggregates })
          .populate("category", "_id name")
          .populate("subs", "_id name")
          .populate("postedBy", "_id name")
          .exec((err, products) => {
            if (err) console.log("PRODUCT AGGREGATE ERROR", err);
            res.json({
                status: 'ok',
                data: products
            });
          });
      });
  };
  
const filterProductByCategory = async(req,res,category, ) => {
    
    try {
        const products = await Product.find({
            category
        })
        .populate('category')
        .populate('sub')
        .populate('postedBy')

        
    if(products.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'Product not found',
            data: []
        })
    };

    return res.status(200).json({
        status: 'ok',
        message: 'product found',
        data: products
    })

    } catch (error) {
        console.log('Error',error);
    }
}

const handlerSub = async(req,res,sub) => {
    const products = await Product.find({
        sub
    }).populate('category')
    .populate('sub')
    .populate('postedBy')

    return res.status(200).json({
        status: 'ok',
        message: 'product found',
        data: products
    })
}
exports.searchOrFilterProducts  = async(req,res) => {
    const { query , price, category, star, sub} = req.body;

    if(query) {
        console.log('QUERY', query)
        await SearchHandler(req,res,query,);
    }

    if(price !== undefined ) {
        console.log('Price', price);
        await filterProductByPrice(req,res,price)
    }

    if(category && category.length > 0) {
        console.log('Category', category)
        await filterProductByCategory(req,res,category)
    }

    if(star !== undefined && star > 0) {
        console.log('Star',star)
        await handleStar(req,res,star);
    }

    if(sub) {
        console.log('Subs', sub);
        await handlerSub(req,res,sub)
    }
}