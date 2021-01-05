const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter the email'],
        index: true,
    },
    picture: String,
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user',
    },
    cart: {
        type: Array,
        default: [],
    },
    address: String,
    wishlist: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
        }
    ],
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;
