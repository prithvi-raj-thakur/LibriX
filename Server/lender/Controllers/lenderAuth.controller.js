import Lender from "../models/lender.model.js";
import jwt from "jsonwebtoken";
import {
  generateLenderAccessToken,
  generateLenderRefreshToken
} from "../../utils/token.js";

/* REGISTER */
export const registerLender = async (req, res) => {
  const exists = await Lender.findOne({
    $or: [{ phone: req.body.phone }, { email: req.body.email }]
  });

  if (exists)
    return res.status(400).json({ message: "Lender already exists" });

  const lender = await Lender.create(req.body);

  const accessToken = generateLenderAccessToken(lender._id, "lender");
  const refreshToken = generateLenderRefreshToken(lender._id, "lender");

  lender.refreshToken = refreshToken;
  await lender.save();

  res.status(201).json({ accessToken, refreshToken });
};

/* LOGIN */
export const loginLender = async (req, res) => {
  const { phone, password } = req.body;

  const lender = await Lender.findOne({ phone }).select("+password");
  if (!lender)
    return res.status(401).json({ message: "Invalid credentials" });

  const match = await lender.comparePassword(password);
  if (!match)
    return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = generateLenderAccessToken(lender._id, "lender");
  const refreshToken = generateLenderRefreshToken(lender._id, "lender");

  lender.refreshToken = refreshToken;
  await lender.save();

  res.json({ accessToken, refreshToken });
};

/* GET PROFILE */
export const getLenderProfile = async (req, res) => {
  const lender = await Lender.findById(req.lenderId).select(
    "-password -refreshToken"
  );

  if (!lender)
    return res.status(404).json({ message: "Lender not found" });

  res.json(lender);
};

/* UPDATE PROFILE */
export const updateLenderProfile = async (req, res) => {
  const lender = await Lender.findByIdAndUpdate(
    req.lenderId,
    req.body,
    { new: true, runValidators: true }
  ).select("-password -refreshToken");

  res.json({
    message: "Profile updated successfully",
    lender
  });
};

/* REFRESH TOKEN */
export const refreshLenderToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  const lender = await Lender.findOne({ refreshToken });
  if (!lender) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.LENDER_REFRESH_TOKEN_SECRET,
    (err) => {
      if (err) return res.sendStatus(403);

      const newAccessToken = generateLenderAccessToken(lender._id, "lender");
      res.json({ accessToken: newAccessToken });
    }
  );
};

/* LOGOUT */
export const logoutLender = async (req, res) => {
  await Lender.findByIdAndUpdate(req.lenderId, { refreshToken: null });
  res.json({ message: "Logged out successfully" });
};
