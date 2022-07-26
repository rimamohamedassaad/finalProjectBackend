const { Schema, model } = require('mongoose');

const BrandSchema =  new Schema({
    name:{
        type:String,
        required:true,
    }
})
const Brand = model('Brand', BrandSchema);
module.exports = Brand;