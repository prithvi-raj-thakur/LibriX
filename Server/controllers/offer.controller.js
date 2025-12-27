// controllers/offer.controller.js
import Offer from "../models/offer.model.js";
import Notification from "../models/notification.model.js";
import Bid from "../models/bid.model.js";
import { io } from "../server.js";

// controllers/offer.controller.js
export const createOffer = async (req, res) => {
  try {
    const { bidId, price, condition, message, buyerId, bookName } = req.body;
    if (!req.file) return res.status(400).json({ message: "Book image is required" });

    // 1. Create the Offer
    const offer = await Offer.create({
      bidRequest: bidId,
      seller: req.sellerId,
      buyer: buyerId,
      bookImage: req.file.path, // This is the Cloudinary URL
      price,
      condition,
      message
    });

    // 2. Notify the Buyer
    const notification = await Notification.create({
      recipient: buyerId,
      recipientModel: "buyer",
      title: "New Offer Received!",
      message: `A seller offered "${bookName}" for ₹${price}. Click to view details.`,
      
      // ✅ PASS THE IMAGE URL HERE
      imageUrl: req.file.path, 

      type: "order_request",
      orderId: offer._id,
      orderStatus: "pending"
    });

    if (io) {
      io.to(`buyer_${buyerId}`).emit("new_notification", notification);
    }

    res.status(201).json({ success: true, offer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleOfferResponse = async (req, res) => {
  try {
    const { offerId, action } = req.body;
    const status = action === "accept" ? "accepted" : "declined";

    // 1. Update Offer Status
    const offer = await Offer.findByIdAndUpdate(offerId, { status }, { new: true })
      .populate("bidRequest seller buyer");

    if (status === "accepted") {
      await Bid.findByIdAndUpdate(offer.bidRequest._id, { status: "fulfilled" });
      
      // ✅ TRIGGER AUTOMATED LIFECYCLE
      simulateOfferLifecycle(offer);
    }

    // 2. Notify the Seller
    const sellerNote = await Notification.create({
      recipient: offer.seller._id,
      recipientModel: "seller",
      title: `Offer ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      message: `Your offer for "${offer.bidRequest.bookName}" has been ${status}.`,
      type: "order_update"
    });

    if (io) io.to(`seller_${offer.seller._id}`).emit("new_notification", sellerNote);

    res.json({ success: true, message: `Offer ${status}ed` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const simulateOfferLifecycle = (offer) => {
  // --- AFTER 5 MINUTES: Payment Received (Seller) & Out for Delivery (Buyer) ---
  setTimeout(async () => {
    try {
      const sellerPayNote = await Notification.create({
        recipient: offer.seller._id,
        recipientModel: "seller",
        title: "Payment Received",
        message: `Payment of ₹${offer.price} received for "${offer.bidRequest.bookName}".`,
        type: "payment"
      });

      const buyerDelNote = await Notification.create({
        recipient: offer.buyer._id,
        recipientModel: "buyer",
        title: "Order Update",
        message: `Your order for "${offer.bidRequest.bookName}" is out for delivery!`,
        type: "order_update"
      });

      if (io) {
        io.to(`seller_${offer.seller._id}`).emit("new_notification", sellerPayNote);
        io.to(`buyer_${offer.buyer._id}`).emit("new_notification", buyerDelNote);
      }

      // --- AFTER MORE 5 MINUTES (Total 10): Delivered (Buyer) ---
      setTimeout(async () => {
        try {
          const deliveredNote = await Notification.create({
            recipient: offer.buyer._id,
            recipientModel: "buyer",
            title: "Order Delivered",
            message: `Your book "${offer.bidRequest.bookName}" has been delivered.`,
            type: "order_update"
          });

          if (io) io.to(`buyer_${offer.buyer._id}`).emit("new_notification", deliveredNote);
        } catch (err) { console.error(err); }
      }, 300000); // 5 mins

    } catch (err) { console.error(err); }
  }, 300000); // 5 mins
};