

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./common/landing.jsx";
import Register from "./common/register.jsx";
import Login from "./common/Login.jsx";
import SellerDashboard from "./seller/pages/Dashboard.jsx";
import SellerUploads from "./seller/pages/upload.jsx"

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
      </Routes>
    </BrowserRouter>
  );
}

