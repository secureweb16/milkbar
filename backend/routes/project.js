const express = require('express');
const multer = require('multer');
const path = require('path');
const projectController = require('../controllers/projectController');
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

// Route to add a project with multiple images

router.post('/add-project', upload.fields([
    { name: 'images', maxCount: 10 }, // Adjust maxCount as needed
    { name: 'bannerImage', maxCount: 1 },
    { name: 'featuredImage', maxCount: 1 }
]), projectController.addProject);

// router.post('/add-project', upload.array('images', 10), projectController.addProject);
router.get('/get-projects', projectController.projectsList);
router.get('/get-project/:id', projectController.getProject);
router.delete('/delete-project/:id', projectController.deleteProject);
router.post('/remove-image', projectController.removeImage);
// Route to update a project
// router.put('/update-project/:id', upload.array('images', 10), projectController.updateProject);
router.put('/update-project/:id', upload.fields([
    { name: 'images', maxCount: 10 }, // Multiple gallery images
    { name: 'bannerImage', maxCount: 1 }, // Single banner image
    { name: 'featuredImage', maxCount: 1 } // Single featured image
]), projectController.updateProject);
module.exports = router;
