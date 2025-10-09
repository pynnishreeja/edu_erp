// Timetable.jsx
import React, { useMemo, useState } from "react";

/* ---------------- Palette ---------------- */
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
  blue: "#dbeafe",
  green: "#dcfce7",
  purple: "#f3e8ff",
  gray: "#f1f5f9",
  amber: "#fef3c7",
};

/* ---------------- Demo data ---------------- */
const kpis = [
  { label: "Today's Classes", value: "5", icon: "📅" },
  { label: "Next Class", value: "9:00 AM", icon: "⏰" },
  { label: "Lab Sessions", value: "12", icon: "📘" },
  { label: "Faculty", value: "6", icon: "🧑‍🏫" },
];

const todaySchedule = [
  {
    title: "Computer Science",
    type: "Lecture",
    start: "9:00",
    end: "10:00",
    color: C.blue,
    teacher: "Dr. Smith",
    room: "CS-101",
  },
  {
    title: "Mathematics",
    type: "Lecture",
    start: "10:00",
    end: "11:00",
    color: "#e0e7ff",
    teacher: "Prof. Johnson",
    room: "M-201",
  },
  { title: "Break", type: "break", start: "11:00", end: "11:15", color: C.gray },
  {
    title: "Physics",
    type: "Lab",
    start: "11:15",
    end: "12:15",
    color: C.green,
    teacher: "Dr. Wilson",
    room: "PH-Lab1",
  },
  { title: "Lunch", type: "break", start: "12:15", end: "2:15", color: C.gray },
  {
    title: "Electronics",
    type: "Lecture",
    start: "2:15",
    end: "3:15",
    color: C.blue,
    teacher: "Prof. Davis",
    room: "EC-301",
  },
  {
    title: "Digital Logic",
    type: "Tutorial",
    start: "3:15",
    end: "4:15",
    color: C.purple,
    teacher: "Dr. Brown",
    room: "CS-102",
  },
];

const gridDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const gridTimes = ["9:00 - 10:00", "10:00 - 11:00", "11:15 - 12:15", "12:15 - 1:15", "2:15 - 3:15", "3:15 - 4:15", "4:30 - 5:30"];

const gridCells = {
  "9:00 - 10:00": {
    Monday: { title: "Computer Science", teacher: "Dr. Smith", room: "CS-101", color: C.blue },
    Tuesday: { title: "Mathematics", teacher: "Prof. Johnson", room: "M-202", color: C.purple },
    Wednesday: { title: "Digital Logic", teacher: "Dr. Brown", room: "CS-103", color: C.purple },
    Thursday: { title: "Electronics", teacher: "Prof. Davis", room: "EC-302", color: C.blue },
    Friday: { title: "English", teacher: "Prof. Taylor", room: "EN-101", color: "#e0e7ff" },
    Saturday: { title: "Mathematics", teacher: "Prof. Johnson", room: "M-201", color: C.blue },
  },
  "10:00 - 11:00": {
    Monday: { title: "Mathematics", teacher: "Prof. Johnson", room: "M-201", color: C.blue },
    Tuesday: { title: "Computer Science", teacher: "Dr. Smith", room: "CS-Lab1", color: C.green },
    Wednesday: { title: "Physics", teacher: "Dr. Wilson", room: "PH-202", color: C.purple },
    Thursday: { title: "Digital Logic", teacher: "Dr. Brown", room: "CS-Lab2", color: C.green },
    Friday: { title: "Electronics", teacher: "Prof. Davis", room: "EC-301", color: C.blue },
    Saturday: { title: "Computer Science", teacher: "Dr. Smith", room: "CS-Lab1", color: C.green },
  },
  "11:15 - 12:15": {
    Monday: { title: "Physics", teacher: "Dr. Wilson", room: "PH-Lab1", color: C.green },
    Tuesday: { title: "English", teacher: "Prof. Taylor", room: "EN-101", color: "#e0e7ff" },
    Wednesday: { title: "Computer Science", teacher: "Dr. Smith", room: "CS-101", color: C.blue },
    Thursday: { title: "Mathematics", teacher: "Prof. Johnson", room: "M-201", color: C.blue },
    Friday: { title: "Digital Logic", teacher: "Dr. Brown", room: "CS-103", color: C.purple },
    Saturday: { title: "Physics", teacher: "Dr. Wilson", room: "PH-Lab1", color: C.green },
  },
  "12:15 - 1:15": {},
  "2:15 - 3:15": {
    Monday: { title: "Electronics", teacher: "Prof. Davis", room: "EC-301", color: C.blue },
    Tuesday: { title: "Physics", teacher: "Dr. Wilson", room: "PH-201", color: C.blue },
    Wednesday: { title: "Mathematics", teacher: "Prof. Johnson", room: "M-Lab1", color: C.green },
    Thursday: { title: "Computer Science", teacher: "Dr. Smith", room: "CS-102", color: "#e0e7ff" },
    Friday: { title: "Project Work", teacher: "Dr. Smith", room: "CS-Lab1", color: C.green },
  },
  "3:15 - 4:15": {
    Monday: { title: "Digital Logic", teacher: "Dr. Brown", room: "CS-102", color: C.purple },
    Tuesday: { title: "Electronics", teacher: "Prof. Davis", room: "EC-Lab1", color: C.green },
    Wednesday: { title: "English", teacher: "Prof. Taylor", room: "EN-102", color: "#e0e7ff" },
    Thursday: { title: "Physics", teacher: "Dr. Wilson", room: "PH-201", color: C.blue },
    Friday: { title: "Seminar", teacher: "Various", room: "Auditorium", color: "#e9d5ff" },
  },
  "4:30 - 5:30": {
    Tuesday: { title: "Study Hour", teacher: "", room: "", color: C.amber },
    Thursday: { title: "Library", teacher: "", room: "", color: C.amber },
  },
};

