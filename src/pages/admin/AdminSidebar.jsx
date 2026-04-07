import { Link } from "react-router-dom";

export default function AdminSidebar({ onLogout }) {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#f8fafc",
        borderRight: "1px solid #e5e7eb",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Admin Panel</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Link to="/admin" style={linkStyle}>Dashboard</Link>
        <Link to="/admin/students" style={linkStyle}>Students</Link>
        <Link to="/admin/notices" style={linkStyle}>Notices</Link>
      </nav>

      <button onClick={onLogout} style={logoutStyle}>
        Logout
      </button>
    </div>
  );
}

const linkStyle = {
  textDecoration: "none",
  padding: "10px",
  borderRadius: "8px",
  background: "#e0e7ff",
  color: "#1e3a8a",
  fontWeight: "600",
};

const logoutStyle = {
  marginTop: "30px",
  padding: "10px",
  width: "100%",
  border: "none",
  borderRadius: "8px",
  background: "#fee2e2",
  color: "#991b1b",
  cursor: "pointer",
};