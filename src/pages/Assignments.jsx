// Assignments.jsx
import React, { useMemo, useState, useEffect } from "react";

/* ------------ Palette ------------ */
const C = {
  pageBg: "linear-gradient(180deg,#f4fbff 0%, #f8fafc 60%, #ffffff 100%)",
  text: "#0f172a",
  sub: "#64748b",
  card: "#ffffff",
  border: "#e5e7eb",
  track: "#e5e7eb",
  shadow: "0 10px 24px rgba(15,23,42,.06)",
  rail: "#ede9fe",
  active: "#4f46e5",
  activeText: "#ffffff",
  softBlue: "#e0e7ff",
  softGreen: "#dcfce7",
  softYellow: "#fef9c3",
  softRed: "#fee2e2",
};

/* ------------ Demo Data ------------ */
const student = {
  name: "John Smith",
  id: "2021CS101",
  dept: "Computer Science",
  cgpa: 8.5,
  semester: "5th",
  year: "3rd Year",
};

const initialAssignments = [
  {
    id: 1,
    title: "Data Structures Implementation Project",
    subject: "Computer Science",
    faculty: "Dr. Smith",
    type: "Project",
    marks: 50,
    due: "2024-09-15",
    status: "pending",
    priority: "high",
    attachments: ["project_guidelines.pdf", "sample_code.zip"],
    description: "Implement Stack, Queue, and Linked List with GUI interface",
  },
  {
    id: 2,
    title: "Linear Algebra Problem Set",
    subject: "Mathematics",
    faculty: "Prof. Johnson",
    type: "Problem Set",
    marks: 50,
    due: "2024-09-10",
    status: "submitted",
    priority: "medium",
    attachments: ["math_problems.pdf"],
    description:
      "Solve problems from Chapter 5-7, focus on eigenvalues and eigenvectors",
    submittedOn: "2024-09-08",
    score: { obtained: 42, total: 50 },
  },
  {
    id: 3,
    title: "Circuit Analysis Report",
    subject: "Electronics",
    faculty: "Prof. Davis",
    type: "Report",
    marks: 30,
    due: "2024-09-20",
    status: "pending",
    priority: "medium",
    attachments: ["circuit_diagram.pdf", "analysis_template.docx"],
    description: "Analyze the given RC circuit and prepare a detailed report",
  },
  {
    id: 4,
    title: "Wave Optics Experiment",
    subject: "Physics",
    faculty: "Dr. Wilson",
    type: "Lab Report",
    marks: 30,
    due: "2024-09-05",
    status: "graded",
    priority: "low",
    attachments: ["lab_manual.pdf"],
    description:
      "Conduct interference and diffraction experiments, submit lab report",
    submittedOn: "2024-09-04",
    score: { obtained: 28, total: 30 },
  },
  {
    id: 5,
    title: "Boolean Algebra Simplification",
    subject: "Digital Logic",
    faculty: "Dr. Brown",
    type: "Assignment",
    marks: 25,
    due: "2024-09-25",
    status: "pending",
    priority: "low",
    attachments: ["boolean_problems.pdf"],
    description:
      "Simplify given boolean expressions using K-maps and algebraic methods",
  },
  {
    id: 6,
    title: "Essay on Modern Literature",
    subject: "English",
    faculty: "Prof. Taylor",
    type: "Essay",
    marks: 40,
    due: "2024-09-12",
    status: "submitted",
    priority: "medium",
    attachments: ["essay_guidelines.pdf", "reference_list.pdf"],
    description: "Write a 1500-word essay on contemporary literary trends",
    submittedOn: "2024-09-11",
  },
];

/* ------------ Local Storage Helpers ------------ */
const LS_KEY = "assignments_data";

function loadFromStorage() {
  if (typeof window === "undefined") return initialAssignments;
  try {
    const raw = localStorage.getItem(LS_KEY);
    const data = raw ? JSON.parse(raw) : initialAssignments;
    // ensure submissionFile key exists (for safety)
    return data.map((a) => ({ ...a }));
  } catch {
    return initialAssignments;
  }
}

function saveToStorage(data) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

/* ------------ Helpers ------------ */
const percent = (got, total) => Math.round((got / total) * 100);
const badgePriority = (p) =>
  p === "high"
    ? { bg: C.softRed, color: "#991b1b", text: "high priority" }
    : p === "medium"
    ? { bg: C.softYellow, color: "#92400e", text: "medium priority" }
    : { bg: C.softGreen, color: "#065f46", text: "low priority" };
