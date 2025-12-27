// routes/bid.route.js
import express from "express";
import multer from "multer";
import  {cloudinary}  from "../configs/cloudinaryConfig.js"; // Ensure your cloudinary config is exported
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { placeBidRequest, getAllOpenBids } from "../controllers/bid.controller.js";
import { createOffer, handleOfferResponse } from "../controllers/offer.controller.js";
import { buyerProtect } from "../middlewares/buyerAuth.middleware.js";
import { sellerProtect } from "../middlewares/sellerAuth.middleware.js";

const router = express.Router();

// Multer Config for Offer Images
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "offer_images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage });

// Buyers post their requests
router.post("/post-request", buyerProtect, placeBidRequest);

// Sellers/Lenders view requests
router.get("/all", getAllOpenBids);

// ✅ NEW: Sellers create an offer for a bid
router.post("/create-offer", sellerProtect, upload.single("image"), createOffer);

// ✅ NEW: Buyers respond to an offer
router.post("/respond-offer", buyerProtect, handleOfferResponse);

export default router;