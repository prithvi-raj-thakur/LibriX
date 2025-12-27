import express from "express";
import { 
  placeOrder, 
  handleOrderAction, 
  getBuyerNotifications,
  getSellerNotifications
} from "../controllers/order.controller.js";
import { buyerProtect } from "../middlewares/buyerAuth.middleware.js";
import { sellerProtect } from "../middlewares/sellerAuth.middleware.js";

const router = express.Router();

router.post("/buy", buyerProtect, placeOrder);
router.post("/seller-action", sellerProtect, handleOrderAction);

// ✅ ADD THIS ROUTE: Frontend needs this to show notifications
router.get("/seller/notifications", sellerProtect, getSellerNotifications);
router.get("/buyer/notifications", buyerProtect, getBuyerNotifications);

export default router;