import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Marks from "./pages/Marks";
import Fees from "./pages/Fees";
import Timetable from "./pages/Timetable";
import Notices from "./pages/Notices";
import Profile from "./pages/Profile";
import Assignments from "./pages/Assignments";
import LoginPage from "./pages/LoginPage"; // ✅ Import LoginPage

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // If not logged in, show login page only
  if (!isLoggedIn) {
    return <LoginPage onLogin={setIsLoggedIn} />;
  }

  // After login, show ERP system
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="main-content" style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/marks" element={<Marks />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/assignments" element={<Assignments />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
