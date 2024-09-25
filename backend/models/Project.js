const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    whatWeDo: {
        type: String,
        required: true
    },
    brandDirection: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    bannerImage: {
        type: String,
        required: true
    },
    featuredImage: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
