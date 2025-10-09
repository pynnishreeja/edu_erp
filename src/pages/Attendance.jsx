// Attendance.jsx
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

/* -------- Demo data (swap with API) -------- */
const subjectAttendance = [
  { subject: "Computer Science", present: 42, total: 48 },
  { subject: "Mathematics", present: 36, total: 46 },
  { subject: "Physics", present: 44, total: 48 },
  { subject: "Electronics", present: 38, total: 46 },
  { subject: "Digital Logic", present: 35, total: 46 },
  { subject: "English", present: 40, total: 44 },
];

const COLORS = ["#22c55e", "#ef4444"]; // present, absent
const UI = {
  bg: "linear-gradient(180deg,#f4fbff 0%, #f8fafc 60%, #ffffff 100%)",
  text: "#0f172a",
  sub: "#64748b",
  card: "#ffffff",
  border: "#e5e7eb",
  shadow: "0 10px 24px rgba(15,23,42,.06)",
  track: "#e5e7eb",
  good: "#16a34a",
  mid: "#f59e0b",
  low: "#ef4444",
};

const pct = (a, t) => Math.round((a / t) * 100);
const barColor = (p) => (p >= 85 ? UI.good : p >= 75 ? UI.mid : UI.low);

/* -------- Small UI pieces -------- */
const Card = ({ children, style }) => (
  <div
    style={{
      background: UI.card,
      border: `1px solid ${UI.border}`,
      borderRadius: 16,
      padding: 16,
      boxShadow: UI.shadow,
      ...style,
    }}
  >
    {children}
  </div>
);

const KPI = ({ label, value }) => (
  <Card>
    <div style={{ fontSize: 12, color: UI.sub }}>{label}</div>
    <div style={{ fontSize: 28, fontWeight: 800, color: UI.text }}>{value}</div>
  </Card>
);

const Progress = ({ value }) => (
  <div
    style={{
      width: "100%",
      height: 10,
      background: UI.track,
      borderRadius: 999,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${Math.min(100, Math.max(0, value))}%`,
        height: "100%",
        background: barColor(value),
      }}
    />
  </div>
);

/* -------- Main component -------- */
export default function Attendance() {
  const overall = useMemo(() => {
    const present = subjectAttendance.reduce((s, x) => s + x.present, 0);
    const total = subjectAttendance.reduce((s, x) => s + x.total, 0);
    const presentPct = pct(present, total);
    return {
      present,
      total,
      presentPct,
      absentPct: 100 - presentPct,
      chart: [
        { name: "Present", value: presentPct },
        { name: "Absent", value: 100 - presentPct },
      ],
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: UI.bg,
        padding: 24,
        color: UI.text,
        fontFamily: "Inter, ui-sans-serif, system-ui, Arial",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 900 }}>Attendance</div>
          <div style={{ fontSize: 12, color: UI.sub }}>Updated just now</div>
        </div>

        {/* KPIs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0,1fr))",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <KPI label="Overall" value={`${overall.presentPct}%`} />
          <KPI label="Present" value={`${overall.presentPct}%`} />
          <KPI label="Absent" value={`${overall.absentPct}%`} />
          <KPI label="Total Classes" value={`${overall.present}/${overall.total}`} />
        </div>

        {/* Top: overall chart and tips */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <div style={{ fontWeight: 800 }}>Overall Attendance</div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: barColor(overall.presentPct),
                }}
              >
                {overall.presentPct}% present
              </div>
            </div>
            <div style={{ width: "100%", height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={overall.chart}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={2}
                  >
                    {overall.chart.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 14,
                color: UI.sub,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                Present: <b style={{ color: UI.text }}>{overall.present}</b> /{" "}
                <b style={{ color: UI.text }}>{overall.total}</b>
              </span>
              <span>
                Absent:{" "}
                <b style={{ color: UI.text }}>
                  {overall.total - overall.present}
                </b>
              </span>
            </div>
          </Card>

          <Card>
            <div style={{ fontWeight: 800, marginBottom: 8 }}>Attendance Tips</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: UI.text, lineHeight: 1.6 }}>
              <li>Set reminders before morning classes and labs.</li>
              <li>Coordinate with teammates to mark group lab sessions early.</li>
              <li>Track subjects below 75% and prioritize those in weekly plans.</li>
            </ul>
          </Card>
        </div>

        {/* Subject-wise */}
        <Card>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Subject-wise Attendance</div>

          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 5fr 2fr 2fr",
              padding: "6px 10px",
              color: UI.sub,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            <div>Subject</div>
            <div>Progress</div>
            <div style={{ textAlign: "right" }}>Percent</div>
            <div style={{ textAlign: "right" }}>Attended</div>
          </div>

          {/* Rows */}
          <div style={{ borderTop: `1px solid ${UI.border}` }}>
            {subjectAttendance.map((s, i) => {
              const p = pct(s.present, s.total);
              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3fr 5fr 2fr 2fr",
                    gap: 10,
                    alignItems: "center",
                    padding: "10px",
                    borderBottom: `1px solid ${UI.border}`,
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{s.subject}</div>
                  <div>
                    <Progress value={p} />
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      fontWeight: 800,
                      color: barColor(p),
                    }}
                  >
                    {p}%
                  </div>
                  <div style={{ textAlign: "right", color: UI.sub }}>
                    {s.present}/{s.total}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
