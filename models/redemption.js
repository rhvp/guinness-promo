const mongoose = require('mongoose');

const redemptionSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    operator: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['success', 'failed'],
        default: 'success'
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model('redemption', redemptionSchema);