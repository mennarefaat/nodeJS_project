require("dotenv").config();
const jwt =require("jsonwebtoken")


module.exports = (request,response,next) => {
    let token, decode;
    try {
        token= request.get("Authorization").split(" ")[1]
        decode=jwt.verify(token,process.env.SECRET_KEY)   
    } catch (error) {
        error.message = "Invalid authorization"
        error.status = 403
        next(error)   
    }
    if(decode!==undefined) {
        request.body.Email = decode.Email
        request.body.role=decode.role
        console.log(decode.Email)
        next();
    }
}