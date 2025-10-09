import React, { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "admin123") {
      onLogin(true);
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  // Professional, formal styling
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
    fontFamily: "Segoe UI, Roboto, sans-serif",
  };

  const cardStyle = {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    width: "380px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#1e3a8a", // navy blue
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.3s ease",
  };

  const headingStyle = {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#1e3a8a",
    fontWeight: "700",
  };

  const errorStyle = {
    color: "red",
    marginBottom: "10px",
    fontSize: "14px",
  };

  const infoStyle = {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>ERP Login</h2>
        {error && <p style={errorStyle}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
        <p style={infoStyle}>
          Use <b>admin@example.com</b> / <b>admin123</b> for access
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

