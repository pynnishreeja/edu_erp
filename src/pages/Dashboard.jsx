// Dashboard.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

/* Palette consistent with other pages */
const C = {
  pageBg: "linear-gradient(180deg,#f4fbff 0%, #f8fafc 60%, #ffffff 100%)",
  text: "#0f172a",
  sub: "#64748b",
  card: "#ffffff",
  border: "#e5e7eb",
  shadow: "0 10px 24px rgba(15,23,42,.06)",
  ok: "#16a34a",
  warn: "#f59e0b",
  danger: "#ef4444",
  grad: "linear-gradient(90deg,#5956e9 0%, #14b8a6 100%)",
};

/* Demo data; wire to real state when available */
const todayClasses = [
  { time: "9:00 - 10:00", title: "Computer Science", room: "CS-101", type: "Lecture" },
  { time: "10:00 - 11:00", title: "Mathematics", room: "M-201", type: "Lecture" },
  { time: "11:15 - 12:15", title: "Physics Lab", room: "PH-Lab1", type: "Lab" },
  { time: "2:15 - 3:15", title: "Electronics", room: "EC-301", type: "Lecture" },
];

const assignments = [
  { title: "Data Structures Project", due: "2024-09-15", priority: "high", status: "pending" },
  { title: "Linear Algebra Problem Set", due: "2024-09-10", priority: "medium", status: "submitted" },
  { title: "Circuit Analysis Report", due: "2024-09-20", priority: "medium", status: "pending" },
];

const notices = [
  { title: "Exam Schedule Released", tag: "Academic", daysAgo: 381 },
  { title: "Tech Fest Registration", tag: "Events", daysAgo: 386 },
  { title: "Scholarship Applications", tag: "Financial", daysAgo: 389 },
];

const fees = { total: 67000, paid: 58000, due: 9000, dueDate: "2024-09-15" };
const attendance = { percent: 85, present: 235, total: 278 };
const cgpa = 8.5;

const KPI = ({ icon, label, value }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 16, boxShadow: C.shadow, display: "flex", alignItems: "center", gap: 12 }}>
    <div style={{ width: 36, height: 36, borderRadius: 12, background: "#eef2ff", display: "grid", placeItems: "center" }}>{icon}</div>
    <div>
      <div style={{ fontSize: 12, color: C.sub }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800 }}>{value}</div>
    </div>
  </div>
);

const Card = ({ children, style }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 16, boxShadow: C.shadow, ...style }}>{children}</div>
);

const Bar = ({ value, color }) => (
  <div style={{ width: "100%", height: 10, background: "#e5e7eb", borderRadius: 8 }}>
    <div style={{ width: `${Math.min(100, Math.max(0, value))}%`, height: "100%", background: color || C.text, borderRadius: 8 }} />
  </div>
);

