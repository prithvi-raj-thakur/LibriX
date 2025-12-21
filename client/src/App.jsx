

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./common/landing.jsx";
import Register from "./common/register.jsx";
import Login from "./common/Login.jsx";
import SellerDashboard from "./seller/pages/Dashboard.jsx";
import SellerUploads from "./seller/pages/upload.jsx"
import LenderDashboard from "./lender/pages/Dashboard.jsx";
import SellerBids from "./seller/pages/SellerBids.jsx";
import SellerChat from "./seller/pages/SellerChat.jsx";
import SellerNotifications from "./seller/pages/SellerNotification.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
         <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/uploads" element={<SellerUploads />} />
          <Route path="/seller/bids" element={<SellerBids />} />
          <Route path="/seller/chat" element={<SellerChat />} />
          <Route path="/seller/notification" element={<SellerNotifications />} />
          <Route path="/lender/dashboard" element={<LenderDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

