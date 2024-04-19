const mongoose = require('mongoose');
 

//name, email, password, confirmPassword, photo
const productSchema = new mongoose.Schema({
    images: {
        type: [String],
        required:[true,'Please provide a userid.']
    },
    name: {
        type: String,
        required: [true, 'Please enter a product name.']
    },
    price:{
        type:Number,
        required:[true,"Please enter a product price"]
    },
    details:{
        type:String,
        required:[true, "Please enter a details"]
    },
    category:{
        type:String,
        enum:["digital", "analog"],
        required:[true,"Please select a acategory"]
    }
  
},{timestamps:true})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;