export default function Dashboard() {
  const completion = useMemo(() => Math.round((fees.paid / fees.total) * 100), []);
  const pendingAssignments = useMemo(() => assignments.filter((a) => a.status === "pending").length, []);
  const unreadNotices = useMemo(() => 4, []); // replace with store value if available
  const upcomingExams = useMemo(() => 2, []); // placeholder for exams module

  return (
    <div style={{ padding: 24, fontFamily: "Inter, ui-sans-serif, system-ui, Arial", background: C.pageBg, minHeight: "100vh", color: C.text }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 22, fontWeight: 800 }}>Dashboard</span>
        <input
          placeholder="Search..."
          style={{
            marginLeft: 12,
            flex: 1,
            background: "#ffffff",
            border: `1px solid ${C.border}`,
            color: C.text,
            padding: "10px 12px",
            borderRadius: 10,
            outline: "none",
          }}
        />
        <div style={{ background: "#ffffff", border: `1px solid ${C.border}`, borderRadius: 24, padding: "8px 12px", fontSize: 12, color: C.text, fontWeight: 700 }}>
          John Smith
        </div>
      </div>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16, marginBottom: 16 }}>
        <KPI icon="📚" label="Today’s Classes" value={todayClasses.length} />
        <KPI icon="✅" label="Attendance" value={`${attendance.percent}%`} />
        <KPI icon="📝" label="Pending Assignments" value={pendingAssignments} />
        <KPI icon="🗓" label="Upcoming Exams" value={upcomingExams} />
      </div>

      {/* Main sections */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, alignItems: "start" }}>
        {/* Left column */}
        <div style={{ display: "grid", gap: 16 }}>
          {/* Today schedule */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontWeight: 800 }}>Today’s Schedule</div>
              <Link to="/timetable" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 700 }}>
                View full timetable →
              </Link>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {todayClasses.map((c, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr 140px 100px", gap: 10, alignItems: "center" }}>
                  <div style={{ background: "#f1f5f9", border: `1px solid ${C.border}`, borderRadius: 10, padding: 8, textAlign: "center", color: C.sub }}>{c.time}</div>
                  <div style={{ fontWeight: 700 }}>{c.title}</div>
                  <div style={{ color: C.sub }}>📍 {c.room}</div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ background: "#eef2ff", color: "#3730a3", padding: "4px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>{c.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Assignments */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontWeight: 800 }}>Upcoming Assignments</div>
              <Link to="/assignments" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 700 }}>
                Go to assignments →
              </Link>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {assignments.slice(0, 3).map((a, i) => {
                const tone =
                  a.priority === "high" ? { bg: "#fee2e2", color: "#991b1b" } : a.priority === "medium" ? { bg: "#fef3c7", color: "#92400e" } : { bg: "#dcfce7", color: "#065f46" };
                return (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 160px 120px", gap: 10, alignItems: "center", border: `1px solid ${C.border}`, borderRadius: 12, padding: 10 }}>
                    <div style={{ fontWeight: 700 }}>{a.title}</div>
                    <div style={{ color: C.sub }}>Due: {a.due}</div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ background: tone.bg, color: tone.color, padding: "4px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>{a.priority}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Notices */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontWeight: 800 }}>Recent Notices</div>
              <Link to="/notices" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 700 }}>
                All notices →
              </Link>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {notices.slice(0, 4).map((n, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 120px 110px", gap: 10, alignItems: "center" }}>
                  <div style={{ fontWeight: 700 }}>{n.title}</div>
                  <div style={{ textAlign: "center" }}>
                    <span style={{ background: "#eef2ff", color: "#3730a3", padding: "4px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>{n.tag}</span>
                  </div>
                  <div style={{ textAlign: "right", color: C.sub }}>{n.daysAgo} days ago</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div style={{ display: "grid", gap: 16 }}>
          {/* Fee status */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontWeight: 800 }}>Fee Status</div>
              <Link to="/fees" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 700 }}>
                Manage fees →
              </Link>
            </div>
            <div style={{ fontSize: 14, color: C.sub, marginBottom: 6 }}>
              Paid: <b style={{ color: C.text }}>₹{fees.paid.toLocaleString("en-IN")}</b> / Total: <b style={{ color: C.text }}>₹{fees.total.toLocaleString("en-IN")}</b> ({completion}%)
            </div>
            <Bar value={completion} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, alignItems: "center" }}>
              <div style={{ color: C.danger, fontWeight: 800 }}>Due: ₹{fees.due.toLocaleString("en-IN")}</div>
              <div style={{ fontSize: 12, color: C.sub }}>By {fees.dueDate}</div>
            </div>
            <Link
              to="/fees"
              style={{
                display: "inline-block",
                marginTop: 10,
                background: C.grad,
                color: "#fff",
                padding: "8px 12px",
                borderRadius: 10,
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Pay Now
            </Link>
          </Card>

          {/* Attendance snapshot */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontWeight: 800 }}>Attendance Snapshot</div>
              <Link to="/attendance" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 700 }}>
                Details →
              </Link>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: C.sub }}>
                  Present: <b style={{ color: C.text }}>{attendance.present}</b> / <b style={{ color: C.text }}>{attendance.total}</b>
                </div>
                <div style={{ fontWeight: 800, color: attendance.percent >= 85 ? C.ok : attendance.percent >= 75 ? C.warn : C.danger }}>{attendance.percent}%</div>
              </div>
              <Bar value={attendance.percent} color={attendance.percent >= 85 ? C.ok : attendance.percent >= 75 ? C.warn : C.danger} />
            </div>
          </Card>

          {/* CGPA and shortcuts */}
          <Card>
            <div style={{ fontWeight: 800, marginBottom: 8 }}>Academic Summary</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Mini label="CGPA" value={cgpa} />
              <Mini label="Unread Notices" value={unreadNotices} />
            </div>
            <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
              <LinkBtn to="/marks" text="View Marks" />
              <LinkBtn to="/profile" text="Edit Profile" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* Small atoms */
function Mini({ label, value }) {
  return (
    <div style={{ background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 10, padding: 10, textAlign: "center" }}>
      <div style={{ fontSize: 12, color: C.sub }}>{label}</div>
      <div style={{ fontWeight: 800 }}>{value}</div>
    </div>
  );
}
function LinkBtn({ to, text }) {
  return (
    <Link
      to={to}
      style={{
        background: "#ffffff",
        border: `1px solid ${C.border}`,
        color: C.text,
        padding: "10px 12px",
        borderRadius: 10,
        textDecoration: "none",
        fontWeight: 700,
        textAlign: "center",
      }}
    >
      {text}
    </Link>
  );
}
