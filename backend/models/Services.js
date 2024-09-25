const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featuredImage: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('services', ServicesSchema);
