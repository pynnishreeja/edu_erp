import React, { useState, useEffect } from "react";
import {
BrowserRouter as Router,
Routes,
Route,
Navigate,
} from "react-router-dom";

// student layout
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
import LoginPage from "./pages/LoginPage";

// teacher layout
import TeacherSidebar from "./components/Teacher/TeacherSidebar";

// teacher pages
import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import TeacherAssignments from "./components/Teacher/TeacherAssignments";
import TeacherTimetable from "./components/Teacher/TeacherTimetable";
import TeacherNotices from "./components/Teacher/TeacherNotices";

// ✅ ADMIN IMPORTS
import AdminSidebar from "./pages/admin/AdminSidebar";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminNotices from "./pages/admin/AdminNotices";

export default function App() {
const [user, setUser] = useState(null);

useEffect(() => {
const savedUser = localStorage.getItem("erpUser");
if (savedUser) {
setUser(JSON.parse(savedUser));
}
}, []);

const handleLogin = (u) => {
localStorage.setItem("erpUser", JSON.stringify(u));
setUser(u);
};

const logout = () => {
localStorage.removeItem("erpUser");
setUser(null);
};

return ( <Router> <Routes>
{/* ================= LOGIN ================= */}
<Route
path="/"
element={
!user ? ( <LoginPage onLogin={handleLogin} />
) : user.role === "student" ? ( <Navigate to="/dashboard" />
) : user.role === "teacher" ? ( <Navigate to="/teacher" />
) : ( <Navigate to="/admin" />
)
}
/>


    {/* ================= STUDENT ================= */}
    {user && user.role === "student" && (
      <Route
        path="/*"
        element={
          <div style={{ display: "flex" }}>
            <Sidebar onLogout={logout} />
            <div style={{ flex: 1, padding: 20 }}>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="marks" element={<Marks />} />
                <Route path="fees" element={<Fees />} />
                <Route path="timetable" element={<Timetable />} />
                <Route path="notices" element={<Notices />} />
                <Route path="profile" element={<Profile />} />
                <Route path="assignments" element={<Assignments />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </div>
        }
      />
    )}

    {/* ================= TEACHER ================= */}
    {user && user.role === "teacher" && (
      <Route
        path="/teacher/*"
        element={
          <div style={{ display: "flex" }}>
            <TeacherSidebar onLogout={logout} />
            <div style={{ flex: 1, padding: 20 }}>
              <Routes>
                <Route index element={<TeacherDashboard />} />
                <Route path="assignments" element={<TeacherAssignments />} />
                <Route path="timetable" element={<TeacherTimetable />} />
                <Route path="notices" element={<TeacherNotices />} />
                <Route path="*" element={<Navigate to="/teacher" />} />
              </Routes>
            </div>
          </div>
        }
      />
    )}

    {/* ================= ADMIN ================= */}
    {user && user.role === "admin" && (
      <Route
        path="/admin/*"
        element={
          <div style={{ display: "flex" }}>
            <AdminSidebar onLogout={logout} />
            <div style={{ flex: 1, padding: 20 }}>
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="students" element={<AdminStudents />} />
                <Route path="notices" element={<AdminNotices />} />
                <Route path="*" element={<Navigate to="/admin" />} />
              </Routes>
            </div>
          </div>
        }
      />
    )}

    {/* ================= FALLBACK ================= */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
</Router>


);
}
