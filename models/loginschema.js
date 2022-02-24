const mongoose = require('mongoose');

  const UserSchema = new mongoose.Schema({
    Email: String,
    password: String,
})

module.exports = mongoose.model('user', UserSchema)