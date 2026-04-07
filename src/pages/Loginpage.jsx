import React, { useState } from "react";

export default function LoginPage({ onLogin = () => {} }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("student");
const [error, setError] = useState("");

const createCaptcha = () => {
const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
let text = "";
for (let i = 0; i < 6; i++) {
text += chars[Math.floor(Math.random() * chars.length)];
}
return text;
};

const [captcha, setCaptcha] = useState(createCaptcha());
const [captchaInput, setCaptchaInput] = useState("");

const refreshCaptcha = () => {
setCaptcha(createCaptcha());
setCaptchaInput("");
};

const handleSubmit = (e) => {
e.preventDefault();


const cleanEmail = email.trim().toLowerCase();
const cleanPassword = password.trim();

if (captchaInput.trim().toUpperCase() !== captcha) {
  setError("Captcha did not match. Try again!");
  refreshCaptcha();
  return;
}

setError("");

// STUDENT
if (
  role === "student" &&
  cleanEmail === "student@example.com" &&
  cleanPassword === "student123"
) {
  const user = { role: "student", name: "John Smith" };
  localStorage.setItem("erpUser", JSON.stringify(user));
  onLogin(user);
  return;
}

// TEACHER
if (
  role === "teacher" &&
  cleanEmail === "teacher@example.com" &&
  cleanPassword === "teacher123"
) {
  const user = { role: "teacher", name: "Prof Williams" };
  localStorage.setItem("erpUser", JSON.stringify(user));
  onLogin(user);
  return;
}

// ADMIN
if (
  role === "admin" &&
  cleanEmail === "admin@gmail.com" &&
  cleanPassword === "admin123"
) {
  const user = { role: "admin", name: "Admin User" };
  localStorage.setItem("erpUser", JSON.stringify(user));
  onLogin(user);
  return;
}

setError("Invalid email or password.");
refreshCaptcha();


};

return (
<div
style={{
display: "flex",
justifyContent: "center",
alignItems: "center",
height: "100vh",
background: "linear-gradient(135deg, #dbeafe, #ffffff)",
}}
>
<div
style={{
background: "#fff",
padding: 40,
width: 360,
borderRadius: 12,
boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
}}
>
<h2 style={{ textAlign: "center", marginBottom: 20 }}>
ERP Login </h2>

```
    {error && (
      <p style={{ color: "red", marginBottom: 12, textAlign: "center" }}>
        {error}
      </p>
    )}

    <form onSubmit={handleSubmit}>
      <label style={{ fontSize: 14, fontWeight: 600 }}>
        Login As:
      </label>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 15,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 10,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 10,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      />

      <div style={{ marginBottom: 15 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              fontWeight: "bold",
              background: "#f3f4f6",
              padding: "10px 14px",
              borderRadius: 6,
              border: "1px solid #ccc",
              userSelect: "none",
              fontFamily: "monospace",
            }}
          >
            {captcha}
          </div>

          <button
            type="button"
            onClick={refreshCaptcha}
            style={{
              background: "#1e3a8a",
              color: "#fff",
              padding: "10px 12px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Refresh
          </button>
        </div>

        <input
          type="text"
          placeholder="Enter Captcha"
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
          background: "#1e3a8a",
          color: "#fff",
          fontWeight: 700,
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </form>

    <p style={{ marginTop: 20, fontSize: 14, color: "#555" }}>
      Student → <b>student@example.com / student123</b> <br />
      Teacher → <b>teacher@example.com / teacher123</b> <br />
      Admin → <b>admin@gmail.com / admin123</b>
    </p>
  </div>
</div>


);
}
