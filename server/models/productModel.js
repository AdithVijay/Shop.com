const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categorie',  // Referencing the Category model
    required: true
  },
  sleeveType: {
    type: String,
    enum: ['Full sleeve', 'Half sleeve', 'Sleeveless'],  // Only three types
    required: true
  },
  sizes: {
    S: { type: Number, default: 0 },
    M: { type: Number, default: 0 },
    L: { type: Number, default: 0 },
    XL: { type: Number, default: 0 },
    XXL: { type: Number, default: 0 }
  },
  regularPrice: {
    type: Number,
    required: true
  },
  salePrice: {
    type: Number,
    required: true
  },
  images: [
    {
        type: String,
        required: true,
    },
],

  createdAt: {
    type: Date,
    default: Date.now
  },
});
const ProductData = mongoose.model('Product', productSchema);

module.exports= ProductData