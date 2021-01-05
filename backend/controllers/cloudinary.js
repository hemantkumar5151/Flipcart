const cloudinary = require('cloudinary');
const catchAsync = require('../utils/catchAsync');
const dotenv = require('dotenv');
const AppError = require('../utils/appError');
dotenv.config({ path: '.env'});
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

exports.upload = catchAsync(async(req,res,next) => {

    const img = await cloudinary.uploader.upload(req.body.image, {
        public_id: `image-${Date.now()}`,
        resource_type: 'auto'
    });

    if(!img) {
        return res.status(400).json({
            status: 'fail',
            message: 'Something went wrong',
        })
    }
    return res.status(200).json({
        status: 'ok',
        message: ' Image uploaded successfully ',
        data: {
            public_id: img.public_id,
            url: img.secure_url,
        }
    })
})


exports.remove = catchAsync(async(req,res, next) => {
    let public_id = req.body.image
    
    cloudinary.v2.uploader.destroy(public_id, (err , result) => {
        if(err) {
            return res.status(400).json({
                status: 'fail',
                message: 'Mot deleted',
                err
            })
        }
        
        return res.status(200).json({
            status: 'ok',
            message: 'Image deleted successfully',
            data: null,
        })
    })
    
    
})