const {validationResult}=require("express-validator");
const students=require("./../models/studentschema")
const jwt = require("jsonwebtoken")


exports.getAllstudents=(request,response,next) => {
   if(request.body.role=="student" ||request.body.role=="admin"){  //only admin and student
      if(request.body.role=="student"){
          students.findOne({Email:request.body.Email})
                   .then(data=>{
                      response.status(200).json(data)
                   })
                   .catch(error=>{
                      next(error);
                   })
                   console.log(request.body._id)
    
       }else if(request.body.role=="admin") {students.find({})
                .then(data=>{
                   response.status(200).json(data)
                })
                .catch(error=>{
                   next(error);
                })
             }

   }else{

      throw new Error("not DMINSTRtor")
   }
}


exports.createStudent=(request,response,next)=>{ 
   if(request.body.role=="student"){
      let errors=validationResult(request);
      if(!errors.isEmpty())
      {
         let error=new Error();
         error.status=422;
         
         error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
         
         throw error;
           
      }

      let object=new students({
         _id:request.body.id,
         fullName:request.body.fullName,
         Email:request.body.Email,
         password:request.body.password,
         
      })
      object.save()
             .then(data=>{
                let token=jwt.sign({
                   Email:request.body.Email,
                   role:request.body.role,
                   _id:request.body.id
               },process.env.SECRET_KEY ,{expiresIn:"1h"})  
               console.log(process.env.SECRET_KEY)  //secret according to mail
               response.status(201).json({ message: "register success" , data , token })
          
                
             })
             .catch(error=>next(error))
   }else{
      response.status(200).json({ message: "you are not authorize"})
   }
}

exports.updateStudent=(request,response,next)=>{
   if(request.body.role=="student"){
      students.findOneAndUpdate({Email:request.body.Email},{
          $set:{
            fullName:request.body.fullName,
            password:request.body.password
          }})
          .then(data=>{
            response.status(200).json({massage:"update",data})
          })
          .catch(error=>next(error)) 
   }else{

      throw new Error("not DMINSTRtor")
   }
    
}

exports.deleteStudent=(request,response,next)=>{
   if(request.body.role=="student"){
      students.findOneAndDelete(request.body.Email)
      .then(data=>{
            if(data==null) throw new Error("speaker Is not Found!")
            response.status(200).json({message:"deleted"})
         
      })
      .catch(error=>next(error))

   }else{

      throw new Error("not DMINSTRtor")
   }
}