/* ---------------- UI blocks ---------------- */
const Card = ({ children, style }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 16, boxShadow: C.shadow, ...style }}>{children}</div>
);

const KPI = ({ label, value, icon }) => (
  <Card style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <div style={{ width: 36, height: 36, borderRadius: 12, background: "#eef2ff", display: "grid", placeItems: "center" }}>{icon}</div>
    <div>
      <div style={{ fontSize: 12, color: C.sub }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800 }}>{value}</div>
    </div>
  </Card>
);

const Chip = ({ text }) => (
  <span style={{ background: "#eef2ff", color: "#3730a3", borderRadius: 999, padding: "4px 10px", fontSize: 12, fontWeight: 800 }}>{text}</span>
);

const RowItem = ({ item }) => (
  <Card style={{ background: item.color }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontWeight: 800, color: "#1f2937" }}>{item.title}</div>
          {item.type !== "break" && <Chip text={item.type} />}
          {item.type === "break" && <Chip text="break" />}
        </div>
        {item.teacher && (
          <div style={{ marginTop: 6, fontSize: 12, color: "#334155", display: "flex", gap: 12 }}>
            <span>👤 {item.teacher}</span>
            <span>📍 {item.room}</span>
          </div>
        )}
      </div>
      <div style={{ color: "#334155", fontWeight: 700 }}>
        {item.start} - {item.end}
      </div>
    </div>
  </Card>
);

