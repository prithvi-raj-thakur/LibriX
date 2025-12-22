// book.model.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, required: true },
  publishingYear: { type: Number },
  price: { type: Number, required: true },
  coverImage: { type: String }, // Cloudinary URL
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);