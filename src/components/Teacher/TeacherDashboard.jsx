// src/teacher/TeacherDashboard.jsx
import React, { useMemo } from "react";

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

const LS_KEY = "assignments_data";

function loadAssignments() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const teacherDay = [
  { time: "9:00 - 10:00", title: "Computer Science (CSE - 3rd Year)", room: "CS-101", type: "Lecture" },
  { time: "10:00 - 11:00", title: "Computer Science Lab (CSE - 3rd Year)", room: "CS-Lab1", type: "Lab" },
  { time: "2:15 - 3:15", title: "Digital Logic (ECE - 2nd Year)", room: "EC-201", type: "Lecture" },
];

const KPI = ({ icon, label, value }) => (
  <div
    style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 16,
      padding: 16,
      boxShadow: C.shadow,
      display: "flex",
      alignItems: "center",
      gap: 12,
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 12,
        background: "#eef2ff",
        display: "grid",
        placeItems: "center",
      }}
    >
      {icon}
    </div>
    <div>
      <div style={{ fontSize: 12, color: C.sub }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800 }}>{value}</div>
    </div>
  </div>
);

const Card = ({ children, style }) => (
  <div
    style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 16,
      padding: 16,
      boxShadow: C.shadow,
      ...style,
    }}
  >
    {children}
  </div>
);

const Bar = ({ value }) => (
  <div
    style={{
      width: "100%",
      height: 10,
      background: "#e5e7eb",
      borderRadius: 8,
    }}
  >
    <div
      style={{
        width: `${Math.min(100, Math.max(0, value))}%`,
        height: "100%",
        background: "#111827",
        borderRadius: 8,
      }}
    />
  </div>
);

export default function TeacherDashboard() {
  const assignments = useMemo(() => loadAssignments(), []);
  const stats = useMemo(() => {
    const total = assignments.length;
    const submitted = assignments.filter((a) => a.status === "submitted").length;
    const graded = assignments.filter((a) => a.status === "graded").length;
    const pending = total - submitted - graded;
    return { total, submitted, graded, pending };
  }, [assignments]);

  return (
    <div
      style={{
        padding: 24,
        fontFamily: "Inter, ui-sans-serif, system-ui, Arial",
        background: C.pageBg,
        minHeight: "100vh",
        color: C.text,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 800 }}>
          Teacher Dashboard
        </span>
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
        <div
          style={{
            background: "#ffffff",
            border: `1px solid ${C.border}`,
            borderRadius: 24,
            padding: "8px 12px",
            fontSize: 12,
            color: C.text,
            fontWeight: 700,
          }}
        >
          Dr. Smith
        </div>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <KPI icon="📚" label="Courses" value={3} />
        <KPI icon="📝" label="Assignments" value={stats.total} />
        <KPI icon="📤" label="Submitted" value={stats.submitted} />
        <KPI icon="✅" label="Graded" value={stats.graded} />
      </div>

      {/* Main layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 16,
          alignItems: "start",
        }}
      >
        {/* Left column */}
        <div style={{ display: "grid", gap: 16 }}>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <div style={{ fontWeight: 800 }}>Today&apos;s Schedule</div>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {teacherDay.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 1fr 160px",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      background: "#f1f5f9",
                      border: `1px solid ${C.border}`,
                      borderRadius: 10,
                      padding: 8,
                      textAlign: "center",
                      color: C.sub,
                    }}
                  >
                    {c.time}
                  </div>
                  <div style={{ fontWeight: 700 }}>{c.title}</div>
                  <div style={{ textAlign: "right", color: C.sub }}>
                    📍 {c.room}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <div style={{ fontWeight: 800 }}>Assignment Overview</div>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <Mini label="Total" value={stats.total} />
                <Mini label="Pending" value={stats.pending} />
                <Mini label="Submitted" value={stats.submitted} />
                <Mini label="Graded" value={stats.graded} />
              </div>
              <div style={{ marginTop: 8 }}>
                <Bar
                  value={
                    stats.total ? (stats.graded / stats.total) * 100 : 0
                  }
                />
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 12,
                    color: C.sub,
                    textAlign: "right",
                  }}
                >
                  {stats.total
                    ? Math.round((stats.graded / stats.total) * 100)
                    : 0}
                  % graded
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div style={{ display: "grid", gap: 16 }}>
          <Card>
            <div
              style={{
                display: "flex",
                gap: 14,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "#f1f5f9",
                  border: `1px solid ${C.border}`,
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 800,
                }}
              >
                DS
              </div>
              <div>
                <div style={{ fontWeight: 800 }}>Dr. Smith</div>
                <div style={{ fontSize: 12, color: C.sub }}>
                  Faculty ID: T-1023
                </div>
                <div style={{ fontSize: 12, color: C.sub }}>
                  Dept: Computer Science
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: 12,
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 12,
              }}
            >
              <Mini label="Courses" value="3" />
              <Mini label="Sections" value="5" />
              <Mini label="Batches" value="2" />
            </div>
          </Card>

          <Card>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>
              Quick Actions
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <Action label="View All Assignments" />
              <Action label="Open Timetable" />
              <Action label="Send Notice" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Mini({ label, value }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: 10,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 12, color: C.sub }}>{label}</div>
      <div style={{ fontWeight: 800 }}>{value}</div>
    </div>
  );
}

function Action({ label }) {
  return (
    <button
      style={{
        background: "#ffffff",
        border: `1px solid ${C.border}`,
        color: C.text,
        padding: "10px 12px",
        borderRadius: 10,
        textAlign: "left",
        cursor: "pointer",
        fontWeight: 700,
      }}
    >
      {label}
    </button>
  );
}
