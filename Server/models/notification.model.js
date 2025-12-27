import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, required: true }, // Can be Buyer or Seller ID
  recipientModel: { type: String, enum: ["buyer", "seller"], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },

orderStatus: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending"
  },


  isRead: { type: Boolean, default: false },
  type: { type: String, enum: ["order_request", "order_update", "payment"] }
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);