// Marks.jsx
import React, { useMemo, useState } from "react";

/* ----------------------------- Strict Light Palette ----------------------------- */
const C = {
  pageBg: "#f6f9ff",
  pageBg2: "#ffffff",
  text: "#0f172a",
  subText: "#64748b",
  cardBg: "#ffffff",
  cardBorder: "#e5e7eb",
  kpiBg: "#ffffff",
  barTrack: "#e5e7eb",
  barFill: "#0b0f1a",
  tabRail: "#eef2ff",
  tabActiveBg: "#4f46e5",
  tabActiveText: "#ffffff",
  tabInactiveText: "#374151",
  chipAPlus: "#dcfce7",
  chipA: "#e0e7ff",
  chipAMinus: "#fee2e2",
  chipBPlus: "#fef3c7",
  accentBlue: "#2563eb",
  good: "#16a34a",
  mid: "#f59e0b",
  low: "#ef4444",
};

/* Force document background to light when this component mounts */
const usePageBackground = () => {
  React.useEffect(() => {
    const prev = document.body.style.background;
    const prevColor = document.body.style.color;
    document.body.style.background = `linear-gradient(180deg, ${C.pageBg} 0%, ${C.pageBg2} 70%)`;
    document.body.style.color = C.text;
    return () => {
      document.body.style.background = prev;
      document.body.style.color = prevColor;
    };
  }, []);
};

/* ----------------------------- Data ----------------------------- */
const SUBJECTS = [
  {
    name: "Computer Science",
    gpaPoint: 9,
    gpaLetter: "A",
    semesterTotal: 85,
    assessments: [
      { title: "Mid-term 1", scored: 18, total: 20 },
      { title: "Mid-term 2", scored: 16, total: 20 },
      { title: "Assignment 1", scored: 9, total: 10 },
      { title: "Assignment 2", scored: 8, total: 10 },
    ],
  },
  {
    name: "Mathematics",
    gpaPoint: 8,
    gpaLetter: "B+",
    semesterTotal: 78,
    assessments: [
      { title: "Mid-term 1", scored: 16, total: 20 },
      { title: "Mid-term 2", scored: 15, total: 20 },
      { title: "Quiz 1", scored: 8, total: 10 },
      { title: "Quiz 2", scored: 9, total: 10 },
    ],
  },
  {
    name: "Physics",
    gpaPoint: 10,
    gpaLetter: "A+",
    semesterTotal: 92,
    assessments: [
      { title: "Mid-term 1", scored: 19, total: 20 },
      { title: "Mid-term 2", scored: 17, total: 20 },
      { title: "Lab Test 1", scored: 9, total: 10 },
      { title: "Lab Test 2", scored: 10, total: 10 },
    ],
  },
  {
    name: "Electronics",
    gpaPoint: 8.5,
    gpaLetter: "A-",
    semesterTotal: 80,
    assessments: [
      { title: "Mid-term 1", scored: 17, total: 20 },
      { title: "Mid-term 2", scored: 16, total: 20 },
      { title: "Project", scored: 18, total: 20 },
      { title: "Viva", scored: 15, total: 20 },
    ],
  },
  {
    name: "Digital Logic",
    gpaPoint: 7.5,
    gpaLetter: "B+",
    semesterTotal: 75,
    assessments: [
      { title: "Mid-term 1", scored: 15, total: 20 },
      { title: "Mid-term 2", scored: 14, total: 20 },
      { title: "Lab Assignment", scored: 16, total: 20 },
      { title: "Quiz", scored: 7, total: 10 },
    ],
  },
  {
    name: "English",
    gpaPoint: 9,
    gpaLetter: "A",
    semesterTotal: 88,
    assessments: [
      { title: "Essay 1", scored: 18, total: 20 },
      { title: "Essay 2", scored: 17, total: 20 },
      { title: "Presentation", scored: 19, total: 20 },
      { title: "Group Project", scored: 18, total: 20 },
    ],
  },
];

