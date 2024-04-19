const Product = require("../Models/ProductModel");
const Cart = require("../Models/CartModel");
const Order = require("../Models/OrdersModel");
const asyncErrorHandler = require("../Utils/AsyncErrorHandler");
const CustomError = require("../Utils/CustomError");

const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
    let query = {};
    let page = req.query.page || 1; // Default page is 1
    let limit = req.query.limit || 50; // Default limit per page
    let products;

    if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, "i");
        query.$or = [
            { name: searchRegex },
            { description: searchRegex },
            { category: searchRegex },
        ];
    }
    const count = await Product.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    page = Math.min(page, totalPages);

    const skip = (page - 1) * limit;


    

// Define the Mongoose query

    if(limit < 10){
        
        products = await Product.aggregate([{ $sample: { size: 5 } }]) // Adjust the size as needed
    }
    else{
        products = await Product.find(query).skip(skip).limit(limit);
    }

    console.log(products)
    
    res.status(200).json({
        status: "success",
        data: {
            products,
            page,
            totalPages,
        },
    });
});

exports.createProduct = asyncErrorHandler(async (req, res, next) => {
  
    const products = await Product.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            products: products,
        },
    });
});

exports.getSingleProducts = asyncErrorHandler(async (req, res, next) => {
    const prodId = req.params.id;

    const product = await Product.findById(prodId);

    res.status(200).json({
        status: "success",
        data: {
            product,
        },
    });
});

exports.updateProductDetails = asyncErrorHandler(async (req, res, next) => {
    const prodId = req.params.id;
    const updatedProduct = await Product.findOneAndUpdate(
        { _id: prodId },
        req.body,
    );

    res.status(201).json({
        status: "success",
        data: {
            product: updatedProduct,
        },
    });
});
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
    const prodId = req.query.del;

    await Product.findOneAndDelete({ _id: prodId });

    res.status(200).json({
        status: "success",
    });
});

exports.deleteCart = asyncErrorHandler(async (req, res, next) => {
    const prodId = req.query.prod;
    console.log(prodId);
    console.log(req.body.user.id);

    const cartProd = await Cart.findOne({
        productId: prodId,
        userId: req.body.user.id,
    });

    if (!cartProd) {
        return next(new CustomError("Product is not exists on the cart", 400));
    }

    await Cart.findOneAndDelete({
        productId: prodId,
        userId: req.body.user.id,
    });

    res.status(200).json({
        status: "success",
    });
});

exports.addtoCart = asyncErrorHandler(async (req, res, next) => {
    const prodId = req.query.prod;
    const isAlreadyInCart = await Cart.findOne({
        userId: req.body.user.id,
        productId: prodId,
    });

    if (isAlreadyInCart) {
        return next(new CustomError("Already in cart", 400));
    }

    const product = await Cart.create({
        userId: req.body.user.id,
        productId: prodId,
        quantity: req.body.quantity,
    });

    res.status(201).json({
        status: "success",
        data: {
            product,
        },
    });
});

exports.getAllCarts = asyncErrorHandler(async (req, res, next) => {
    const userId = req.body.user.id;

    const cartProducts = await Cart.find({ userId }).populate("productId");

    console.log(cartProducts);
    let totalPrice = 0;
    cartProducts.forEach((product) => {
        totalPrice += product.productId.price;
    });

    res.status(200).json({
        status: "success",
        data: {
            cart: cartProducts,
            totalPrice,
        },
    });
});

exports.buyProduct = asyncErrorHandler(async (req, res, next) => {
    const prodId = req.query.product;
    const cod = req.query.cod
     

    const prod = await Product.findById(prodId);
   if(!cod){
    const paymentIntent = await stripe.paymentIntents.create({
        amount: prod.price * 100,
        currency: "inr",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    const product = await Order.create({
        userId: req.body.user.id,
        productId: prodId,
    });

    res.status(200).json({
        status: "success",
        data: {
            clientSecret: paymentIntent.client_secret,
            product,
        },
    });
    }

    const product = await Order.create({
        userId: req.body.user.id,
        productId: prodId,
    });

    res.status(200).json({
        status: "success",
        data: {
             
            product,
        },
    });
});

exports.getLatestTransaction = asyncErrorHandler(async (req, res, next) => {
    const prodId = req.query.product;

    const transactions = await Order.find();

    res.status(201).json({
        status: "success",
        data: {
            transactions,
        },
    });
});


exports.getAllPurcheasedProducts = asyncErrorHandler(async(req,res,next)=> {
    console.log(req.body.user._id);
    const orders = await Order.find({userId: req.body.user.id}).populate("productId")
    console.log(orders);
    res.status(201).json({
        status: "success",
        data: {
            orders
        },
    });

})