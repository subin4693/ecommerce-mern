const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("./AsyncErrorHandler");
const CustomError = require("./CustomError");

exports.verifyToken = asyncErrorHandler(async(req,res,next)=>{
    console.log("verifying token")
    const testToken = req.cookies.token
 
    let token;
    if(testToken && testToken.startsWith("bearer")){
         
        token = testToken.split(" ")[1]
    }
  
    if(!token){
        
        return res.status(200).json({
            status:"success",
            message:"You are not loggedin"
        })
    }
     
    const decoded =  jwt.verify(token,process.env.JWT_SECRECT)

    req.body.user = {
        id:decoded.id,
        role: decoded.role
    }
    
    next();
})