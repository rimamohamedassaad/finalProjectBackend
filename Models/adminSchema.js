const { Schema, model } = require('mongoose');

const ModelSchema = new Schema({
    first_name: String,
    last_name: String,
    password: String,
    email: String,
    profile : String,
    phone: Number,
   } );

const Admin = model('Admin', ModelSchema);
module.exports = Admin;