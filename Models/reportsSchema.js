const { Schema, model } = require('mongoose');

const ReportSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reportDate: {
        type: String,
        ref: "User"
    },
    color: {
        type: Schema.Types.ObjectId,
        ref: "Color"
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand"
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    linetype: {
        type: String,
        required: true,
    },
    securitycode: {
        type: String,
        required: true,
    },
    serialnumber: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ownerphonenumber: {
        type: String,
        required: true,
    },
    stolenphonenumber: {
        type: String,
        required: true,
    },
    // reportimage: {
    //     type: Array,
    //     required: true,
    // },
})
const Report = model('Report', ReportSchema);
module.exports = Report;