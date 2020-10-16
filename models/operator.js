const mongoose = require('mongoose');

const operatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    id: {
        type: Number,
        required: true,
        unique: true
    },

    prefixes: [
        {
            type: String
        }
    ],

    code: {
        type: String
    }
})

module.exports = mongoose.model('operator', operatorSchema);