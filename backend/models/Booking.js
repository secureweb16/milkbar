const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    projectId: { 
        type: String,
        required: true
    },
    title: { 
        type: String,
        required: true
    },
    // description: {
    //      type: String,
    //      required: true
    // },
    // scrollImages: [{ 
    //     type: String,
    //     required: true 
    // }],
    images: [{ 
        type: String,
        required: true 
    }],
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
