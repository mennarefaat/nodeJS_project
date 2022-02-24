const {validationResult}=require("express-validator");
const {body,query,param}=require("express-validator");
const User = require("./../models/loginschema")
const bcrypt=require("bcrypt")
const students = require("./../models/studentschema")
const speakers=require("./../models/speakersschema")
const creatstudent=require("./../controllers/studentcontrollers")
const createspeaker=require("./../controllers/speakerscontroll")
const jwt = require("jsonwebtoken")
require("dotenv").config();


//fuction to check role
function check(request,response,next ){
    if(request.body.role == "speaker"){
        createspeaker.createSpeaker(request,response,next)
        // response.redirect(307 , "/speakers")
    }else {
        creatstudent.createStudent(request,response,next)
        // response.redirect(307 , "/students")
    }
}
//function to check email and checkMailAndPassword
async function checkMailAndPassword(user,request,response, next) {
    try {
        let data = await user.findOne({ "Email": request.body.Email});
        if (data == null) {
            throw new Error("this user is not found")
        } else {
            let matched = await bcrypt.compare(request.body.password, data.password)     
            if (matched) {
                let token=jwt.sign({
                    Email:request.body.Email,
                    role:request.body.role,
                    _id:request.body.id
                },process.env.SECRET_KEY ,{expiresIn:"1h"})  
                console.log(process.env.SECRET_KEY)  //secret according to mail
                response.status(201).json({ message: "logged in" , data , token })
            } else {
                next("password is wrong are you want to update it?")
                
            }
        }
    } catch (error) {
      throw error;
    }

}
//function to update password
function updatePassword(users,request, response , next){
    users.findOneAndUpdate({Email:request.body.Email},{
            $set:{
              password:request.body.password,
            }})
            .then(data=>{
                if(data!==null){
                    console.log(data)
                    response.status(200).json({massage:"update",data})

                }else{
                    next("you are not authorized")
                }
            })
            .catch(error=>next(error)) 

        
}

//check of role
function updatecheck(request,response,next){
    if(request.body.role=="speaker"||request.body.role=="admin"){
        updatePassword(speakers,request,response, next)

    }else{
        updatePassword(students,request,response, next)
    }
}


//function to check role and loginCheck
function checkLogin(request,response,next){
    if(request.body.role=="speaker"||request.body.role=="admin"){
        checkMailAndPassword(speakers,request,response, next)

    }else{
        checkMailAndPassword(students,request,response, next)
    }
}
//to check login
exports.loginCheck=(request,response,next)=>{

    const errors= validationResult(request);
    if(!errors.isEmpty())
    {
        const error=new Error();
        error.status=422;
        error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
        throw error;
            
    }else{
        checkLogin(request,response,next)
      
    }
}

//create a new account
exports.creatAccount=(request,response,next)=>{
    const errors= validationResult(request);
    if(!errors.isEmpty())
    {
        const error=new Error();
        error.status=422;
        error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
        throw error;
            
    }else{
        check(request,response,next )
        
    }
    

}
//update an account
exports.updateAccount=(request,response,next)=>{
    const errors= validationResult(request);
    if(!errors.isEmpty())
    {
        const error=new Error();
        error.status=422;
        error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
        throw error;
            
    }else{
        updatecheck(request,response,next )
        
    }

}