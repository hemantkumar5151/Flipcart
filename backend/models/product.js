const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please enter the title'],
        maxlength: [32, 'Title is too long'],
        text: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        text: true,
        index: true,
    },
    description: {
        type: String,
        required: [true, 'Please enter the description'],
        maxlength: [600, 'Description is too long'],
        trim: true,
        text: true
    },
    price: {
        type: Number,
        required: [true, 'Please enter the price'],
        trim: true,
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
    },
    sub: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'SubCategory',
        }
    ],
    quantity: Number,
    sold: {
        type: Number,
        default: 0,
    },
    images: {
        type: Array,
    },
    shipping: {
        type: String,
        enum: ['Yes','No']
    },
    color: {
        type: String,
        enum:[ 'Black', 'Brown', 'Silver','White', 'Blue'],
    },
    brand: {
        type: String,
        enum: ['Apple', 'Asus', 'Dell', 'Hp', 'Lenavo', 'Mi', 'Moto','Samsung'],
    },
    ratings: [
        {
            star : Number,
            postedBy: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        }
    ]
}, {
    timestamps: true
})

productSchema.pre('save', async function(next)  {
    this.slug = await slugify(this.title, { replacement: '-',  // replace spaces with replacement character, defaults to `-`
    remove: undefined,lower: true });
    next();
})
const Product = mongoose.model('Product', productSchema);

module.exports = Product;