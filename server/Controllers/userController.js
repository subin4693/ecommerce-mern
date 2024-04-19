const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../Models/UserModel");
const asyncErrorHandler = require("../Utils/AsyncErrorHandler");
const CustomError = require("../Utils/CustomError");

exports.signup = asyncErrorHandler(async (req, res, next) => {
      
    const { email, name, password } = req.body;
    console.log(email, name, password);

    const hashed = await bcryptjs.hash(password, 8);

    const newUser = await User.create({ email, name, password: hashed });
    const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.JWT_SECRECT,
        {
            expiresIn: process.env.LOGIN_EXPIRES,
        },
    );

    newUser.password = undefined;
    
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    
  
    res.cookie("token", "bearer " + token, { 
        expires: expirationDate,
        
    });

    res.status(201).json({
        status: "success",

        data: {
            user: newUser,
        },
    });
});

exports.signin = asyncErrorHandler(async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        const error = new CustomError(
            "Please enter mail id and password for login",
            400,
        );
        return next(error);
    }
console.log(email)
    const user = await User.findOne({ email });
console.log(user)
    const match = await bcryptjs.compare(password, user.password);
console.log(match)
    if (!match) {
        const error = new CustomError(
            "Please enter a correct email or password",
            400,
        );
        return next(error);
    }
    user.password = undefined;
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRECT,
        {
            expiresIn: process.env.LOGIN_EXPIRES,
        },
    );
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    
  
    res.cookie("token", "bearer " + token, { 
        expires: expirationDate,
        
    });
    res.status(201).json({
        status: "success",

        data: {
            user,
        },
    });
});

exports.verify = asyncErrorHandler(async (req, res, next) => {
    const userId = req.body.user.id;

    console.log(userId);
    const user = await User.findById(userId).select("-password");
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

exports.recentUsers = asyncErrorHandler(async (req, res, next) => {
    const users = await User.find().select("-password").limit(6);
    res.status(200).json({
        status: "success",
        data: {
            users,
        },
    });
});

exports.getUsersForChat = asyncErrorHandler(async (req, res, next) => {
    // Aggregate the data

    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const userData = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" },
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 },
            },
        },
    ]);
    res.status(200).json({
        status: "success",
        data: {
            userData,
        },
    });
});

exports.signout = asyncErrorHandler(async(req,res,next)=>{
    res.clearCookie("token");

    res.status(200).json({
        status: "success",
        message: "User successfully signed out."
    });
         
})
