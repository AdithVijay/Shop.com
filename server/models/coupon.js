const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema({
  code: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  discountValue: {
    type: Number,
    required: true,
    default: 0  // Ensures discount value is non-negative
  },
  minPurchaseAmount:{
    type: Number,
    required: true,
  },
  maxDiscountAmount: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true  
  },
  usageLimit: {
    type: Number,
    required: true,
    min: 1  
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true  
  }
}, {
  timestamps: true 
});

// Export the schema
module.exports = mongoose.model('Coupon', couponSchema);
