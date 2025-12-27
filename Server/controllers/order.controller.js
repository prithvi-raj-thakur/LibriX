import Order from "../models/order.model.js";
import Notification from "../models/notification.model.js";
import Book from "../models/book.model.js";
import { io } from "../server.js";

/* ----------------------------------------------------
   1️⃣ BUYER PLACES ORDER
---------------------------------------------------- */
export const placeOrder = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId).populate("seller");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const sellerId = book.seller._id.toString();

    const order = await Order.create({
      book: book._id,
      buyer: req.buyerId,
      seller: sellerId,
      amount: book.price,
      status: "pending",
    });

    const notification = await Notification.create({
      recipient: sellerId,
      recipientModel: "seller", // ✅ lowercase (IMPORTANT)
      title: "New Order Received",
      message: `New order for "${book.title}". Amount: ₹${book.price}`,
      orderId: order._id,
      type: "order_request",
      orderStatus: "pending",
    });

    // ✅ REAL-TIME EMIT TO SELLER
    io.to(`seller_${sellerId}`).emit("new_notification", notification);

    return res.status(201).json({
      success: true,
      message: "Order placed! Notification sent to seller.",
      order,
    });
  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ----------------------------------------------------
   2️⃣ SELLER ACCEPT / DECLINE
---------------------------------------------------- */
export const handleOrderAction = async (req, res) => {
  try {
    const { orderId, action } = req.body;

    const order = await Order.findById(orderId).populate("book buyer seller");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const buyerId = order.buyer._id.toString();
    const sellerId = order.seller._id.toString();

    if (!["accept", "decline"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    order.status = action === "accept" ? "accepted" : "cancelled";
    await order.save();

    const buyerNotification = await Notification.create({
      recipient: buyerId,
      recipientModel: "buyer",
      title: action === "accept" ? "Order Confirmed" : "Order Cancelled",
      message:
        action === "accept"
          ? `Your order for "${order.book.title}" has been confirmed!`
          : `Your order for "${order.book.title}" was cancelled by the seller.`,
      type: "order_update",
      orderStatus: order.status,
    });

    // ✅ REAL-TIME EMIT TO BOTH
    io.to(`buyer_${buyerId}`).emit("new_notification", buyerNotification);
    io.to(`seller_${sellerId}`).emit("new_notification");

    if (action === "accept") {
      simulateDelivery(order._id);
    }

    return res.json({
      success: true,
      message: `Order ${action}ed successfully`,
    });
  } catch (error) {
    console.error("ORDER ACTION ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ----------------------------------------------------
   3️⃣ DELIVERY SIMULATION
---------------------------------------------------- */
const simulateDelivery = (orderId) => {
  setTimeout(async () => {
    try {
      const order = await Order.findById(orderId).populate("buyer seller");
      if (!order) return;

      io.to(`buyer_${order.buyer._id}`).emit("new_notification");
      io.to(`seller_${order.seller._id}`).emit("new_notification");
    } catch (err) {
      console.error("DELIVERY SIM ERROR:", err);
    }
  }, 10000);
};

/* ----------------------------------------------------
   4️⃣ FETCH NOTIFICATIONS
---------------------------------------------------- */
export const getBuyerNotifications = async (req, res) => {
  const notifications = await Notification.find({
    recipient: req.buyerId,
    recipientModel: "buyer",
  }).sort({ createdAt: -1 });

  res.json(notifications);
};

export const getSellerNotifications = async (req, res) => {
  const notifications = await Notification.find({
    recipient: req.sellerId,
    recipientModel: "seller",
  }).sort({ createdAt: -1 });

  res.json(notifications);
};
