const Booking = require('../models/Booking');
const path = require('path');
const fs = require('fs');
// Handle form submission for multiple images
exports.addBooking = async (req, res) => {
    const projectId = req.params.projectId; // Get the project ID from the request
    const { title, description } = req.body;

    // Assuming you have only one image being uploaded
    const image = req.file ? `/images/${req.file.filename}` : '';

    const newBooking = new Booking({ projectId, title, description, images: [image] });
    await newBooking.save();

    res.status(201).json({ message: 'Booking added successfully', booking: newBooking });
};

exports.getBookings = async (req, res) => {
    const projectId = req.params.projectId;
    try {
        // const project = await Project.findById(projectId);
        const bookings = await Booking.find({ projectId });
        if (!bookings) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project' });
    }
}

exports.getBooking = async (req, res) => {
    const bookingId = req.params.bookingId;
    try {

        // const project = await Project.findById(projectId);
        // const booking = await Booking.find({ projectId });
        const booking = await Booking.findById(bookingId);
        // console.log(booking);
        if (!booking) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project' });
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        
        const { id } = req.params;
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Project not found' }); // If no project is found
        }
         // Delete associated images from the file system
        
        const fs = require('fs');
        deletedBooking.images.forEach(imagePath => {
            fs.unlink(`./public${imagePath}`, err => {
                if (err) console.error('Failed to delete image:', imagePath);
            });
        });
        // deletedBooking.scrollImages.forEach(imagePath => {
        //     fs.unlink(`./public${imagePath}`, err => {
        //         if (err) console.error('Failed to delete image:', imagePath);
        //     });
        // });
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete project' });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check if an image was uploaded
        const image = req.file ? `/images/${req.file.filename}` : null;

        const updatedData = {
            title: title || booking.title,
        };

        // Update the images if a new image is uploaded
        if (image) {
            updatedData.images = [image];
        }

        const updatedBooking = await Booking.findByIdAndUpdate(id, updatedData, { new: true });
        
        res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });

    } catch (error) {
        console.error('Error updating Booking:', error);
        res.status(500).json({ message: 'Failed to update Booking' });
    }   
};

// Remove Image from Booking
// exports.removeBookingImage = async (req, res) => {
//     const { bookingId, imageName, type } = req.body;

//     try {
//         // Find the booking by ID
//         const booking = await Booking.findById(bookingId);

//         if (!booking) {
//             return res.status(404).json({ message: 'Booking not found' });
//         }

//         // Determine which array (images or scrollImages) to modify
//         let updatedImagesArray;
//         if (type === 'images') {
//             updatedImagesArray = booking.images.filter(image => image !== imageName);
//             booking.images = updatedImagesArray;
//         } else if (type === 'scrollImages') {
//             updatedImagesArray = booking.scrollImages.filter(image => image !== imageName);
//             booking.scrollImages = updatedImagesArray;
//         } else {
//             return res.status(400).json({ message: 'Invalid image type' });
//         }

//         // Remove the image file from the filesystem
//         const imagePath = path.join(__dirname, '..', 'public', imageName); 
//         // console.log(imagePath);// Adjust the path according to your setup
//         fs.unlink(imagePath, (err) => {
//             if (err) {
//                 console.error('Failed to remove image from filesystem:', err);
//                 return res.status(500).json({ message: 'Failed to remove image from filesystem' });
//             }
//             console.log('Image removed from filesystem:', imagePath);
//         });

//         // Save the updated booking
//         await booking.save();

//         return res.status(200).json({ message: 'Image removed successfully', booking });
//     } catch (err) {
//         console.error('Error removing image:', err);
//         return res.status(500).json({ message: 'Server error' });
//     }
// };


