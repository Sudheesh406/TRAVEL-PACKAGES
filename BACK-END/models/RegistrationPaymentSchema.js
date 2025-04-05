const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true, 
    },
    amount: {
        type: Number,
        required: true,
    },
    gstNumber: {
        type: String,
        required: true,
    },
    operatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TourOperator',
        required: true,
    },
}, { timestamps: true });

const RegistrationPayment = mongoose.model('RegistrationPayment', schema);
module.exports = RegistrationPayment;

