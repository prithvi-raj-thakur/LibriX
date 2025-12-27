import jwt from "jsonwebtoken";

export const sellerProtect = (req, res, next) => {
  console.log("SELLER SECRET:", process.env.SELLER_ACCESS_TOKEN_SECRET);

  const auth = req.headers.authorization;
  console.log("AUTH HEADER:", auth);

  if (!auth || !auth.startsWith("Bearer"))
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.SELLER_ACCESS_TOKEN_SECRET
    );

    console.log("DECODED SELLER:", decoded);

    if (decoded.role !== "seller")
      return res.status(403).json({ message: "Forbidden" });

    req.sellerId = decoded.id;
    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message);
    res.status(401).json({ message: "Token expired" });
  }
};
