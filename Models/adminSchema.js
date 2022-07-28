const { Schema, model } = require('mongoose');

const AdminShema = new Schema({
    first_name: String,
    last_name: String,
    password: String,
    email: String,
    profile : String,
    phone: Number,
   } );

const Admin = model('Admin', AdminShema);
module.exports = Admin;