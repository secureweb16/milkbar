const express = require('express');
const multer = require('multer');
const path = require('path');
const servicesController = require('../controllers/servicesController');
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

router.post('/add-service', upload.fields([
    { name: 'featuredImage', maxCount: 1 }
]), servicesController.addService);

// router.post('/add-project', upload.array('images', 10), projectController.addProject);
router.get('/get-services', servicesController.servicesList);
router.get('/get-service/:id', servicesController.getService);
router.delete('/delete-service/:id', servicesController.deleteService);
router.post('/remove-service-image', servicesController.removeImage);
// Route to update a project
// router.put('/update-project/:id', upload.array('images', 10), projectController.updateProject);
router.put('/update-service/:id', upload.fields([
    { name: 'featuredImage', maxCount: 1 } // Single featured image
]), servicesController.updateService);
module.exports = router;
