import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [notices, setNotices] = useState([]);

  // 🔹 Fetch data
  const fetchData = async () => {
    try {
      const studentRes = await axios.get("http://localhost:8080/students");
      const noticeRes = await axios.get("http://localhost:8080/notices");

      setStudents(studentRes.data);
      setNotices(noticeRes.data);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "30px", flex: 1 }}>
      <h2>Admin Dashboard</h2>

      {/* 🔹 STATS */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={card}>
          <h3>Total Students</h3>
          <p style={number}>{students.length}</p>
        </div>

        <div style={card}>
          <h3>Total Notices</h3>
          <p style={number}>{notices.length}</p>
        </div>
      </div>

      {/* 🔹 RECENT NOTICES */}
      <div style={{ marginTop: "30px" }}>
        <h3>Recent Notices</h3>

        {notices.length === 0 ? (
          <p>No notices available</p>
        ) : (
          notices.slice(-3).reverse().map((n) => (
            <div key={n.id} style={card}>
              <b>{n.title}</b>
              <p>{n.content}</p>
            </div>
          ))
        )}
      </div>

      {/* 🔹 QUICK INFO */}
      <div style={{ marginTop: "30px" }}>
        <h3>Quick Info</h3>

        <div style={card}>
          <p>✔ Manage students and notices easily</p>
          <p>✔ All data is stored in MySQL database</p>
          <p>✔ Students can view notices in their portal</p>
        </div>
      </div>
    </div>
  );
}

/* ✅ Styles */
const card = {
  background: "#ffffff",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  marginBottom: "10px",
};

const number = {
  fontSize: "28px",
  fontWeight: "bold",
};