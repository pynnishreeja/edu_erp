// src/teacher/TeacherTimetable.jsx
import React, { useMemo, useState } from "react";

const C = {
  pageBg: "linear-gradient(180deg,#f4fbff 0%, #f8fafc 60%, #ffffff 100%)",
  text: "#0f172a",
  sub: "#64748b",
  card: "#ffffff",
  border: "#e5e7eb",
  shadow: "0 10px 24px rgba(15,23,42,.06)",
  track: "#e5e7eb",
  pillRail: "#ede9fe",
  pillActive: "#4f46e5",
  pillText: "#ffffff",
  gray: "#f1f5f9",
};

const teacherToday = [
  {
    title: "CSE - 3rd Year",
    course: "Computer Science",
    type: "Lecture",
    start: "9:00",
    end: "10:00",
    room: "CS-101",
  },
  {
    title: "CSE - 3rd Year",
    course: "Computer Science Lab",
    type: "Lab",
    start: "10:00",
    end: "11:00",
    room: "CS-Lab1",
  },
  {
    title: "ECE - 2nd Year",
    course: "Digital Logic",
    type: "Lecture",
    start: "2:15",
    end: "3:15",
    room: "EC-201",
  },
];

const kpis = [
  { label: "Today’s Classes", value: "3", icon: "📅" },
  { label: "Labs This Week", value: "4", icon: "🧪" },
  { label: "Total Batches", value: "2", icon: "👥" },
  { label: "Departments", value: "2", icon: "🏫" },
];

const gridDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const gridTimes = ["9:00 - 10:00", "10:00 - 11:00", "2:15 - 3:15", "3:15 - 4:15"];

const gridCells = {
  "9:00 - 10:00": {
    Monday: { title: "CSE-3rd", course: "Computer Science", room: "CS-101" },
    Wednesday: { title: "ECE-2nd", course: "Digital Logic", room: "EC-201" },
  },
  "10:00 - 11:00": {
    Monday: { title: "CSE-3rd", course: "Computer Science Lab", room: "CS-Lab1" },
    Thursday: { title: "CSE-3rd", course: "Mini Project Lab", room: "CS-Lab2" },
  },
  "2:15 - 3:15": {
    Tuesday: { title: "CSE-2nd", course: "C Programming", room: "CS-102" },
    Friday: { title: "CSE-3rd", course: "Operating Systems", room: "CS-201" },
  },
  "3:15 - 4:15": {
    Wednesday: { title: "ECE-2nd", course: "Digital Logic", room: "EC-201" },
  },
};

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

const KPI = ({ label, value, icon }) => (
  <Card style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
  </Card>
);

