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
    // description:{
    //     type:String,
    //     required:true,
    // },
    // address:{
    //     type:String,
    //     required:true,
    // },
    // phone:{
    //     type:String,
    //     required:true,
    // },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    return next()
})
userSchema.methods.matchPassword = async function (pass) {
    return await bcrypt.compare(pass, this.password)
}

userSchema.methods.getResetPassword = async function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date().now() + 10 * (60*1000)
    return resetToken;
}
const User = model('User', userSchema);
module.exports = User;