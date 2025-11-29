// src/teacher/TeacherAssignments.jsx
import React, { useEffect, useMemo, useState } from "react";

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
  softBlue: "#e0e7ff",
  softGreen: "#dcfce7",
  softYellow: "#fef9c3",
  softRed: "#fee2e2",
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

const Pill = ({ text, bg, color }) => (
  <span
    style={{
      background: bg,
      color,
      borderRadius: 999,
      padding: "4px 10px",
      fontSize: 12,
      fontWeight: 800,
    }}
  >
    {text}
  </span>
);

const statusTone = (s) =>
  s === "pending"
    ? { label: "pending", bg: C.softYellow, color: "#92400e" }
    : s === "submitted"
    ? { label: "submitted", bg: C.softBlue, color: "#3730a3" }
    : { label: "graded", bg: C.softGreen, color: "#065f46" };

const badgePriority = (p) =>
  p === "high"
    ? { bg: C.softRed, color: "#991b1b", text: "high priority" }
    : p === "medium"
    ? { bg: C.softYellow, color: "#92400e", text: "medium priority" }
    : { bg: C.softGreen, color: "#065f46", text: "low priority" };

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

export default function TeacherAssignments() {
  const [tab, setTab] = useState("All");
  const [assignments, setAssignments] = useState(() => loadAssignments());

  // Listen for changes made by student page (other tab/window)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === LS_KEY) {
        setAssignments(loadAssignments());
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const kpi = useMemo(() => {
    const total = assignments.length;
    const pending = assignments.filter((a) => a.status === "pending").length;
    const submitted = assignments.filter((a) => a.status === "submitted")
      .length;
    const graded = assignments.filter((a) => a.status === "graded").length;
    const withFile = assignments.filter((a) => a.submissionFile).length;
    return { total, pending, submitted, graded, withFile };
  }, [assignments]);

  const filtered = useMemo(() => {
    if (tab === "All") return assignments;
    if (tab === "Pending")
      return assignments.filter((a) => a.status === "pending");
    if (tab === "Submitted")
      return assignments.filter((a) => a.status === "submitted");
    if (tab === "Graded")
      return assignments.filter((a) => a.status === "graded");
    if (tab === "WithFile")
      return assignments.filter((a) => !!a.submissionFile);
    return assignments;
  }, [assignments, tab]);

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
          Teacher – Assignments
        </span>
        <input
          placeholder="Search by title, subject..."
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
          Faculty Portal
        </div>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <KPI label="Total" value={kpi.total} icon="📄" />
        <KPI label="Pending" value={kpi.pending} icon="⏲" />
        <KPI label="Submitted" value={kpi.submitted} icon="✅" />
        <KPI label="Graded" value={kpi.graded} icon="📊" />
        <KPI label="With Upload" value={kpi.withFile} icon="📎" />
      </div>

      {/* Main layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.7fr 0.9fr",
          gap: 16,
          alignItems: "start",
        }}
      >
        {/* Left – list */}
        <Card>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>
            Student Assignments
          </div>

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
            {["All", "Pending", "Submitted", "Graded", "WithFile"].map(
              (t) => (
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
                  {t === "WithFile" ? "With Upload" : t}
                </button>
              )
            )}
          </div>

          {filtered.length === 0 ? (
            <div
              style={{
                border: `1px dashed ${C.border}`,
                borderRadius: 16,
                padding: 32,
                color: C.sub,
                textAlign: "center",
              }}
            >
              No assignments found for this filter.
            </div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {filtered.map((a) => {
                const st = statusTone(a.status);
                const pr = badgePriority(a.priority);
                const file = a.submissionFile;

                return (
                  <Card key={a.id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 6,
                            flexWrap: "wrap",
                          }}
                        >
                          <div style={{ fontWeight: 800 }}>{a.title}</div>
                          <Pill
                            text={st.label}
                            bg={st.bg}
                            color={st.color}
                          />
                          <Pill
                            text={pr.text}
                            bg={pr.bg}
                            color={pr.color}
                          />
                        </div>
                        <div
                          style={{
                            color: C.sub,
                            fontSize: 14,
                            marginBottom: 6,
                          }}
                        >
                          {a.description}
                        </div>
                        <div
                          style={{
                            color: C.sub,
                            fontSize: 12,
                            display: "flex",
                            gap: 16,
                            flexWrap: "wrap",
                          }}
                        >
                          <span>Subject: {a.subject}</span>
                          <span>Faculty: {a.faculty}</span>
                          <span>Type: {a.type}</span>
                          <span>Marks: {a.marks}</span>
                        </div>

                        {/* Student upload area */}
                        <div
                          style={{
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 12,
                            background: "#f8fafc",
                            border: `1px solid ${C.border}`,
                          }}
                        >
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 800,
                              marginBottom: 6,
                            }}
                          >
                            Student Submission
                          </div>
                          {file ? (
                            <div
                              style={{
                                display: "flex",
                                gap: 12,
                                alignItems: "center",
                                flexWrap: "wrap",
                              }}
                            >
                              {file.type?.startsWith("image/") && (
                                <img
                                  src={file.dataUrl}
                                  alt={file.name}
                                  style={{
                                    width: 80,
                                    height: 80,
                                    objectFit: "cover",
                                    borderRadius: 10,
                                    border: `1px solid ${C.border}`,
                                  }}
                                />
                              )}
                              <div style={{ fontSize: 12, color: C.sub }}>
                                <div style={{ fontWeight: 700 }}>
                                  {file.name}
                                </div>
                                <div>
                                  Type: {file.type || "Unknown"} • Size:{" "}
                                  {Math.round(
                                    (file.size || 0) / 1024
                                  )}{" "}
                                  KB
                                </div>
                                <a
                                  href={file.dataUrl}
                                  download={file.name}
                                  style={{
                                    marginTop: 4,
                                    display: "inline-block",
                                    fontWeight: 700,
                                    fontSize: 12,
                                  }}
                                >
                                  ⬇ Download file
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div style={{ fontSize: 12, color: C.sub }}>
                              No file uploaded yet by student.
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ minWidth: 200, textAlign: "right" }}>
                        <div style={{ fontSize: 12, color: C.sub }}>
                          Due: {a.due}
                        </div>
                        {a.submittedOn && (
                          <div
                            style={{
                              marginTop: 6,
                              fontSize: 12,
                              color: "#16a34a",
                              fontWeight: 800,
                            }}
                          >
                            Submitted: {a.submittedOn}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </Card>

        {/* Right – teacher summary */}
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
                TR
              </div>
              <div>
                <div style={{ fontWeight: 800 }}>Teacher</div>
                <div style={{ fontSize: 12, color: C.sub }}>
                  Assignment Review Panel
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: 12,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
              }}
            >
              <Mini label="Total" value={kpi.total} />
              <Mini label="Submitted" value={kpi.submitted} />
              <Mini label="With Upload" value={kpi.withFile} />
            </div>
          </Card>

          <Card>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>
              Review Tips
            </div>
            <div style={{ fontSize: 14, color: C.sub, display: "grid", gap: 8 }}>
              <div>• Prioritise high-priority & overdue assignments.</div>
              <div>• Use uploaded files to verify originality and format.</div>
              <div>• Share feedback with clear rubric for students.</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
