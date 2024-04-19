const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: [true, 'Please provide a user id.']
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: [true, 'Please provide a product id.']
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
