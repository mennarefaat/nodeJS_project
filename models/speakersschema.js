const mongoose = require("mongoose");

//build speakerschema
const schema = new mongoose.Schema({
    fullName: { type: "string", required: true },
    Email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    image: { type: "string", required: true },
    Address: {
        type: "string",
        required: true,
        city: { type: "string" },
        street: { type: "string" },
        building: { type: "string" },
    },
    role: { type: "string", required: true },
});
//register into mongoose
schema.plugin(require("mongoose-bcrypt"));
module.exports = mongoose.model("speakers", schema);
