import React, { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // CAPTCHA
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let c = "";
    for (let i = 0; i < 6; i++) c += chars[Math.floor(Math.random() * chars.length)];
    return c;
  };

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const handleLogin = () => {
    // CAPTCHA validation
    if (captchaInput.trim().toUpperCase() !== captcha) {
      setCaptchaError("Captcha didn't match. Try again!");
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      return;
    }

    // Clear error if matched
    setCaptchaError("");

    // YOUR login logic (dummy login)
    if (role === "student") {
      onLogin({ role: "student" });
    } else if (role === "teacher") {
      onLogin({ role: "teacher" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4f46e5, #14b8a6)",
        fontFamily: "Inter",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: 30,
          borderRadius: 16,
          width: "min(380px, 90vw)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ fontWeight: 800, marginBottom: 20, textAlign: "center" }}>
          ERP Login
        </h2>

        {/* Select Role */}
        <select
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 12,
            borderRadius: 10,
            border: "1px solid #e5e7eb",
          }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student Login</option>
          <option value="teacher">Teacher Login</option>
        </select>

        <input
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 12,
            borderRadius: 10,
            border: "1px solid #e5e7eb",
          }}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 12,
            borderRadius: 10,
            border: "1px solid #e5e7eb",
          }}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* CAPTCHA */}
        <div style={{ marginBottom: 10 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: 4,
                background: "#f1f5f9",
                padding: "8px 12px",
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                userSelect: "none",
                fontFamily: "monospace",
              }}
            >
              {captcha}
            </div>

            <button
              onClick={() => setCaptcha(generateCaptcha())}
              style={{
                background: "#4f46e5",
                color: "#fff",
                padding: "8px 12px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Refresh
            </button>
          </div>

          <input
            placeholder="Enter Captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
            }}
          />

          {captchaError && (
            <div style={{ color: "red", marginTop: 6, fontSize: 14 }}>
              {captchaError}
            </div>
          )}
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: 12,
            background: "linear-gradient(90deg,#4f46e5,#14b8a6)",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: 800,
            marginTop: 10,
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
