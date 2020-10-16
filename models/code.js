const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('code', codeSchema);