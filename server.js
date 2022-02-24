require("dotenv").config();
const express=require("express");
const morgan = require('morgan');
const body_parser=require("body-parser");
const authanticationRouter=require("./routers/authentication");
const speaker = require("./routers/speakers");
const students = require("./routers/students");
const events = require("./routers/event");
const mongoose = require("mongoose");
const multer=require("multer");
const path = require("path");


//image variable
const storage = multer.diskStorage({
    destination:(request,file,cb)=>{
        cb(null,path.join(__dirname , "images"))
    },
    filename:(request,file,cb)=>{
        cb(null ,new Date().toLocaleDateString().replace(/\//g,"-")+ "-" + file.originalname)
    }
})

const fileFilter = (request,file,cb)=>{
    if(file.mimeType == "image/jpg" ||file.mimeType == "image/jpeg" ||
    file.mimetype== "image/png"){
        cb(null, true)
    }else(null,false)   
}

//creat server
const app=  express();
mongoose.connect(process.env.DATABASE)
        .then(()=>{
            console.log("connect..")
            app.listen(process.env.PORT,()=>{
                console.log("I am Listenining")
            });
        })
        .catch(error=>{
            next(error);
        })




//middleware
//first MW  method, url
app.use(morgan(':method :url :status :http-version :response-time '));



//second MW
app.use((request,response,next)=>{
    if(true)
    {
       console.log( "authorized");
       next();
       
    }
    else
    {
        console.log("Not Authorized");
        next(new Error("Not Authorized"));

    }
})
app.use((request,response,next)=>{

    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allow-Methods","GET,POST,DELETE,PUT,OPTIONS");
    response.header("Access-Control-Allow-Headers","Content-Type,Authorization")
    next();

})
app.use("/images", express.static(path.join(__dirname, "images")))
app.use(multer({storage , fileFilter}).single("image"))
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));

//use routers

app.use(authanticationRouter)
app.use(speaker)
app.use(students)
app.use(events)




// MW notfound
app.use((request,response)=>{
    response.status(404).json({data:"Not Fond"});
})
// Error MW
app.use((error,request,response,next)=>{   
    let status=error.status||500;
    response.status(status).json({Error:error+""});
})




