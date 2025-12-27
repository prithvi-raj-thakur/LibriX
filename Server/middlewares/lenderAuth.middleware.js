import jwt from "jsonwebtoken";

export const lenderProtect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.LENDER_ACCESS_TOKEN_SECRET
    );

    if (decoded.role !== "lender") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.lenderId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Token expired or invalid" });
  }
};