const MiniStat = ({ label, value }) => (
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

const Action = ({ label }) => (
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

function Tip({ color, title, desc }) {
  return (
    <div
      style={{
        background: color,
        borderRadius: 12,
        padding: 12,
        border: `1px solid ${C.border}`,
      }}
    >
      <div style={{ fontWeight: 800 }}>{title}</div>
      <div style={{ fontSize: 14, color: C.sub }}>{desc}</div>
    </div>
  );
}

export default function TeacherTimetable() {
  const [view, setView] = useState("today"); // "today" | "grid"

  const distribution = useMemo(() => {
    const counts = { Lecture: 0, Lab: 0 };
    Object.values(gridCells).forEach((row) =>
      Object.values(row).forEach((c) => {
        if (!c) return;
        const isLab = c.room.toLowerCase().includes("lab");
        const key = isLab ? "Lab" : "Lecture";
        counts[key] = (counts[key] || 0) + 1;
      })
    );
    const total = Object.values(counts).reduce((s, x) => s + x, 0) || 1;
    return [
      {
        label: "Lecture",
        value: Math.round((counts.Lecture / total) * 100),
        count: counts.Lecture,
        color: "#6366f1",
      },
      {
        label: "Lab",
        value: Math.round((counts.Lab / total) * 100),
        count: counts.Lab,
        color: "#10b981",
      },
    ];
  }, []);

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
          Teacher Timetable
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
        }}
      >
        {kpis.map((k, i) => (
          <KPI key={i} {...k} />
        ))}
      </div>

      {/* Main grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 0.9fr",
          gap: 16,
          alignItems: "start",
          marginTop: 16,
        }}
      >
        {/* Left column */}
        <Card>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>
            Weekly Timetable
          </div>

          {/* View toggle */}
          <div
            style={{
              display: "flex",
              gap: 8,
              background: C.pillRail,
              padding: 6,
              borderRadius: 999,
              border: `1px solid ${C.border}`,
              width: "fit-content",
              marginBottom: 14,
            }}
          >
            <button
              onClick={() => setView("today")}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background:
                  view === "today" ? C.pillActive : "transparent",
                color: view === "today" ? C.pillText : C.text,
                fontWeight: 700,
              }}
            >
              Today&apos;s Schedule
            </button>
            <button
              onClick={() => setView("grid")}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background:
                  view === "grid" ? C.pillActive : "transparent",
                color: view === "grid" ? C.pillText : C.text,
                fontWeight: 700,
              }}
            >
              Grid View
            </button>
          </div>

          {view === "today" ? (
            <div style={{ display: "grid", gap: 12 }}>
              {teacherToday.map((slot, idx) => (
                <Card key={idx} style={{ background: "#eef2ff" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800 }}>
                        {slot.course}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: C.sub,
                          marginTop: 4,
                        }}
                      >
                        Batch: {slot.title} • Room: {slot.room}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#334155",
                      }}
                    >
                      {slot.start} - {slot.end}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <div style={{ minWidth: 900 }}>
                {/* header row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "160px repeat(6, 1fr)",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      background: C.gray,
                      border: `1px solid ${C.border}`,
                      borderRadius: 12,
                      padding: 12,
                      fontWeight: 800,
                      textAlign: "center",
                    }}
                  >
                    Time
                  </div>
                  {gridDays.map((d) => (
                    <div
                      key={d}
                      style={{
                        background: C.gray,
                        border: `1px solid ${C.border}`,
                        borderRadius: 12,
                        padding: 12,
                        fontWeight: 800,
                        textAlign: "center",
                      }}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* rows */}
                {gridTimes.map((t) => (
                  <div
                    key={t}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "160px repeat(6, 1fr)",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        background: C.gray,
                        border: `1px solid ${C.border}`,
                        borderRadius: 12,
                        padding: 12,
                        textAlign: "center",
                        color: C.sub,
                      }}
                    >
                      {t}
                    </div>
                    {gridDays.map((d) => {
                      const cell = gridCells[t]?.[d];
                      if (!cell) {
                        return (
                          <div
                            key={d}
                            style={{
                              background: "#f8fafc",
                              border: `1px solid ${C.border}`,
                              borderRadius: 12,
                              padding: 12,
                              textAlign: "center",
                              color: C.sub,
                            }}
                          >
                            Free
                          </div>
                        );
                      }
                      return (
                        <div
                          key={d}
                          style={{
                            background: "#e0e7ff",
                            border: `1px solid ${C.border}`,
                            borderRadius: 12,
                            padding: 12,
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 800,
                              marginBottom: 4,
                            }}
                          >
                            {cell.course}
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              color: "#334155",
                            }}
                          >
                            {cell.title} • {cell.room}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom widgets */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginTop: 16,
            }}
          >
            <Card>
              <div
                style={{ fontWeight: 800, marginBottom: 10 }}
              >
                Class Types
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {distribution.map((d) => (
                  <div
                    key={d.label}
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "140px 1fr 60px",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          background: d.color + "22",
                          color: "#1f2937",
                          padding: "4px 8px",
                          borderRadius: 10,
                          fontWeight: 800,
                          fontSize: 12,
                        }}
                      >
                        {d.label}
                      </span>
                      <span style={{ color: C.sub }}>
                        {d.count} sessions
                      </span>
                    </div>
                    <div
                      style={{
                        height: 8,
                        background: C.track,
                        borderRadius: 8,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${d.value}%`,
                          height: 8,
                          background: d.color,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        textAlign: "right",
                        color: C.sub,
                      }}
                    >
                      {d.value}%
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div
                style={{ fontWeight: 800, marginBottom: 10 }}
              >
                Time Management Tips
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                <Tip
                  color="#e0e7ff"
                  title="Plan Ahead"
                  desc="Block time for preparation and grading between lectures."
                />
                <Tip
                  color="#dcfce7"
                  title="Avoid Back-to-Back Labs"
                  desc="Keep small gaps for short breaks before long lab sessions."
                />
                <Tip
                  color="#fef3c7"
                  title="Use Reminders"
                  desc="Set calendar reminders for special sessions or seminars."
                />
              </div>
            </Card>
          </div>
        </Card>

        {/* Right column */}
        <div style={{ display: "grid", gap: 16 }}>
          <Card>
            <div
              style={{ display: "flex", gap: 14, alignItems: "center" }}
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
                  Computer Science
                </div>
                <div style={{ fontSize: 12, color: C.sub }}>
                  Faculty ID: T-1023
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
              <MiniStat label="Courses" value="3" />
              <MiniStat label="Weekly Hours" value="18" />
              <MiniStat label="Labs" value="4" />
            </div>
          </Card>

          <Card>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>
              Quick Actions
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <Action label="View Assignments" />
              <Action label="Send Notice" />
              <Action label="Open Attendance" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
