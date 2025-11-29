import React, { useState, useEffect } from "react";
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
import LoginPage from "./pages/Loginpage";


// TEACHER FILES
import TeacherSidebar from "./components/teacher/TeacherSidebar";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import TeacherAssignments from "./components/teacher/TeacherAssignments";
import TeacherTimetable from "./components/teacher/TeacherTimetable";
import TeacherNotices from "./components/teacher/TeacherNotices";

export default function App() {
  const [user, setUser] = useState(null);

  // load stored login
  useEffect(() => {
    const saved = localStorage.getItem("erpUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // store login
  const handleLogin = (u) => {
    localStorage.setItem("erpUser", JSON.stringify(u));
    setUser(u);
  };

  // logout function
  const logout = () => {
    localStorage.removeItem("erpUser");
    setUser(null);
  };

  // if NOT logged in → show login
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // if STUDENT logged in → load student portal
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

  // if TEACHER logged in → load teacher portal
  if (user.role === "teacher") {
    return (
      <Router>
        <div style={{ display: "flex" }}>
          <TeacherSidebar onLogout={logout} />

          <div style={{ flex: 1, padding: 20 }}>
            <Routes>
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route
                path="/teacher/assignments"
                element={<TeacherAssignments />}
              />
              <Route
                path="/teacher/timetable"
                element={<TeacherTimetable />}
              />
              <Route path="/teacher/notices" element={<TeacherNotices />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }

  return null;
}
