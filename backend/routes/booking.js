const express = require('express');
const multer = require('multer');
const path = require('path');
const bookingController = require('../controllers/bookingController');
const checkAuth = require('../middleware/auth');

const router = express.Router();

// Set up storage for uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // Save to public/images folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });


// Assuming you have already imported necessary modules
// router.post('/add-booking/:projectId', upload.fields([
//     { name: 'images', maxCount: 1 }
// ]), bookingController.addBooking);

router.post('/add-booking/:projectId', upload.single('images'), bookingController.addBooking);
router.get('/get-bookings/:projectId', bookingController.getBookings);
router.get('/get-booking/:bookingId', bookingController.getBooking);
router.delete('/delete-booking/:id', bookingController.deleteBooking);
// router.delete('/delete-booking/:id', bookingController.deleteBooking);
// router.put('/update-booking/:id', upload.fields([
//     { name: 'scrollImages', maxCount: 10 },
//     { name: 'images', maxCount: 10 }
// ]), bookingController.updateBooking);
router.put('/update-booking/:id', upload.single('images'), bookingController.updateBooking);
// router.post('/remove-booking-image', bookingController.removeBookingImage);

module.exports = router;
