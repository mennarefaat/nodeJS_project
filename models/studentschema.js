const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

//build speakerschema
const schema = new mongoose.Schema({
    _id:Number,
    fullName:{type:"string", required:true},
    Email:{type:"string", required:true, unique:true},
    password:{type:"string", required:true}
})
//auto increment
schema.plugin(AutoIncrement, { id: 'student_counter', inc_field: '_id' });
schema.plugin(require('mongoose-bcrypt'));

//register into mongoose
module.exports=mongoose.model("students",schema)