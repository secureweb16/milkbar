// routes/brandSectionRoutes.js
const express = require('express');
const multer = require('multer');
const { getBrandSection, addOrUpdateBrandSection, deleteBrandSection ,updateSection} = require('../controllers/brandSectionController');

const router = express.Router();

// Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.get('/brandsection', getBrandSection);
router.post('/brandsection', upload.fields([{ name: 'imageOne' }, { name: 'imageTwo' }, { name: 'imageThree' }, { name: 'imageFour' }]), addOrUpdateBrandSection);
router.delete('/brandsection', deleteBrandSection);
router.put('/brandsection', upload.fields([{ name: 'imageOne' }, { name: 'imageTwo' }, { name: 'imageThree' }, { name: 'imageFour' }]), updateSection);  // Update Route

module.exports = router;
