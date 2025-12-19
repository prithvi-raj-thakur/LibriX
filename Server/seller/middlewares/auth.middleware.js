import jwt from "jsonwebtoken";

export const sellerProtect = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer"))
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.SELLER_ACCESS_TOKEN_SECRET
    );

    if (decoded.role !== "seller")
      return res.status(403).json({ message: "Forbidden" });

    req.sellerId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Token expired" });
  }
};
