// models/offer.model.js
import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  bidRequest: { type: mongoose.Schema.Types.ObjectId, ref: "Bid", required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer", required: true },
  bookImage: { type: String, required: true }, // Cloudinary URL
  price: { type: Number, required: true },
  condition: { type: String, enum: ["new", "good", "fair"], required: true },
  message: { type: String },
  status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("Offer", offerSchema);