/* ---------------- Main component ---------------- */
export default function Timetable() {
  const [view, setView] = useState("grid"); // 'grid' | 'today'

  const distribution = useMemo(() => {
    const counts = { Lecture: 0, Lab: 0, Tutorial: 0 };
    Object.values(gridCells).forEach((row) =>
      Object.values(row).forEach((c) => {
        if (!c?.title) return;
        if (c.title === "Project Work" || c.title === "Seminar" || c.title === "Study Hour" || c.title === "Library") return;
        const type = c.room?.toLowerCase().includes("lab") ? "Lab" : c.title === "Digital Logic" ? "Tutorial" : "Lecture";
        counts[type] = (counts[type] || 0) + 1;
      })
    );
    const total = Object.values(counts).reduce((s, x) => s + x, 0) || 1;
    return [
      { label: "Lecture", value: Math.round((counts.Lecture / total) * 100), count: counts.Lecture, color: "#6366f1" },
      { label: "Lab", value: Math.round((counts.Lab / total) * 100), count: counts.Lab, color: "#10b981" },
      { label: "Tutorial", value: Math.round((counts.Tutorial / total) * 100), count: counts.Tutorial, color: "#a855f7" },
    ];
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "Inter, ui-sans-serif, system-ui, Arial", background: C.pageBg, minHeight: "100vh", color: C.text }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 22, fontWeight: 800 }}>Timetable</span>
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16 }}>
        {kpis.map((k, i) => (
          <KPI key={i} {...k} />
        ))}
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.9fr", gap: 16, alignItems: "start", marginTop: 16 }}>
        {/* Left column */}
        <Card>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Weekly Timetable</div>

          {/* Tabs */}
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
              onClick={() => setView("grid")}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background: view === "grid" ? C.pillActive : "transparent",
                color: view === "grid" ? C.pillText : C.text,
                fontWeight: 700,
              }}
            >
              Grid View
            </button>
            <button
              onClick={() => setView("today")}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background: view === "today" ? C.pillActive : "transparent",
                color: view === "today" ? C.pillText : C.text,
                fontWeight: 700,
              }}
            >
              Today's Schedule
            </button>
          </div>

          {view === "today" ? (
            <div style={{ display: "grid", gap: 12 }}>
              {todaySchedule.map((i, idx) => (
                <RowItem key={idx} item={i} />
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
                  <div style={{ background: C.gray, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, fontWeight: 800, textAlign: "center" }}>Time</div>
                  {gridDays.map((d) => (
                    <div key={d} style={{ background: C.gray, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, fontWeight: 800, textAlign: "center" }}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* rows */}
                {gridTimes.map((t) => (
                  <div key={t} style={{ display: "grid", gridTemplateColumns: "160px repeat(6, 1fr)", gap: 12, marginBottom: 12 }}>
                    <div style={{ background: C.gray, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, textAlign: "center", color: C.sub }}>{t}</div>
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
                            background: cell.color,
                            border: `1px solid ${C.border}`,
                            borderRadius: 12,
                            padding: 12,
                            textAlign: "left",
                          }}
                        >
                          <div style={{ fontWeight: 800, color: "#1f2937", marginBottom: 4 }}>{cell.title}</div>
                          <div style={{ fontSize: 12, color: "#334155", display: "flex", gap: 10 }}>
                            <span>👤 {cell.teacher}</span>
                            <span>📍 {cell.room}</span>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
            <Card>
              <div style={{ fontWeight: 800, marginBottom: 10 }}>Class Types Distribution</div>
              <div style={{ display: "grid", gap: 12 }}>
                {distribution.map((d) => (
                  <div key={d.label} style={{ display: "grid", gridTemplateColumns: "140px 1fr 60px", alignItems: "center", gap: 10 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
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
                      <span style={{ color: C.sub }}>{d.count} sessions</span>
                    </div>
                    <div style={{ height: 8, background: C.track, borderRadius: 8, overflow: "hidden" }}>
                      <div style={{ width: `${d.value}%`, height: 8, background: d.color }} />
                    </div>
                    <div style={{ textAlign: "right", color: C.sub }}>{d.value}%</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div style={{ fontWeight: 800, marginBottom: 10 }}>Time Management Tips</div>
              <div style={{ display: "grid", gap: 10 }}>
                <Tip color="#e0e7ff" title="Be Punctual" desc="Arrive 5-10 minutes early to settle in and prepare." />
                <Tip color="#dcfce7" title="Prepare in Advance" desc="Review materials before each class for better understanding." />
                <Tip color="#f3e8ff" title="Set Reminders" desc="Use phone alerts for class timings." />
              </div>
            </Card>
          </div>
        </Card>

        {/* Right column */}
        <div style={{ display: "grid", gap: 16 }}>
          <Card>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#f1f5f9", border: `1px solid ${C.border}`, display: "grid", placeItems: "center", fontWeight: 800 }}>
                JS
              </div>
              <div>
                <div style={{ fontWeight: 800 }}>John Smith</div>
                <div style={{ fontSize: 12, color: C.sub }}>Student ID: 2021CS101</div>
                <div style={{ fontSize: 12, color: C.sub }}>Computer Science</div>
              </div>
            </div>
            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              <MiniStat label="CGPA" value="8.5" />
              <MiniStat label="Semester" value="5th" />
              <MiniStat label="Year" value="3rd Year" />
            </div>
          </Card>

          <Card>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Quick Filters</div>
            <div style={{ display: "grid", gap: 10 }}>
              <Select label="Department" options={["Computer Science", "Electronics", "Mechanical", "Civil"]} />
              <Select label="Semester" options={["3rd Semester", "4th Semester", "5th Semester", "6th Semester"]} />
              <button
                style={{
                  marginTop: 6,
                  background: "#ffffff",
                  border: `1px solid ${C.border}`,
                  color: C.text,
                  padding: "10px 12px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Apply Filters
              </button>
            </div>
          </Card>

          <Card>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Quick Actions</div>
            <div style={{ display: "grid", gap: 10 }}>
              <Action label="View Timetable" />
              <Action label="Submit Assignment" />
              <Action label="Contact Faculty" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Small atoms ---------------- */
function Tip({ color, title, desc }) {
  return (
    <div style={{ background: color, borderRadius: 12, padding: 12, border: `1px solid ${C.border}` }}>
      <div style={{ fontWeight: 800 }}>{title}</div>
      <div style={{ fontSize: 14, color: C.sub }}>{desc}</div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div style={{ background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 10, padding: 10, textAlign: "center" }}>
      <div style={{ fontSize: 12, color: C.sub }}>{label}</div>
      <div style={{ fontWeight: 800 }}>{value}</div>
    </div>
  );
}

function Select({ label, options }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: C.sub, marginBottom: 6 }}>{label}</div>
      <select
        style={{
          width: "100%",
          background: "#ffffff",
          border: `1px solid ${C.border}`,
          color: C.text,
          padding: "10px 12px",
          borderRadius: 10,
          outline: "none",
          appearance: "auto",
          WebkitAppearance: "menulist",
          MozAppearance: "menulist",
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
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
