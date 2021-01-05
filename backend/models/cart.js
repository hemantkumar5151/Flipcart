const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
            },
            count: Number,
            color: String,
            price: Number,
            img: String
        }
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;