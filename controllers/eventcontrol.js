const {validationResult}=require("express-validator");
const events=require("./../models/eventschema")
speakers=require("./../models/speakersschema")


exports.getEvent=(request,response,next)=>{       //speaker and student have permision to get events
   

      if(request.body.id){
          events.findById({_id:request.body.id})
                   .then(data=>{
                      response.status(200).json(data)
                   })
                   .catch(error=>{
                      next(error);
                   })
       }else {events.find({})
                .then(data=>{
                   response.status(200).json(data)
                })
                .catch(error=>{
                   next(error);
                })
             }
   

}

exports.createEvent=(request,response,next)=>{
   if(request.body.role=="admin"){                              //admin only can add
      let object=new events({
          _id:request.body.id,
          title:request.body.title,
          eventDate:request.body.eventDate,
          main_speaker:request.body.main_speaker,
          speakers:request.body.speakers,
          students:request.body.students
       })
       object.save()
              .then(data=>{
                 
                 response.status(201).json({massage:"added",data})
              })
              .catch(error=>next(error))
              console.log(request.body.id , request.body.title)

   }else{

      throw new Error("not DMINSTRtor")
   }

}

exports.updateEvents=(request,response)=>{
   if(request.body.role=="admin"){ 
      events.findByIdAndUpdate(request.body.id,{     //admin only can update
          $set:{
              title:request.body.title,
              eventDate:request.body.eventDate,
              main_speaker:request.body.main_speaker,
              speakers:request.body.speakers,
              students:request.body.students,
          }})
          .then(data=>{
            response.status(200).json({massage:"update",data})
          })
          .catch(error=>next(error)) 
          

   }else{

      throw new Error("not DMINSTRtor")
   }
}
//admin only
exports.deleteEvent=(request,response,next)=>{
   if(request.body.role=="admin"){
      
      events.findByIdAndDelete(request.body.id)
      .then(data=>{
            if(data==null) throw new Error("event Is not Found!")
            response.status(200).json({message:"deleted"})
         
      })
      .catch(error=>next(error))
   }else{

      throw new Error("not DMINSTRtor")
   }

  
   
}