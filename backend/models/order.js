const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product'
        }
    }],
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: 'Not processed',
        enum: [
            'Not processed',
            'Processing',
            'Dispatched',
            'Cancelled',
            'Delivered'
        ]
    },
    orderBy:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    paymentMode: {
        type: String,
        default: 'COD',
        enum: ['Stripe', 'COD']
    },
    isPaid: {
        type: String,
        enum: ['Paid', 'Unpaid']
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;