const statusTone = (s) =>
  s === "pending"
    ? { label: "pending", bg: C.softYellow, color: "#92400e" }
    : s === "submitted"
    ? { label: "submitted", bg: C.softBlue, color: "#3730a3" }
    : { label: "graded", bg: C.softGreen, color: "#065f46" };
const isOverdue = (due) => new Date(due) < new Date();

/* ------------ Shared Input Style ------------ */
const inputBox = {
  padding: "8px 10px",
  borderRadius: 10,
  border: `1px solid ${C.border}`,
  background: "#ffffff",
  color: C.text,
  fontSize: 14,
};

/* ------------ UI Bits ------------ */
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

/* ------------ Upload control (Student submission) ------------ */
/*  This now encodes file to base64 and sends a payload to parent:
    { name, type, size, dataUrl } so teacher can read it from localStorage. */
function UploadControl({ onUpload }) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setFileName(f.name);

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      if (f.type.startsWith("image/")) {
        setPreview(dataUrl);
      } else {
        setPreview(null);
      }

      onUpload?.({
        name: f.name,
        type: f.type,
        size: f.size,
        dataUrl,
      });
    };
    reader.readAsDataURL(f);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <label
        style={{
          background: "#4f46e5",
          color: "#fff",
          padding: "8px 12px",
          borderRadius: 10,
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        ⬆ Upload
        <input
          type="file"
          accept="image/*,.pdf,.doc,.docx,.zip"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </label>
      <div
        style={{
          fontSize: 12,
          color: C.sub,
          maxWidth: 240,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {fileName || "Choose file... (images preview)"}
      </div>
      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{
            width: 40,
            height: 40,
            objectFit: "cover",
            borderRadius: 8,
            border: `1px solid ${C.border}`,
          }}
        />
      )}
    </div>
  );
}

