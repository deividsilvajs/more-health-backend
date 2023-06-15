const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true }
});

module.exports = mongoose.model('users', schema);