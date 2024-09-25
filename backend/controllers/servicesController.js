const Services = require('../models/Services');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
// Handle form submission for multiple images
exports.addService = async (req, res) => {
    try {
        const { title, description } = req.body;
        const featuredImage = req.files['featuredImage'] ? `/images/${req.files['featuredImage'][0].filename}` : '';

        const newService = new Services({
            title,
            description,
            featuredImage
        });

        await newService.save();

        res.status(200).json({ message: 'Service added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add Service' });
    }
};


exports.servicesList = async (req, res) => {
    try {
        const services = await Services.find(); // Fetch all projects
        // console.log(projects);
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Services' });
    }
};

exports.getService = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL
    try {
        const service = await Services.findById(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service' });
    }
};

exports.deleteService = async (req, res) => {
    try {
        
        const { id } = req.params;
        const deletedService = await Services.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' }); // If no project is found
        }
         // Delete associated images from the file system
        
        const fs = require('fs');
        deletedService.images.forEach(imagePath => {
            fs.unlink(`./public${imagePath}`, err => {
                if (err) console.error('Failed to delete image:', imagePath);
            });
        });
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete Service' });
    }
};

exports.removeImage = async (req, res) => {
    const { serviceId, imageName } = req.body;

    try {
        // Find the project first
        const service = await Services.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Check if the image is a gallery image, banner image, or featured image
        let updatedData = {};
        
        if (service.featuredImage === imageName) {
            // If it's the featured image, set it to null or keep the existing value based on your requirements
            updatedData.featuredImage = null; // or ''
        } else {
            return res.status(404).json({ message: 'Image not found in service' });
        }

        // Update the project with the new data
        const updatedService = await Services.findByIdAndUpdate(serviceId, { $set: updatedData }, { new: true });

        // Check if update was successful
        if (!updatedService) {
            return res.status(404).json({ message: 'Failed to update service' });
        }

        // Remove the image from the filesystem
        const filePath = path.join(__dirname, '..', 'public', imageName);
        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting image from filesystem' });
            }
            res.status(200).json({ message: 'Image removed successfully', service: updatedService });
        });
    } catch (error) {
        console.error('Error removing image:', error);
        res.status(500).json({ message: 'Error removing image', error });
    }
};
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        // Retrieve the current project from the database
        const service = await Services.findById(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        
        const featuredImage = req.files['featuredImage'] ? `/images/${req.files['featuredImage'][0].filename}` : service.featuredImage; // Use existing if not provided

        // Create an updated data object
        const updatedData = {
            title: title || service.title, // Keep existing if not provided
            description: description || service.description, 
            featuredImage 
        };

        // Update the project in the database
        const updatedService = await Services.findByIdAndUpdate(id, updatedData, { new: true });
        
        res.status(200).json({ message: 'Service updated successfully', service: updatedService });

    } catch (error) {
        console.error('Error updating Service:', error);
        res.status(500).json({ message: 'Failed to update Service' });
    }   
};