const STUDENT = {
  name: "John Smith",
  id: "2021CS101",
  dept: "Computer Science",
  cgpaPanel: 8.5,
  semester: "5th",
  year: "3rd Year",
};

/* ----------------------------- Helpers ----------------------------- */
const pct = (x, t) => Math.round((x / t) * 100);
const fmt = (n) => Number(n).toFixed(Number.isInteger(n) ? 0 : 1);
const gradeColor = (p) => (p >= 90 ? C.good : p >= 75 ? C.mid : C.low);
const chipBg = (g) =>
  g === "A+" ? C.chipAPlus : g === "A" ? C.chipA : g === "A-" ? C.chipAMinus : g === "B+" ? C.chipBPlus : "#eef2f7";

const gradeBuckets = [
  { label: "A+", min: 90 },
  { label: "A", min: 85 },
  { label: "A-", min: 80 },
  { label: "B+", min: 75 },
  { label: "B", min: 0 },
];

function computeSummary(subs) {
  const subjects = subs.length;
  const avgMarks = subs.reduce((s, x) => s + x.semesterTotal, 0) / subjects;
  const cgpa = subs.reduce((s, x) => s + x.gpaPoint, 0) / subjects;
  const bucketCount = { "A+": 0, A: 0, "A-": 0, "B+": 0, B: 0 };
  subs.forEach((s) => {
    if (s.semesterTotal >= 90) bucketCount["A+"]++;
    else if (s.semesterTotal >= 85) bucketCount["A"]++;
    else if (s.semesterTotal >= 80) bucketCount["A-"]++;
    else if (s.semesterTotal >= 75) bucketCount["B+"]++;
    else bucketCount["B"]++;
  });
  return { cgpa, avgMarks, subjects, bucketCount };
}

