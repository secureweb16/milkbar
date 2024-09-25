const BrandSection = require('../models/BrandData');

// Fetch Brand Section
exports.getBrandSection = async (req, res) => {
  try {
    const brandSection = await BrandSection.findOne();
    res.json(brandSection);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching brand section data' });
  }
};

// Add Brand Section
exports.addOrUpdateBrandSection = async (req, res) => {
  const { brandNameOne, brandNameTwo, brandNameThree } = req.body;
  const imagePaths = {
    imageOne: req.files.imageOne ? `/images/${req.files.imageOne[0].filename}` : '',
    imageTwo: req.files.imageTwo ? `/images/${req.files.imageTwo[0].filename}` : '',
    imageThree: req.files.imageThree ? `/images/${req.files.imageThree[0].filename}` : '',
    imageFour: req.files.imageFour ? `/images/${req.files.imageFour[0].filename}` : ''
  };

  try {
    let brandSection = await BrandSection.findOne();

    // If no document exists, create a new one
    if (!brandSection) {
      brandSection = new BrandSection({
        brandNameOne,
        brandNameTwo,
        brandNameThree,
        imageOne: imagePaths.imageOne,
        imageTwo: imagePaths.imageTwo,
        imageThree: imagePaths.imageThree,
        imageFour: imagePaths.imageFour
      });
    } else {
      return res.status(400).json({ message: 'Brand section already exists. Use updateSection to modify data.' });
    }

    await brandSection.save();
    res.json(brandSection);
  } catch (error) {
    res.status(500).json({ message: 'Error saving brand section' });
  }
};

// Update Brand Section
exports.updateSection = async (req, res) => {
  const { brandNameOne, brandNameTwo, brandNameThree } = req.body;
  const imagePaths = {
    imageOne: req.files.imageOne ? `/images/${req.files.imageOne[0].filename}` : '',
    imageTwo: req.files.imageTwo ? `/images/${req.files.imageTwo[0].filename}` : '',
    imageThree: req.files.imageThree ? `/images/${req.files.imageThree[0].filename}` : '',
    imageFour: req.files.imageFour ? `/images/${req.files.imageFour[0].filename}` : ''
  };

  try {
    let brandSection = await BrandSection.findOne();

    if (!brandSection) {
      return res.status(404).json({ message: 'Brand section not found' });
    }

    // Update existing document
    brandSection.brandNameOne = brandNameOne || brandSection.brandNameOne;
    brandSection.brandNameTwo = brandNameTwo || brandSection.brandNameTwo;
    brandSection.brandNameThree = brandNameThree || brandSection.brandNameThree;
    brandSection.imageOne = imagePaths.imageOne || brandSection.imageOne;
    brandSection.imageTwo = imagePaths.imageTwo || brandSection.imageTwo;
    brandSection.imageThree = imagePaths.imageThree || brandSection.imageThree;
    brandSection.imageFour = imagePaths.imageFour || brandSection.imageFour;

    await brandSection.save();
    res.json(brandSection);
  } catch (error) {
    res.status(500).json({ message: 'Error updating brand section' });
  }
};

// Delete Brand Section
exports.deleteBrandSection = async (req, res) => {
  try {
    await BrandSection.deleteOne();
    res.json({ message: 'Brand section deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting brand section' });
  }
};
