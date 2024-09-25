// models/brandSection.js
const mongoose = require('mongoose');

const brandSectionSchema = new mongoose.Schema({
  brandNameOne: { type: String, required: true },
  brandNameTwo: { type: String, required: true },
  brandNameThree: { type: String, required: true },
  imageOne: { type: String },
  imageTwo: { type: String },
  imageThree: { type: String },
  imageFour: { type: String },
});

module.exports = mongoose.model('BrandSection', brandSectionSchema);
