const Banner = require('../Models/BannerModel');
 
const asyncErrorHandler = require('../Utils/AsyncErrorHandler');
const CustomError = require('../Utils/CustomError');

 


exports.createBanner = asyncErrorHandler(async(req,res,next)=>{
    console.log(req.body)
    const banner = await Banner.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            banner
        }
    });
})


exports.getBanner = asyncErrorHandler(async(req,res,next)=>{
 

    const banner = await Banner.findOne( );

    res.status(200).json({
        status:"success",
        data:{
            banner
        }
    })
})

exports.updateBanner = asyncErrorHandler(async(req,res,next)=>{
 
    const banner = await Banner.findOneAndUpdate(req.body);
console.log(banner)
    // const updatedProduct = await Product.findOneAndUpdate({_id: prodId},req.body);

    res.status(201).json({
        status:"success",
        data:{
            banner
        }
    })

})
 
 