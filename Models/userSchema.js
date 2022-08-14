require('dotenv').config();
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "please provide a user name"]
    },
    phonenumber:{
        type: String,
        required: [true, "please provide your phone number"]
    },
    address:{
        type: String,
        required: [true, "please provide your address"]
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
        // match:[/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/, "please provide a valide email"]
    },
    password: {
        type: String,
        required: [true, 'please add a password'],
        minlenght: 6,
        select: false
    },
    user:{
        
    }
   
});

const User = model('User', userSchema);
module.exports = User;