const { Schema, model } = require('mongoose');
const AdminShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: [6,'password must be at least 6 caracter'],
    required: [true, "Please enter your password"],
    
  },
  image: {
    public_id:String,
    url:String,
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  otp:Number,
  otp_expiry:Date
});

const Admin = model('Admin', AdminShema);
module.exports = Admin;