/* ------------ Modal ------------ */
function Modal({ open, title, children, onClose, onSave }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: 16,
          padding: 20,
          width: "min(500px, 95vw)",
          boxShadow: "0 20px 40px rgba(15,23,42,0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 18 }}>{title}</div>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
          {children}
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}
        >
          <button
            onClick={onClose}
            style={{
              ...inputBox,
              background: "#f9fafb",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            style={{
              ...inputBox,
              background: "linear-gradient(90deg,#4f46e5 0%, #14b8a6 100%)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              fontWeight: 800,
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------ Main ------------ */
export default function Assignments() {
  const [tab, setTab] = useState("All");
  const [assignments, setAssignments] = useState(() => loadFromStorage());
  const [justSubmitted, setJustSubmitted] = useState({}); // { [id]: true }

  // Add form
  const [newForm, setNewForm] = useState({
    title: "",
    subject: "",
    faculty: "",
    type: "Assignment",
    marks: "",
    due: "",
    priority: "medium",
    description: "",
  });

  // Edit modal state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    subject: "",
    faculty: "",
    type: "",
    marks: "",
    due: "",
    priority: "medium",
    description: "",
  });

  /* ---- persist to localStorage ---- */
  useEffect(() => {
    saveToStorage(assignments);
  }, [assignments]);

  /* ---- KPI calculations ---- */
  const kpi = useMemo(() => {
    const total = assignments.length;
    const pending = assignments.filter((a) => a.status === "pending").length;
    const submitted = assignments.filter((a) => a.status === "submitted")
      .length;
    const graded = assignments.filter((a) => a.status === "graded");
    const average = graded.length
      ? Math.round(
          graded.reduce(
            (s, a) => s + percent(a.score.obtained, a.score.total),
            0
          ) / graded.length
        )
      : 0;
    return { total, pending, submitted, average };
  }, [assignments]);

  const filtered = assignments.filter((a) => {
    if (tab === "All") return true;
    if (tab === "Pending") return a.status === "pending";
    if (tab === "Submitted") return a.status === "submitted";
    return a.status === "graded";
  });

  /* ------------ CRUD ------------ */
  const addAssignment = () => {
    if (!newForm.title.trim() || !newForm.subject.trim()) return;

    const item = {
      id: Date.now(),
      title: newForm.title.trim(),
      subject: newForm.subject.trim(),
      faculty: newForm.faculty.trim() || "Faculty",
      type: newForm.type || "Assignment",
      marks: Number(newForm.marks) || 0,
      due: newForm.due || new Date().toISOString().slice(0, 10),
      status: "pending",
      priority: newForm.priority,
      attachments: [],
      description: newForm.description.trim() || "New assignment.",
      submissionFile: null,
    };

    setAssignments((prev) => [...prev, item]);
    setNewForm({
      title: "",
      subject: "",
      faculty: "",
      type: "Assignment",
      marks: "",
      due: "",
      priority: "medium",
      description: "",
    });
  };

  const updateAssignment = (id, updatedData) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updatedData } : a))
    );
  };

  const deleteAssignment = (id) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSubmitAssignment = (id) => {
    const today = new Date().toISOString().slice(0, 10);
    updateAssignment(id, { status: "submitted", submittedOn: today });
    setJustSubmitted((s) => ({ ...s, [id]: true }));
    setTimeout(
      () => setJustSubmitted((s) => ({ ...s, [id]: false })),
      3000
    );
  };

  // 🔗 NEW — store uploaded file in this assignment (for teacher to read)
  const handleSubmissionFile = (id, filePayload) => {
    updateAssignment(id, { submissionFile: filePayload });
  };

  /* ------------ Edit Modal Logic ------------ */
  const openEditModal = (assignment) => {
    setEditingId(assignment.id);
    setEditForm({
      title: assignment.title,
      subject: assignment.subject,
      faculty: assignment.faculty,
      type: assignment.type,
      marks: assignment.marks,
      due: assignment.due,
      priority: assignment.priority,
      description: assignment.description,
    });
  };

  const closeEditModal = () => {
    setEditingId(null);
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateAssignment(editingId, {
      title: editForm.title,
      subject: editForm.subject,
      faculty: editForm.faculty,
      type: editForm.type,
      marks: Number(editForm.marks) || 0,
      due: editForm.due,
      priority: editForm.priority,
      description: editForm.description,
    });
    closeEditModal();
  };

  /* ------------ Subject Progress ------------ */
  const subjectProgress = useMemo(() => {
    const map = {};
    assignments.forEach((a) => {
      map[a.subject] ||= { submitted: 0, total: 0 };
      map[a.subject].total += 1;
      if (a.status !== "pending") map[a.subject].submitted += 1;
    });
    return Object.entries(map).map(([subject, v]) => ({ subject, ...v }));
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
        <span style={{ fontSize: 22, fontWeight: 800 }}>Assignments</span>
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
          {student.name}
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
        <KPI label="Total Assignments" value={kpi.total} icon="📄" />
        <KPI label="Pending" value={kpi.pending} icon="⏲" />
        <KPI label="Submitted" value={kpi.submitted} icon="✅" />
        <KPI label="Average Score" value={`${kpi.average}.0%`} icon="✔️" />
      </div>

      {/* Add Assignment Form */}
      <Card style={{ marginTop: 16, marginBottom: 8 }}>
        <div style={{ fontWeight: 800, marginBottom: 10 }}>
          Add New Assignment
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
          }}
        >
          <input
            style={{ ...inputBox, minWidth: 160 }}
            placeholder="Title"
            value={newForm.title}
            onChange={(e) =>
              setNewForm((f) => ({ ...f, title: e.target.value }))
            }
          />
          <input
            style={{ ...inputBox, minWidth: 120 }}
            placeholder="Subject"
            value={newForm.subject}
            onChange={(e) =>
              setNewForm((f) => ({ ...f, subject: e.target.value }))
            }
          />
          <input
            style={{ ...inputBox, width: 90 }}
            type="number"
            placeholder="Marks"
            value={newForm.marks}
            onChange={(e) =>
              setNewForm((f) => ({ ...f, marks: e.target.value }))
            }
          />
          <input
            style={{ ...inputBox, width: 140 }}
            type="date"
            value={newForm.due}
            onChange={(e) =>
              setNewForm((f) => ({ ...f, due: e.target.value }))
            }
          />
          <select
            style={{ ...inputBox, width: 130 }}
            value={newForm.priority}
            onChange={(e) =>
              setNewForm((f) => ({ ...f, priority: e.target.value }))
            }
          >
            <option value="high">High priority</option>
            <option value="medium">Medium priority</option>
            <option value="low">Low priority</option>
          </select>
          <input
            style={{ ...inputBox, flex: 1, minWidth: 200 }}
            placeholder="Short description"
            value={newForm.description}
            onChange={(e) =>
              setNewForm((f) => ({ ...f, description: e.target.value }))
            }
          />
          <button
            onClick={addAssignment}
            style={{
              background: "linear-gradient(90deg,#4f46e5 0%, #14b8a6 100%)",
              color: "#fff",
              border: "none",
              padding: "10px 14px",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 800,
            }}
          >
            ➕ Add
          </button>
        </div>
      </Card>

      {/* Main columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 0.9fr",
          gap: 16,
          alignItems: "start",
          marginTop: 8,
        }}
      >
        <Card>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>
            Assignment Management
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
            {["All", "Pending", "Submitted", "Graded"].map((t) => (
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

          <div style={{ display: "grid", gap: 12 }}>
            {filtered.map((a) => {
              const pr = badgePriority(a.priority);
              const st = statusTone(a.status);
              const overdue = a.status === "pending" && isOverdue(a.due);
              const showTick = a.status === "submitted" && justSubmitted[a.id];

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
                        <Pill text={st.label} bg={st.bg} color={st.color} />
                        {showTick && (
                          <span
                            style={{ color: "#16a34a", fontWeight: 900 }}
                          >
                            ✓
                          </span>
                        )}
                        <Pill text={pr.text} bg={pr.bg} color={pr.color} />
                      </div>

                      <div
                        style={{
                          color: C.sub,
                          fontSize: 14,
                          marginBottom: 8,
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

                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          flexWrap: "wrap",
                          marginTop: 10,
                        }}
                      >
                        {a.attachments.map((f, idx) => (
                          <button
                            key={idx}
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

                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "center",
                          marginTop: 10,
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          style={{
                            background: "#ffffff",
                            border: `1px solid ${C.border}`,
                            padding: "8px 12px",
                            borderRadius: 10,
                            cursor: "pointer",
                            fontWeight: 700,
                          }}
                        >
                          👁 View Details
                        </button>
                        {/* 🔗 Student upload, stored in localStorage for teacher */}
                        <UploadControl
                          onUpload={(filePayload) =>
                            handleSubmissionFile(a.id, filePayload)
                          }
                        />
                        <button
                          onClick={() => openEditModal(a)}
                          style={{
                            background: "#eef2ff",
                            border: `1px solid ${C.border}`,
                            padding: "8px 12px",
                            borderRadius: 10,
                            cursor: "pointer",
                            fontWeight: 700,
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteAssignment(a.id)}
                          style={{
                            background: "#fee2e2",
                            border: `1px solid ${C.border}`,
                            padding: "8px 12px",
                            borderRadius: 10,
                            cursor: "pointer",
                            fontWeight: 700,
                            color: "#b91c1c",
                          }}
                        >
                          🗑 Delete
                        </button>
                        {a.status === "graded" && (
                          <button
                            style={{
                              background: "#ffffff",
                              border: `1px solid ${C.border}`,
                              padding: "8px 12px",
                              borderRadius: 10,
                              cursor: "pointer",
                              fontWeight: 700,
                            }}
                          >
                            ⬇ Download Feedback
                          </button>
                        )}
                      </div>
                    </div>

                    <div style={{ minWidth: 220, textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: C.sub }}>
                        Due: {a.due}
                      </div>
                      {overdue && (
                        <div style={{ color: "#b91c1c", fontWeight: 800 }}>
                          Overdue
                        </div>
                      )}

                      {a.status === "pending" && (
                        <div style={{ marginTop: 12 }}>
                          <button
                            onClick={() => handleSubmitAssignment(a.id)}
                            style={{
                              background:
                                "linear-gradient(90deg,#4f46e5 0%, #14b8a6 100%)",
                              color: "#fff",
                              border: "none",
                              padding: "10px 12px",
                              borderRadius: 10,
                              cursor: "pointer",
                              fontWeight: 800,
                              width: "100%",
                            }}
                          >
                            Submit ✓
                          </button>
                        </div>
                      )}

                      {a.status === "submitted" && (
                        <div
                          style={{
                            marginTop: 10,
                            color: "#16a34a",
                            fontWeight: 800,
                          }}
                        >
                          Submitted: {a.submittedOn}
                        </div>
                      )}

                      {a.status === "graded" && a.score && (
                        <div
                          style={{
                            marginTop: 10,
                            color: "#15803d",
                            fontWeight: 800,
                          }}
                        >
                          Score: {a.score.obtained}/{a.score.total} (
                          {percent(a.score.obtained, a.score.total)}%)
                          <div
                            style={{
                              marginTop: 6,
                              height: 8,
                              background: C.track,
                              borderRadius: 8,
                            }}
                          >
                            <div
                              style={{
                                width: `${percent(
                                  a.score.obtained,
                                  a.score.total
                                )}%`,
                                height: 8,
                                background: "#111827",
                                borderRadius: 8,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Small note so student also sees their upload */}
                      {a.submissionFile && (
                        <div
                          style={{
                            marginTop: 10,
                            fontSize: 12,
                            color: C.sub,
                          }}
                        >
                          Uploaded file:{" "}
                          <span style={{ fontWeight: 700 }}>
                            {a.submissionFile.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Card>

        {/* Right side */}
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
                JS
              </div>
              <div>
                <div style={{ fontWeight: 800 }}>{student.name}</div>
                <div style={{ fontSize: 12, color: C.sub }}>
                  Student ID: {student.id}
                </div>
                <div style={{ fontSize: 12, color: C.sub }}>
                  {student.dept}
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
              <Mini label="CGPA" value={student.cgpa} />
              <Mini label="Semester" value={student.semester} />
              <Mini label="Year" value={student.year} />
            </div>
          </Card>

          <Card>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>
              Quick Filters
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <Select
                label="Department"
                options={[
                  "Computer Science",
                  "Electronics",
                  "Mechanical",
                  "Civil",
                ]}
              />
              <Select
                label="Semester"
                options={[
                  "3rd Semester",
                  "4th Semester",
                  "5th Semester",
                  "6th Semester",
                ]}
              />
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
            <div style={{ fontWeight: 800, marginBottom: 10 }}>
              Quick Actions
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <Action label="View Timetable" />
              <Action label="Submit Assignment" />
              <Action label="Contact Faculty" />
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom widgets */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 16,
          marginTop: 16,
        }}
      >
        <Card>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>
            Subject-wise Progress
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {subjectProgress.map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 14,
                  }}
                >
                  <span>{s.subject}</span>
                  <span style={{ color: C.sub }}>
                    {s.submitted}/{s.total}
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: C.track,
                    borderRadius: 8,
                  }}
                >
                  <div
                    style={{
                      width: `${Math.round(
                        (s.submitted / s.total) * 100
                      )}%`,
                      height: 8,
                      background: "#111827",
                      borderRadius: 8,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>
            Submission Tips
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            <Tip
              color={C.softBlue}
              title="Plan Ahead"
              desc="Start assignments early to avoid last-minute rush."
            />
            <Tip
              color={C.softGreen}
              title="Follow Guidelines"
              desc="Read assignment requirements carefully before starting."
            />
            <Tip
              color={C.softRed}
              title="Save Regularly"
              desc="Back up your work frequently to avoid data loss."
            />
          </div>
        </Card>
      </div>

      {/* Edit Modal */}
      <Modal
        open={!!editingId}
        title="Edit Assignment"
        onClose={closeEditModal}
        onSave={saveEdit}
      >
        <input
          style={inputBox}
          placeholder="Title"
          value={editForm.title}
          onChange={(e) =>
            setEditForm((f) => ({ ...f, title: e.target.value }))
          }
        />
        <input
          style={inputBox}
          placeholder="Subject"
          value={editForm.subject}
          onChange={(e) =>
            setEditForm((f) => ({ ...f, subject: e.target.value }))
          }
        />
        <input
          style={inputBox}
          placeholder="Faculty"
          value={editForm.faculty}
          onChange={(e) =>
            setEditForm((f) => ({ ...f, faculty: e.target.value }))
          }
        />
        <input
          style={inputBox}
          placeholder="Type"
          value={editForm.type}
          onChange={(e) =>
            setEditForm((f) => ({ ...f, type: e.target.value }))
          }
        />
        <input
          style={inputBox}
          type="number"
          placeholder="Marks"
          value={editForm.marks}
          onChange={(e) =>
            setEditForm((f) => ({ ...f, marks: e.target.value }))
          }
        />
        <input
          style={inputBox}
          type="date"
          value={editForm.due}
          onChange={(e) =>
            setEditForm((f) => ({ ...f, due: e.target.value }))
          }
        />
        <select
          style={inputBox}
          value={editForm.priority}
          onChange={(e) =>
            setEditForm((f) => ({ ...f, priority: e.target.value }))
          }
        >
          <option value="high">High priority</option>
          <option value="medium">Medium priority</option>
          <option value="low">Low priority</option>
        </select>
        <textarea
          style={{ ...inputBox, minHeight: 70, resize: "vertical" }}
          placeholder="Description"
          value={editForm.description}
          onChange={(e) =>
            setEditForm((f) => ({ ...f, description: e.target.value }))
          }
        />
      </Modal>
    </div>
  );
}

/* ------------ Atoms ------------ */
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

function Select({ label, options }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: C.sub, marginBottom: 6 }}>
        {label}
      </div>
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
