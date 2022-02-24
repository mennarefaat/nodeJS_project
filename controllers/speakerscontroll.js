const {validationResult}=require("express-validator");
const speakers = require("./../models/speakersschema");
const jwt = require("jsonwebtoken")
const fs=require("fs")


exports.getSpeaker=(request,response,next)=>{
   if(request.body.role=="admin" || request.body.role=="speaker"){
      if(request.body.role=="speaker"){
         speakers.findOne({Email:request.body.Email})
                  .then(data=>{
                     response.status(200).json(data)
                  })
                  .catch(error=>{
                     next(error);
                  })
                  console.log(request.body.Email)
   
      }else if(request.body.role=="admin") {speakers.find({})
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

exports.createSpeaker=(request,response,next)=>{
   if(request.body.role == "speaker"){

      let errors=validationResult(request);
      if(!errors.isEmpty())
      {
         let error=new Error();
         error.status=422;
         
         error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
         
         throw error;
           
      }
      let object=new speakers({
         _id:request.body.id,
         fullName:request.body.fullName,
         Email:request.body.Email,
         password:request.body.password,
         image:request.file.filename,
         Address:request.body.Address,
         role:request.body.role
      })
      object.save()
             .then(data=>{
               let token=jwt.sign({
                  Email:request.body.Email,
                  role:request.body.role,
                  _id:request.body.id
              },process.env.SECRET_KEY ,{expiresIn:"1h"})  
              response.status(201).json({ message: "register success" , data , token })
             })
             .catch(error=>next(error))
   }else{
      response.status(200).json({massage:"you are not allowed"})
   }


}

exports.updateSpeakers=(request,response,next)=>{
   if(request.body.role=="speaker" || request.body.role == "admin"){

      speakers.findOneAndUpdate({Email:request.body.Email},{
         $set:{
           fullName:request.body.fullName,
           password:request.body.password,
           image:request.body.image,
           Address:request.body.Address
         }})
         .then(data=>{
           response.status(200).json({massage:"update",data})
           fs.unlink(`./../images/${data.image}`)
         })
         .catch(error=>next(error)) 
      }
      else{
         
   
         throw new Error("not DMINSTRtor")
      }
}


exports.deleteSpeakers=(request,response,next)=>{
   if (request.body.role=="speaker" || request.body.role=="admin") {
      
      speakers.findOneAndDelete({Email:request.body.Email})
               .then(data=>{
                     if(data==null) throw new Error("speaker Is not Found!")
                     response.status(200).json({message:"deleted"})
                  
               })
               .catch(error=>next(error))
   }else{

      throw new Error("not DMINSTRtor")
   }
  
}