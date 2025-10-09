// Profile.jsx
import React, { useMemo, useRef, useState } from "react";

/* Palette */
const C = {
  pageBg: "linear-gradient(180deg,#f4fbff 0%, #f8fafc 60%, #ffffff 100%)",
  text: "#0f172a",
  sub: "#64748b",
  card: "#ffffff",
  border: "#e5e7eb",
  shadow: "0 10px 24px rgba(15,23,42,.06)",
  rail: "#ede9fe",
  active: "#4f46e5",
  activeText: "#ffffff",
  softGreen: "#dcfce7",
  softYellow: "#fef9c3",
  softBlue: "#e0e7ff",
};


const profile = {
  displayName: "John smith",
  studentId: "CS2021001",
  program: "B.Tech - Computer Science",
  semesterText: "Semester 5th",
  cgpaText: "CGPA: 8.67",
};

const rightCard = {
  name: "John Smith",
  id: "2021CS101",
  dept: "Computer Science",
  cgpa: 8.5,
  semester: "5th",
  year: "3rd Year",
};

/* Demo documents */
const initialDocs = [
  { id: 1, name: "Admission Letter", size: "245 KB", uploaded: "2021-08-15", status: "Verified", type: "pdf" },
  { id: 2, name: "10th Marksheet", size: "180 KB", uploaded: "2021-08-10", status: "Verified", type: "pdf" },
  { id: 3, name: "12th Marksheet", size: "195 KB", uploaded: "2021-08-10", status: "Verified", type: "pdf" },
  { id: 4, name: "Transfer Certificate", size: "156 KB", uploaded: "2021-08-12", status: "Verified", type: "pdf" },
  { id: 5, name: "Character Certificate", size: "134 KB", uploaded: "2021-08-12", status: "Pending", type: "pdf" },
];

/* Small UI */
const Card = ({ children, style }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 16, boxShadow: C.shadow, ...style }}>{children}</div>
);
const Field = ({ label, value, full }) => (
  <div style={{ display: "grid", gap: 6, ...(full ? { gridColumn: "1 / -1" } : {}) }}>
    <div style={{ fontSize: 12, color: C.sub }}>{label}</div>
    <div style={{ background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 10, padding: 10 }}>{value}</div>
  </div>
);
const Pill = ({ text, tone = "ok" }) => {
  const map = {
    ok: { bg: C.softGreen, color: "#065f46" },
    pending: { bg: C.softYellow, color: "#92400e" },
    info: { bg: C.softBlue, color: "#3730a3" },
  };
  const { bg, color } = map[tone];
  return <span style={{ background: bg, color, borderRadius: 999, padding: "4px 10px", fontSize: 12, fontWeight: 800 }}>{text}</span>;
};

