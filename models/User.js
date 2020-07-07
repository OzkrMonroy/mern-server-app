const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  userEmail: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  userPassword: {
    type: String,
    required: true,
    trim: true
  },
  userRegisterDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('User', UsersSchema)