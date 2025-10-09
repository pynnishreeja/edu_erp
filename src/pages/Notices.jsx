// Notices.jsx
import React, { useMemo, useState } from "react";

/* ---------------- Palette ---------------- */
const C = {
  pageBg: "linear-gradient(180deg,#f4fbff 0%, #f8fafc 60%, #ffffff 100%)",
  text: "#0f172a",
  sub: "#64748b",
  card: "#ffffff",
  border: "#e5e7eb",
  shadow: "0 10px 24px rgba(15,23,42,.06)",
  rail: "#ede9fe",
  pill: "#eef2ff",
  danger: "#fee2e2",
  warn: "#fef3c7",
  ok: "#dcfce7",
  blueSoft: "#e0e7ff",
};

/* ---------------- Demo data ---------------- */
const NOTICES = [
  {
    id: 1,
    title: "Semester End Examination Schedule Released",
    body:
      "The examination schedule for Semester 5 has been released. Students are advised to check their exam dates and plan accordingly. No changes will be made to the schedule after October 1st.",
    category: "Academic",
    priority: "high",
    deadline: "2024-10-01",
    pinned: true,
    read: false,
    attachments: ["exam_schedule.pdf", "exam_guidelines.pdf"],
    author: "Dr. Academic Controller",
    daysAgo: 381,
    views: 245,
    dept: "Examination Cell",
  },
  {
    id: 2,
    title: "Scholarship Applications for Meritorious Students",
    body:
      "Applications are invited for merit-based scholarships for the academic year 2024-25. Students with CGPA above 8.5 are eligible to apply. All required documents must be submitted before the deadline.",
    category: "Financial",
    priority: "high",
    deadline: "2024-10-10",
    pinned: true,
    read: false,
    attachments: ["scholarship_form.pdf", "eligibility_criteria.pdf"],
    author: "Scholarship Committee",
    daysAgo: 389,
    views: 312,
    dept: "Student Welfare",
  },
  {
    id: 3,
    title: "Annual Tech Fest Registration Open",
    body:
      "Registration for the annual technical festival 'TechnoVision 2024' is now open. Students can participate in various competitions including coding, robotics, and project presentations. Early bird registration ends on September 30.",
    category: "Events",
    priority: "medium",
    deadline: "2024-09-30",
    pinned: false,
    read: true,
    attachments: ["techfest_brochure.pdf", "registration_form.pdf"],
    author: "Events Coordinator",
    daysAgo: 386,
    views: 456,
    dept: "Student Activities",
  },
  {
    id: 4,
    title: "Guest Lecture on Artificial Intelligence",
    body:
      "A special guest lecture on 'Future of AI in Industry' will be conducted by Dr. Sarah Johnson from MIT on October 5th at 3:00 PM in the main auditorium. All students are welcome to attend.",
    category: "Academic",
    priority: "medium",
    deadline: "",
    pinned: false,
    read: false,
    attachments: ["guest_lecture_details.pdf"],
    author: "HOD Computer Science",
    daysAgo: 393,
    views: 167,
    dept: "Computer Science",
  },
  {
    id: 5,
    title: "Updated COVID-19 Safety Guidelines",
    body:
      "In light of recent health advisories, updated COVID-19 safety guidelines have been issued. All students and staff are required to follow these protocols while on campus.",
    category: "Health",
    priority: "high",
    deadline: "",
    pinned: false,
    read: true,
    attachments: ["covid_guidelines.pdf", "safety_protocols.pdf"],
    author: "Health & Safety Officer",
    daysAgo: 396,
    views: 523,
    dept: "Administration",
  },
  {
    id: 6,
    title: "Campus WiFi Maintenance Schedule",
    body:
      "The campus WiFi network will undergo maintenance on September 25th from 2:00 AM to 6:00 AM. Internet services may be intermittent during this period. We apologize for any inconvenience.",
    category: "Technical",
    priority: "low",
    deadline: "",
    pinned: false,
    read: false,
    attachments: [],
    author: "Network Administrator",
    daysAgo: 391,
    views: 78,
    dept: "IT Services",
  },
  {
    id: 7,
    title: "Placement Drive by Tech Giants",
    body:
      "Major technology companies including Google, Microsoft, and Amazon will be conducting campus placement drives in November. Students in final year should register for pre‑placement talks and prepare accordingly.",
    category: "Career",
    priority: "high",
    deadline: "2024-10-15",
    pinned: false,
    read: false,
    attachments: [],
    author: "Placement Officer",
    daysAgo: 399,
    views: 678,
    dept: "Placements",
  },
  {
    id: 8,
    title: "Library Timings Extended During Exams",
    body:
      "The central library will remain open 24/7 during the examination period from October 15th to November 15th. Additional study halls have been arranged to accommodate more students.",
    category: "Facility",
    priority: "medium",
    deadline: "",
    pinned: false,
    read: true,
    attachments: ["library_extended_hours.pdf"],
    author: "Chief Librarian",
    daysAgo: 383,
    views: 189,
    dept: "Library",
  },
];

