import express from "express";

import {
  registerLender,
  loginLender,
  getLenderProfile,
  updateLenderProfile,
  refreshLenderToken,
  logoutLender
} from "../Controllers/lenderAuth.controller.js";

import { lenderProtect } from "../middlewares/lenderAuth.middleware.js";

const router = express.Router();

/* AUTH */
router.post("/register", registerLender);
router.post("/login", loginLender);
router.post("/refresh-token", refreshLenderToken);
router.post("/logout", lenderProtect, logoutLender);

/* PROFILE */
router.get("/me", lenderProtect, getLenderProfile);
router.put("/me", lenderProtect, updateLenderProfile);

export default router;
