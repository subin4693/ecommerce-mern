const mongoose = require('mongoose');
 

//name, email, password, confirmPassword, photo
const bannerSchema = new mongoose.Schema({
    image: {
        type: String,
        required:[true,'Please upload an image.']
    },
    name: {
        type: String,
        required: [true, 'Please enter your name.']
    },
    desc: {
        type: String,
        required: [true, 'Please enter an description.'],
    },
 
    smallText: {
        type: String,
        required: [true, 'Please enter a small text.'],
    },

    midText:{
        type:String,
        required:[true, 'Please enter mid text']
    },
    largeText1:{
        type:String,
        required:[true,'Please enter large text 1'],
    },
    largeText2:{
        type:String,
        required:[true,'Please enter an large text 2']
    },
    discount:{
        type:String,
        required:[true, 'Please enter a dicount'],
    },
    saleTime: {
        type:String,
        required:[true, 'Please enter a sale time']
    },
    buttonText:{
        type:String,
        required:[true,"button text required"]
    }
})

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;