/* Profile page */
export default function Profile() {
  const [tab, setTab] = useState("Academic"); // default to Academic like screenshot
  const [docs, setDocs] = useState(initialDocs);
  const fileRef = useRef(null);

  const handleUpload = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const isPdf = f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
    const item = {
      id: Date.now(),
      name: f.name,
      size: `${Math.max(1, Math.round(f.size / 1024))} KB`,
      uploaded: new Date().toISOString().slice(0, 10),
      status: "Pending",
      type: isPdf ? "pdf" : "file",
    };
    setDocs((prev) => [item, ...prev]);
    e.target.value = "";
  };

  const Tabs = (
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
      {["Personal", "Academic", "Contact", "Documents", "Settings"].map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            border: "none",
            cursor: "pointer",
            background: tab === t ? C.active : "transparent",
            color: tab === t ? C.activeText : C.text,
            fontWeight: 700,
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );

  const academic = (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <Field label="Department" value="Computer Science" />
      <Field label="Academic Year" value="2023-24" />
      <Field label="Program" value="B.Tech" />
      <Field label="Current CGPA" value="8.67" />
      <Field label="Current Semester" value="5th" />
      <Field label="Total Credits" value="120" />
      <Field label="Roll Number" value="2021CSE001" />
      <Field label="Expected Graduation" value="05/30/2025" />
      <div style={{ gridColumn: "1 / -1", marginTop: 6 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>Academic Standing</div>
              <div style={{ fontSize: 12, color: C.sub }}>Current CGPA</div>
            </div>
            <Pill text="8.67" tone="ok" />
          </div>
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 12, color: C.sub }}>Academic Status</div>
            <div style={{ marginTop: 6 }}>
              <Pill text="Good Standing" tone="ok" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const personal = (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <Field label="Full Name" value="John Doe" />
      <Field label="Date of Birth" value="2003-04-19" />
      <Field label="Gender" value="Male" />
      <Field label="Nationality" value="Indian" />
      <Field label="Blood Group" value="O+" />
      <Field label="Category" value="General" />
      <Field label="Aadhaar Number" value="XXXX-XXXX-1234" />
      <Field label="PAN Number" value="ABCDE1234F" />
    </div>
  );

  const contact = (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Contact Information</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="College Email" value="john.doe@college.edu" />
          <Field label="Personal Email" value="john.doe.personal@gmail.com" />
          <Field label="Phone Number" value="+91 9876543210" />
          <Field label="Alternate Phone" value="+91 8765432109" />
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Current Address</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Street Address" value="Room 204, Hostel Block A" full />
          <Field label="City" value="College Town" />
          <Field label="State" value="Maharashtra" />
          <Field label="Pincode" value="411001" />
          <Field label="Country" value="India" />
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Permanent Address</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Street Address" value="123 Main Street" full />
          <Field label="City" value="Mumbai" />
          <Field label="State" value="Maharashtra" />
          <Field label="Pincode" value="400001" />
          <Field label="Country" value="India" />
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Emergency Contacts</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Contact 1 - Name" value="Robert Doe" />
          <Field label="Relationship" value="Father" />
          <Field label="Phone" value="+91 9876543211" />
          <Field label="Email" value="robert.doe@email.com" />
        </div>
      </div>
    </div>
  );

  const documents = (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontWeight: 800 }}>Uploaded Documents</div>
        <div>
          <button
            onClick={() => fileRef.current?.click()}
            style={{
              background: "linear-gradient(90deg,#4f46e5 0%, #14b8a6 100%)",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 800,
            }}
          >
            ⬆ Upload Document
          </button>
          <input ref={fileRef} type="file" onChange={handleUpload} style={{ display: "none" }} />
        </div>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {docs.map((d) => (
          <Card key={d.id} style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    background: "#eef2ff",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                    color: "#3730a3",
                    fontSize: 12,
                  }}
                >
                  {d.type === "pdf" ? "PDF" : "FILE"}
                </div>
                <div style={{ fontWeight: 800 }}>{d.name}</div>
              </div>
              <div style={{ fontSize: 12, color: C.sub }}>
                Size: {d.size} • Uploaded: {d.uploaded}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "flex-end" }}>
              <Pill text={d.status} tone={d.status === "Verified" ? "ok" : "pending"} />
              <button
                style={{ background: "#ffffff", border: `1px solid ${C.border}`, padding: "8px 12px", borderRadius: 10, cursor: "pointer", fontWeight: 700 }}
              >
                ⬇ Download
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const settings = (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Privacy Settings</div>
        <ToggleRow title="Profile Visibility" desc="Allow other students to view your profile" defaultOn />
        <ToggleRow title="Email Visibility" desc="Show email address to other students" />
        <ToggleRow title="Phone Visibility" desc="Show phone number to other students" />
      </div>
      <div>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Notification Settings</div>
        <ToggleRow title="Email Notifications" desc="Receive notifications via email" defaultOn />
        <ToggleRow title="Assignment Reminders" desc="Get reminders for assignment due dates" defaultOn />
        <ToggleRow title="Grade Updates" desc="Notify when new grades are posted" defaultOn />
      </div>
    </div>
  );

  return (
    <div style={{ padding: 24, fontFamily: "Inter, ui-sans-serif, system-ui, Arial", background: C.pageBg, minHeight: "100vh", color: C.text }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 22, fontWeight: 800 }}>Profile</span>
        <input
          placeholder="Search..."
          style={{ marginLeft: 12, flex: 1, background: "#ffffff", border: `1px solid ${C.border}`, color: C.text, padding: "10px 12px", borderRadius: 10, outline: "none" }}
        />
        <div style={{ background: "#ffffff", border: `1px solid ${C.border}`, borderRadius: 24, padding: "8px 12px", fontSize: 12, color: C.text, fontWeight: 700 }}>
          {rightCard.name}
        </div>
      </div>

      {/* KPI header card */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.9fr", gap: 16, alignItems: "start" }}>
        <Card style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#f1f5f9", border: `1px solid ${C.border}`, display: "grid", placeItems: "center", fontWeight: 800 }}>
            JD
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{profile.displayName}</div>
            <div style={{ display: "flex", gap: 16, color: C.sub, fontSize: 12, marginTop: 4, flexWrap: "wrap" }}>
              <span>👤 Student ID: {profile.studentId}</span>
              <span>🎓 {profile.program}</span>
              <span>📘 {profile.semesterText}</span>
              <span>📈 {profile.cgpaText}</span>
            </div>
          </div>
          <button
            style={{
              background: "#ffffff",
              border: `1px solid ${C.border}`,
              padding: "10px 12px",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            ✏️ Edit Profile
          </button>
        </Card>

        {/* Right summary (fixed to John Smith) */}
        <Card>
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 10 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#f1f5f9", border: `1px solid ${C.border}`, display: "grid", placeItems: "center", fontWeight: 800 }}>JS</div>
            <div>
              <div style={{ fontWeight: 800 }}>{rightCard.name}</div>
              <div style={{ fontSize: 12, color: C.sub }}>Student ID: {rightCard.id}</div>
              <div style={{ fontSize: 12, color: C.sub }}>{rightCard.dept}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            <Mini label="CGPA" value={rightCard.cgpa} />
            <Mini label="Semester" value={rightCard.semester} />
            <Mini label="Year" value={rightCard.year} />
          </div>
        </Card>
      </div>

      {/* Main section */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.9fr", gap: 16, alignItems: "start", marginTop: 16 }}>
        <Card>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Profile Information</div>
          {Tabs}
          {tab === "Personal" && personal}
          {tab === "Academic" && academic}
          {tab === "Contact" && contact}
          {tab === "Documents" && documents}
          {tab === "Settings" && settings}
        </Card>

        {/* Right rail */}
        <div style={{ display: "grid", gap: 16 }}>
          <Card>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Quick Filters</div>
            <div style={{ display: "grid", gap: 10 }}>
              <Select label="Department" options={["Computer Science", "Electronics", "Mechanical", "Civil"]} />
              <Select label="Semester" options={["3rd Semester", "4th Semester", "5th Semester", "6th Semester"]} />
              <button style={{ marginTop: 6, background: "#ffffff", border: `1px solid ${C.border}`, color: C.text, padding: "10px 12px", borderRadius: 10, cursor: "pointer", fontWeight: 700 }}>
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

/* Atoms */
function Mini({ label, value }) {
  return (
    <div style={{ background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 10, padding: 10, textAlign: "center" }}>
      <div style={{ fontSize: 12, color: C.sub }}>{label}</div>
      <div style={{ fontWeight: 800 }}>{value}</div>
    </div>
  );
}
function ToggleRow({ title, desc, defaultOn }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, background: "#fff" }}>
      <div>
        <div style={{ fontWeight: 800 }}>{title}</div>
        <div style={{ fontSize: 12, color: C.sub }}>{desc}</div>
      </div>
      <label style={{ position: "relative", width: 44, height: 24, display: "inline-block" }}>
        <input type="checkbox" checked={on} onChange={() => setOn(!on)} style={{ display: "none" }} />
        <span
          style={{
            position: "absolute",
            inset: 0,
            background: on ? "#111827" : "#e5e7eb",
            borderRadius: 999,
            transition: "0.2s",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 3,
            left: on ? 24 : 3,
            width: 18,
            height: 18,
            background: "#fff",
            borderRadius: "50%",
            transition: "0.2s",
          }}
        />
      </label>
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
