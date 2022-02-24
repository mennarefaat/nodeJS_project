const mongoose = require('mongoose');

//build eventscema
const schema = new mongoose.Schema({
    _id:{type:Number},
    title:{type:"string", required:true},
    eventDate:{type:"string" , required:true},
    main_speaker:{type:mongoose.Types.ObjectId,ref:"speakers" , required:true},
    speakers:[{type:mongoose.Types.ObjectId,ref:"speakers"}],
    students:[{type:Number,ref:"students"}],

})
//register into mongoose
module.exports=mongoose.model("events",schema)



