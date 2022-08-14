const { Schema, model } = require('mongoose');

const ReportSchema = new Schema({
    ownerName: {
        type: String,
        required: true,
    },
    reportDate: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
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
    reportimage: {
        type: Array,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
})
const Report = model('Report', ReportSchema);
module.exports = Report;