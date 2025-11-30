import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

// student pages
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Marks from "./pages/Marks";
import Fees from "./pages/Fees";
import Timetable from "./pages/Timetable";
import Notices from "./pages/Notices";
import Profile from "./pages/Profile";
import Assignments from "./pages/Assignments";
import LoginPage from "./pages/Loginpage";

// TEACHER FILES  (FIXED — capital T in folder name)
import TeacherSidebar from "./components/Teacher/TeacherSidebar";
import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import TeacherAssignments from "./components/Teacher/TeacherAssignments";
import TeacherTimetable from "./components/Teacher/TeacherTimetable";
import TeacherNotices from "./components/Teacher/TeacherNotices";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("erpUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogin = (u) => {
    localStorage.setItem("erpUser", JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("erpUser");
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (user.role === "student") {
    return (
      <Router>
        <div style={{ display: "flex" }}>
          <Sidebar onLogout={logout} />
          <div style={{ flex: 1, padding: 20 }}>
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

  if (user.role === "teacher") {
    return (
      <Router>
        <div style={{ display: "flex" }}>
          <TeacherSidebar onLogout={logout} />
          <div style={{ flex: 1, padding: 20 }}>
            <Routes>
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/teacher/assignments" element={<TeacherAssignments />} />
              <Route path="/teacher/timetable" element={<TeacherTimetable />} />
              <Route path="/teacher/notices" element={<TeacherNotices />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }

  return null;
}
