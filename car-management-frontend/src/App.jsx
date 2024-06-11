import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CarDetailsPage from "./pages/CarDetailsPage"; // Import component mới
import Dashboard from "./pages/Dashboard"; // Import dashboard component with lowercase 'd'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars/:id" element={<CarDetailsPage />} />{" "}
        <Route path="/dashboard" element={<Dashboard />} />{" "} // Thêm route cho trang dashboard
        {/* Route cho trang chi tiết */}
      </Routes>
    </Router>
  );
}

export default App;
