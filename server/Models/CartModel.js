const mongoose = require('mongoose');
 

//name, email, password, confirmPassword, photo
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: [true, 'Please provide a userId.']
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: [true, 'Please provide a productId.']
    },
    quantity:{
        type:Number,
        default:1
    }
  
},{timestamps:true})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;