/* ----------------------------- Small UI ----------------------------- */
const Card = ({ children, style }) => (
  <div
    style={{
      background: C.cardBg,
      border: `1px solid ${C.cardBorder}`,
      borderRadius: 16,
      padding: 16,
      boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
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
      background: C.barTrack,
      borderRadius: 8,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${Math.min(100, Math.max(0, value))}%`,
        height: "100%",
        background: C.barFill,
      }}
    />
  </div>
);

const Tiny = ({ stat, value }) => (
  <div
    style={{
      background: C.kpiBg,
      border: `1px solid ${C.cardBorder}`,
      borderRadius: 10,
      padding: 10,
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: 11, color: C.subText }}>{stat}</div>
    <div style={{ fontWeight: 800, color: C.text }}>{value}</div>
  </div>
);

const Tip = ({ title, desc, color }) => (
  <div
    style={{
      background: color,
      color: C.text,
      padding: 12,
      borderRadius: 12,
      fontSize: 14,
      border: `1px solid ${C.cardBorder}`,
    }}
  >
    <div style={{ fontWeight: 800 }}>{title}</div>
    <div style={{ marginTop: 4 }}>{desc}</div>
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <div style={{ fontSize: 12, color: C.subText, marginBottom: 6 }}>
      {label}
    </div>
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      style={{
        width: "100%",
        background: "#ffffff",
        border: `1px solid ${C.cardBorder}`,
        color: C.text,
        padding: "10px 12px",
        borderRadius: 10,
        outline: "none",
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

/* ----------------------------- Panels ----------------------------- */
function OverviewPanel({ subjects }) {
  const stats = useMemo(() => computeSummary(subjects), [subjects]);
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <div style={{ fontWeight: 800, marginBottom: 8, color: C.text }}>
          Subject-wise Performance
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {subjects.map((s) => (
            <Card key={s.name}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <div style={{ fontWeight: 800, color: C.text }}>{s.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      background: chipBg(s.gpaLetter),
                      color: C.text,
                      padding: "4px 8px",
                      borderRadius: 999,
                      fontWeight: 800,
                      fontSize: 12,
                    }}
                  >
                    GPA: {fmt(s.gpaPoint)} {s.gpaLetter}
                  </span>
                  <span style={{ color: C.accentBlue, fontWeight: 700 }}>
                    {fmt(s.semesterTotal)}/100 ({fmt(s.semesterTotal)}%)
                  </span>
                </div>
              </div>
              <Bar value={s.semesterTotal} />
            </Card>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <GradeDistribution subjects={subjects} />
        <StudyTips />
      </div>
    </div>
  );
}

function DetailedPanel({ subjects }) {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {subjects.map((s) => (
        <Card key={s.name} style={{ padding: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <div style={{ fontWeight: 800, flex: 1 }}>{s.name}</div>
            <div
              style={{
                background: chipBg(s.gpaLetter),
                color: C.text,
                padding: "4px 10px",
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 12,
              }}
            >
              {s.gpaLetter} - {fmt(s.gpaPoint)} GPA
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            {s.assessments.map((a, idx) => {
              const percentage = pct(a.scored, a.total);
              return (
                <Card key={idx}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                      fontWeight: 700,
                    }}
                  >
                    <span>{a.title}</span>
                    <span style={{ color: gradeColor(percentage) }}>
                      {a.scored}/{a.total}
                    </span>
                  </div>
                  <Bar value={percentage} />
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 12,
                      color: C.subText,
                      textAlign: "right",
                      fontWeight: 700,
                    }}
                  >
                    {percentage}%
                  </div>
                </Card>
              );
            })}
          </div>

          <Card style={{ marginTop: 10 }}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>
              Semester Total
            </div>
            <Bar value={s.semesterTotal} />
            <div
              style={{
                marginTop: 6,
                display: "flex",
                justifyContent: "flex-end",
                fontSize: 12,
                color: C.accentBlue,
                fontWeight: 800,
              }}
            >
              {fmt(s.semesterTotal)}/100 ({fmt(s.semesterTotal)}%)
            </div>
          </Card>
        </Card>
      ))}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <GradeDistribution subjects={subjects} />
        <StudyTips />
      </div>
    </div>
  );
}

function GradeDistribution({ subjects }) {
  const stats = useMemo(() => computeSummary(subjects), [subjects]);
  return (
    <Card>
      <div style={{ fontWeight: 800, marginBottom: 10 }}>
        Grade Distribution
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {gradeBuckets.map((g) => {
          const count = stats.bucketCount[g.label];
          const pctVal = Math.round((count / subjects.length) * 100);
          return (
            <div
              key={g.label}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr 60px",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
              }}
            >
              <div style={{ color: C.text }}>
                {g.label} • {count} subjects
              </div>
              <div
                style={{ height: 8, background: C.barTrack, borderRadius: 6 }}
              >
                <div
                  style={{
                    width: `${pctVal}%`,
                    height: "100%",
                    background: C.tabActiveBg,
                    borderRadius: 6,
                  }}
                />
              </div>
              <div style={{ textAlign: "right", color: C.subText }}>
                {pctVal}%
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function StudyTips() {
  return (
    <Card>
      <div style={{ fontWeight: 800, marginBottom: 10 }}>Study Tips</div>
      <div style={{ display: "grid", gap: 10 }}>
        <Tip
          title="Consistent Study"
          desc="Regular study sessions yield better results than cramming."
          color={C.chipA}
        />
        <Tip
          title="Focus on Weak Areas"
          desc="Identify and work on subjects with lower grades."
          color={C.chipAPlus}
        />
        <Tip
          title="Group Study"
          desc="Collaborate with peers to enhance understanding."
          color={C.chipAMinus}
        />
      </div>
    </Card>
  );
}

/* ----------------------------- Main ----------------------------- */
export default function Marks() {
  usePageBackground();
  const [tab, setTab] = useState("Overview");

  const summary = useMemo(() => computeSummary(SUBJECTS), []);

  return (
    <div
      style={{
        padding: 24,
        fontFamily: "Inter, ui-sans-serif, system-ui, Arial",
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
        <span
          style={{
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: 0.2,
            color: "#f59e0b",
          }}
        >
          Marks
        </span>
        <input
          placeholder="Search..."
          style={{
            marginLeft: 12,
            flex: 1,
            background: "#ffffff",
            border: `1px solid ${C.cardBorder}`,
            color: C.text,
            padding: "10px 12px",
            borderRadius: 10,
            outline: "none",
          }}
        />
        <div
          style={{
            background: C.kpiBg,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 24,
            padding: "8px 12px",
            fontSize: 12,
            color: C.accentBlue,
            fontWeight: 700,
          }}
        >
          {STUDENT.name}
        </div>
      </div>

      {/* KPI Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 16,
        }}
      >
        <Card style={{ background: C.kpiBg }}>
          <div style={{ fontSize: 12, color: C.subText }}>Overall CGPA</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>
            {fmt(summary.cgpa)}
          </div>
        </Card>
        <Card style={{ background: C.kpiBg }}>
          <div style={{ fontSize: 12, color: C.subText }}>Average Marks</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>
            {fmt(summary.avgMarks)}%
          </div>
        </Card>
        <Card style={{ background: C.kpiBg }}>
          <div style={{ fontSize: 12, color: C.subText }}>Subjects</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>
            {summary.subjects}
          </div>
        </Card>
        <Card style={{ background: C.kpiBg }}>
          <div style={{ fontSize: 12, color: C.subText }}>Semester</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>
            {STUDENT.semester}
          </div>
        </Card>
      </div>

      {/* Main grid */}
      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "1.6fr 0.9fr",
          gap: 16,
          alignItems: "start",
        }}
      >
        {/* Left column */}
        <Card>
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 8,
              background: C.tabRail,
              padding: 6,
              borderRadius: 12,
              border: `1px solid ${C.cardBorder}`,
              marginBottom: 14,
              width: "fit-content",
            }}
          >
            {["Overview", "Detailed Marks"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  background: tab === t ? C.tabActiveBg : "transparent",
                  color: tab === t ? C.tabActiveText : C.tabInactiveText,
                  fontWeight: 700,
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "Overview" ? (
            <OverviewPanel subjects={SUBJECTS} />
          ) : (
            <DetailedPanel subjects={SUBJECTS} />
          )}
        </Card>

        {/* Right column */}
        <div style={{ display: "grid", gap: 16 }}>
          <Card>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#f1f5f9",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 800,
                  border: `1px solid ${C.cardBorder}`,
                  color: C.text,
                }}
              >
                JS
              </div>
              <div>
                <div style={{ fontWeight: 800, color: C.text }}>
                  {STUDENT.name}
                </div>
                <div style={{ fontSize: 12, color: C.subText }}>
                  Student ID: {STUDENT.id}
                </div>
                <div style={{ fontSize: 12, color: C.subText }}>
                  {STUDENT.dept}
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
              <Tiny stat="CGPA" value={fmt(STUDENT.cgpaPanel)} />
              <Tiny stat="Semester" value={STUDENT.semester} />
              <Tiny stat="Year" value={STUDENT.year} />
            </div>
          </Card>

          <Card>
            <div style={{ fontWeight: 800, marginBottom: 10, color: C.text }}>
              Quick Filters
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <Select
                label="Department"
                value={STUDENT.dept}
                options={[
                  "Computer Science",
                  "Electronics",
                  "Mechanical",
                  "Civil",
                ]}
              />
              <Select
                label="Semester"
                value={STUDENT.semester}
                options={["3rd", "4th", "5th", "6th"]}
              />
              <button
                style={{
                  marginTop: 6,
                  background: C.tabActiveBg,
                  border: `1px solid ${C.tabActiveBg}`,
                  color: "#ffffff",
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
        </div>
      </div>
    </div>
  );
}

