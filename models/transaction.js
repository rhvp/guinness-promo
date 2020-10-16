const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },

    reference: {
        type: String,
        required: true
    },

    message: String,

    status: String
}, {
    timestamps: true
})

module.exports = mongoose.model('transaction', transactionSchema);