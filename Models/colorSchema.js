const { Schema, model } = require('mongoose');

const ColorSchema =  new Schema({
    name:{
        type:String,
        required:true,
    }
})
const Color = model('Color', ColorSchema);
module.exports = Color;