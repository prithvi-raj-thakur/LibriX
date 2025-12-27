import express from "express";

import {
  registerSeller,
  loginSeller,
  refreshSellerToken,
  logoutSeller,
  getSellerProfile,
  updateSellerProfile
} from "../controllers/sellerAuth.controller.js";

import { sellerProtect } from "../middlewares/sellerAuth.middleware.js";

const router = express.Router();

/* AUTH */
router.post("/register", registerSeller);
router.post("/login", loginSeller);
router.post("/refresh-token", refreshSellerToken);
router.post("/logout", sellerProtect, logoutSeller);

/* PROFILE */
router.get("/me", sellerProtect, getSellerProfile);
router.put("/me", sellerProtect, updateSellerProfile);

export default router;
