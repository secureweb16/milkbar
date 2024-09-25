const Project = require('../models/Project');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
// Handle form submission for multiple images
exports.addProject = async (req, res) => {
    try {
        const { title,description, whatWeDo, brandDirection } = req.body;
        const images = req.files['images'] ? req.files['images'].map(file => `/images/${file.filename}`) : [];
        const bannerImage = req.files['bannerImage'] ? `/images/${req.files['bannerImage'][0].filename}` : '';
        const featuredImage = req.files['featuredImage'] ? `/images/${req.files['featuredImage'][0].filename}` : '';

        const newProject = new Project({
            title,
            description,
            whatWeDo,
            brandDirection,
            images,
            bannerImage,
            featuredImage
        });

        await newProject.save();

        res.status(200).json({ message: 'Project added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add project' });
    }
};


exports.projectsList = async (req, res) => {
    try {
        const projects = await Project.find(); // Fetch all projects
        // console.log(projects);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects' });
    }
};

exports.getProject = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        
        const { id } = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' }); // If no project is found
        }
         // Delete associated images from the file system
        
        const fs = require('fs');
        deletedProject.images.forEach(imagePath => {
            fs.unlink(`./public${imagePath}`, err => {
                if (err) console.error('Failed to delete image:', imagePath);
            });
        });
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete project' });
    }
};

exports.removeImage = async (req, res) => {
    const { projectId, imageName } = req.body;

    try {
        // Find the project first
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if the image is a gallery image, banner image, or featured image
        let updatedData = {};
        
        if (project.images.includes(imageName)) {
            // Remove image from gallery
            updatedData.images = project.images.filter(image => image !== imageName);
        } else if (project.bannerImage === imageName) {
            // If it's the banner image, set it to null or keep the existing value based on your requirements
            updatedData.bannerImage = null; // or ''
        } else if (project.featuredImage === imageName) {
            // If it's the featured image, set it to null or keep the existing value based on your requirements
            updatedData.featuredImage = null; // or ''
        } else {
            return res.status(404).json({ message: 'Image not found in project' });
        }

        // Update the project with the new data
        const updatedProject = await Project.findByIdAndUpdate(projectId, { $set: updatedData }, { new: true });

        // Check if update was successful
        if (!updatedProject) {
            return res.status(404).json({ message: 'Failed to update project' });
        }

        // Remove the image from the filesystem
        const filePath = path.join(__dirname, '..', 'public', imageName);
        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting image from filesystem' });
            }
            res.status(200).json({ message: 'Image removed successfully', project: updatedProject });
        });
    } catch (error) {
        console.error('Error removing image:', error);
        res.status(500).json({ message: 'Error removing image', error });
    }
};
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title,description, whatWeDo, brandDirection } = req.body;

        // Retrieve the current project from the database
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Map the new images from the uploaded files
        const newImages = req.files['images'] ? req.files['images'].map(file => `/images/${file.filename}`) : [];
        const bannerImage = req.files['bannerImage'] ? `/images/${req.files['bannerImage'][0].filename}` : project.bannerImage; // Use existing if not provided
        const featuredImage = req.files['featuredImage'] ? `/images/${req.files['featuredImage'][0].filename}` : project.featuredImage; // Use existing if not provided

        // Create an updated data object
        const updatedData = {
            title: title || project.title, // Keep existing if not provided
            description: description || project.description, // Keep existing if not provided
            whatWeDo: whatWeDo || project.whatWeDo, // Keep existing if not provided
            brandDirection: brandDirection || project.brandDirection, // Keep existing if not provided
            images: [...project.images, ...newImages], // Append new images to existing images
            bannerImage, // Update banner image
            featuredImage // Update featured image
        };

        // Update the project in the database
        const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });
        
        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });

    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Failed to update project' });
    }   
};