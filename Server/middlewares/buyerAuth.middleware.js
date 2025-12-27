import jwt from "jsonwebtoken";

export const buyerProtect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔴 Debug
    console.log("🔐 Buyer Auth Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ Buyer token missing");
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const token = authHeader.split(" ")[1];

    // 🔴 Debug
    console.log("🔐 Buyer Token:", token);

    const decoded = jwt.verify(
      token,
      process.env.BUYER_ACCESS_TOKEN_SECRET
    );

    // 🔴 Debug (MOST IMPORTANT)
    console.log("✅ Buyer Token Decoded:", decoded);

    // Ensure role is buyer
    if (decoded.role !== "buyer") {
      console.log("❌ Role mismatch:", decoded.role);
      return res.status(403).json({ message: "Forbidden - Not buyer" });
    }

    // ✅ Normalize buyer ID (supports all cases)
    req.buyerId = decoded.id || decoded._id || decoded.userId;

    // 🔴 Debug
    console.log("🧩 buyerId set to:", req.buyerId);

    if (!req.buyerId) {
      console.log("❌ buyerId still undefined after decode");
      return res.status(401).json({ message: "Invalid buyer token payload" });
    }

    next();
  } catch (error) {
    console.error("❌ Buyer auth error:", error.message);
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};
