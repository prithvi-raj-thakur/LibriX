import { Navigate, Outlet } from "react-router-dom";

export default function LenderProtectedRoute() {
  const token = localStorage.getItem("lenderAccessToken");
  const userType = localStorage.getItem("userType");

  // DEBUGGING: Remove these logs once fixed
  console.log("Token found:", !!token);
  console.log("UserType found:", userType);

  if (!token || userType !== "lender") {
    return <Navigate to="/login" replace />;
  }

  // If everything matches, show the Lender pages
  return <Outlet />;
}