/* ---------------- Helpers ---------------- */
const fmt = (n) => n.toLocaleString("en-IN");
const pillTone = (type, text) => {
  if (type === "priority") {
    if (text === "high") return { bg: C.danger, color: "#991b1b" };
    if (text === "medium") return { bg: C.warn, color: "#92400e" };
    return { bg: C.ok, color: "#065f46" };
  }
  // category/info
  return { bg: C.pill, color: "#3730a3" };
};

const Card = ({ children, style }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 16, boxShadow: C.shadow, ...style }}>{children}</div>
);

const Stat = ({ icon, label, value }) => (
  <Card style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <div style={{ width: 36, height: 36, borderRadius: 12, background: "#eef2ff", display: "grid", placeItems: "center" }}>{icon}</div>
    <div>
      <div style={{ fontSize: 12, color: C.sub }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800 }}>{value}</div>
    </div>
  </Card>
);

const Select = ({ label, value, onChange, options }) => (
  <div style={{ display: "grid", gap: 6 }}>
    {label && <div style={{ fontSize: 12, color: C.sub }}>{label}</div>}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
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

const Pill = ({ children, tone = "info" }) => {
  const { bg, color } = tone === "info" ? pillTone("info") : pillTone("priority", tone);
  return (
    <span style={{ background: bg, color, padding: "4px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>{children}</span>
  );
};

/* ---------------- Main ---------------- */
export default function Notices() {
  const [tab, setTab] = useState("All"); // All | Pinned | Unread | Archived
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");
  const [readFilter, setReadFilter] = useState("All");
  const [query, setQuery] = useState("");

  const stats = useMemo(() => {
    const total = NOTICES.length;
    const unread = NOTICES.filter((n) => !n.read).length;
    const urgent = NOTICES.filter((n) => n.priority === "high").length;
    const pinned = NOTICES.filter((n) => n.pinned).length;
    return { total, unread, urgent, pinned };
  }, []);

  const list = useMemo(() => {
    let arr = [...NOTICES];

    if (tab === "Pinned") arr = arr.filter((n) => n.pinned);
    else if (tab === "Unread") arr = arr.filter((n) => !n.read);
    else if (tab === "Archived") arr = []; // no archived in demo

    if (category !== "All") arr = arr.filter((n) => n.category === category);
    if (priority !== "All") arr = arr.filter((n) => n.priority === priority);
    if (readFilter !== "All") arr = arr.filter((n) => (readFilter === "Read" ? n.read : !n.read));
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.body.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
      );
    }
    return arr;
  }, [tab, category, priority, readFilter, query]);

  return (
    <div style={{ padding: 24, fontFamily: "Inter, ui-sans-serif, system-ui, Arial", background: C.pageBg, minHeight: "100vh", color: C.text }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 22, fontWeight: 800 }}>Notices</span>
        <input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

      {/* KPI row and right card */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.9fr", gap: 16, alignItems: "start" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 16 }}>
          <Stat icon="💬" label="Total Notices" value={stats.total} />
          <Stat icon="🔔" label="Unread" value={stats.unread} />
          <Stat icon="❗" label="Urgent" value={stats.urgent} />
          <Stat icon="📌" label="Pinned" value={stats.pinned} />
        </div>

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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 12 }}>
            <Mini label="CGPA" value="8.5" />
            <Mini label="Semester" value="5th" />
            <Mini label="Year" value="3rd Year" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.9fr", gap: 16, alignItems: "start", marginTop: 16 }}>
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.6fr 0.6fr 0.6fr", gap: 12 }}>
            <input
              placeholder="Search notices..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                background: "#ffffff",
                border: `1px solid ${C.border}`,
                color: C.text,
                padding: "10px 12px",
                borderRadius: 10,
                outline: "none",
              }}
            />
            <Select
              value={category}
              onChange={setCategory}
              options={["All", "Academic", "Events", "Financial", "Technical", "Health", "Career", "Facility"]}
            />
            <Select value={priority} onChange={setPriority} options={["All", "high", "medium", "low"]} />
            <Select value={readFilter} onChange={setReadFilter} options={["All", "Read", "Unread"]} />
          </div>

          {/* Tabs */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Notices & Announcements</div>

            <div
              style={{
                display: "flex",
                gap: 8,
                background: C.rail,
                padding: 6,
                borderRadius: 999,
                border: `1px solid ${C.border}`,
                width: "fit-content",
                marginBottom: 14,
              }}
            >
              {["All", "Pinned", `Unread (${stats.unread})`, "Archived"].map((t) => {
                const key = t.startsWith("Unread") ? "Unread" : t;
                const active = (tab === "Unread" && key === "Unread") || tab === key;
                return (
                  <button
                    key={t}
                    onClick={() => setTab(key)}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 999,
                      border: "none",
                      cursor: "pointer",
                      background: active ? C.active : "transparent",
                      color: active ? "#fff" : C.text,
                      fontWeight: 700,
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {/* List */}
            {tab === "Archived" ? (
              <div
                style={{
                  border: `1px dashed ${C.border}`,
                  borderRadius: 16,
                  padding: 32,
                  color: C.sub,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                No archived notices
              </div>
            ) : (
              <div style={{ display: "grid", gap: 12 }}>
                {list.map((n) => (
                  <NoticeCard key={n.id} notice={n} />
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right filters and actions */}
        <div style={{ display: "grid", gap: 16 }}>
          <Card>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Quick Filters</div>
            <div style={{ display: "grid", gap: 10 }}>
              <Select label="Department" value="Computer Science" onChange={() => {}} options={["Computer Science", "Electronics", "Mechanical", "Civil"]} />
              <Select label="Semester" value="5th Semester" onChange={() => {}} options={["3rd Semester", "4th Semester", "5th Semester", "6th Semester"]} />
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

/* ---------------- Notice Card ---------------- */
function NoticeCard({ notice }) {
  const pTone = pillTone("priority", notice.priority);
  const cTone = pillTone("info");

  return (
    <div
      style={{
        background: "#f6f9ff",
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: 14,
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 18, fontWeight: 800 }}>{notice.title}</span>
          {notice.pinned && <span title="Pinned">📌</span>}
          <span style={{ background: cTone.bg, color: cTone.color, padding: "4px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>
            {notice.category}
          </span>
          <span style={{ background: pTone.bg, color: pTone.color, padding: "4px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>
            {notice.priority}
          </span>
          {notice.deadline && (
            <span style={{ background: C.danger, color: "#991b1b", padding: "4px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>
              Deadline: {notice.deadline}
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={iconBtnStyle}>👁 Read</button>
          <button style={iconBtnStyle}>🔖</button>
        </div>
      </div>

      {/* Body */}
      <div style={{ marginTop: 8, color: C.text }}>{notice.body}</div>

      {/* Meta */}
      <div style={{ marginTop: 10, fontSize: 12, color: C.sub, display: "flex", gap: 14, flexWrap: "wrap" }}>
        <span>👤 {notice.author}</span>
        <span>🗓 {notice.daysAgo} days ago</span>
        <span>👁 {fmt(notice.views)} views</span>
        <span>🏷 {notice.dept}</span>
      </div>

      {/* Attachments */}
      {notice.attachments?.length > 0 && (
        <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {notice.attachments.map((f, i) => (
            <button
              key={i}
              style={{
                background: "#ffffff",
                border: `1px solid ${C.border}`,
                padding: "8px 10px",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              ⬇ {f}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- Atoms ---------------- */
function Mini({ label, value }) {
  return (
    <div style={{ background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 10, padding: 10, textAlign: "center" }}>
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
const iconBtnStyle = {
  background: "#ffffff",
  border: `1px solid ${C.border}`,
  padding: "6px 10px",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 700,
};
