// src/utils/SellerProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function SellerProtectedRoute() {
const token = localStorage.getItem("sellerAccessToken");
const userType = localStorage.getItem("userType");

if (!token || userType !== "seller") {
  return <Navigate to="/login" replace />;
}

  return <Outlet />;
}
