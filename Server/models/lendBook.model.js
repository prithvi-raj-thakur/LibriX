import mongoose from 'mongoose';

const LendBookSchema = new mongoose.Schema({
  lenderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lender', // Points to your User model
    required: true 
  },
  isbn: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  cover_image: { type: String, required: true }, // The URL from your Cloudinary logic
  category: { 
    type: String, 
    required: true 
  },
  condition: { 
    type: String, 
    enum: ['new', 'like-new', 'good', 'fair'], 
    required: true 
  },
  rent_price_per_week: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('LendBook', LendBookSchema);