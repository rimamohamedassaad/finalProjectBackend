const { Schema, model } = require('mongoose');

const ReportSchema =  new Schema({
    code:{
        type:String,
        required:true,
    },
    // description:{
    //     type:String,
    //     required:true,
    // },
    // linetype:{
    //     type:String,
    //     required:true,
    // },
    color:{
        type:Schema.Types.ObjectId,
        ref:"Color"
    },
    brand:{
        type:Schema.Types.ObjectId,
        ref:"Brand"
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    },

    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    

})
const Report = model('Report', ReportSchema);
module.exports = Report;