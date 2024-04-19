const express = require('express');
const cookieParser = require("cookie-parser")
var cors = require('cors')

const userRouter = require('./Routes/UserRouter');
const productRouter = require('./Routes/ProductRouter')
const bannerRouter = require('./Routes/BannerRouter');



const CustomError = require('./Utils/CustomError');
const globalErrorHandler = require("./Controllers/errorController")


let app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials : true
}))
app.use(express.json());
app.use(cookieParser())

 
//USING ROUTES


app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/banner',bannerRouter)

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on the server!`
    });
    // const err = new Error(`Can't find ${req.originalUrl} on the server!`);
    // err.status = 'fail';
    // err.statusCode = 404;
    const error = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
});

app.use(globalErrorHandler);

module.exports = app;