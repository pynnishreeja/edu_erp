import React from "react";

const notices = [
  { title: "Exam Duty", body: "You are assigned to exam duty on Monday." },
  { title: "Staff Meeting", body: "All staff must attend the 4 PM meeting." },
];

export default function TeacherNotices() {
  return (
    <div style={{ fontFamily: "Inter" }}>
      <h1 style={{ fontSize: "26px", fontWeight: "800" }}>Teacher Notices</h1>

      <div style={{ marginTop: "20px", display: "grid", gap: "10px" }}>
        {notices.map((n, i) => (
          <div
            key={i}
            style={{
              background: "white",
              padding: "16px",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
            }}
          >
            <h3 style={{ fontWeight: "700" }}>{n.title}</h3>
            <p style={{ color: "#64748b" }}>{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
