// models/bid.model.js
import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer",
    required: true
  },
  bookName: {
    type: String,
    required: true,
    trim: true
  },
  comment: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["open", "fulfilled", "closed"],
    default: "open"
  }
}, { timestamps: true });

export default mongoose.model("Bid", bidSchema);