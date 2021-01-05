const mongoose = require('mongoose');
const couponSchema =new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        uppercase: true,
        required: [true, 'please enter the name'],
        min: 3
    },
    expiry: {
        type: Date,
        required: true
    },
    discounts: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})



const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
