// Fees.jsx
import React, { useState } from "react";

/* ---------------- Palette ---------------- */
const C = {
  pageBg: "linear-gradient(180deg,#f4fbff 0%, #f8fafc 60%, #ffffff 100%)",
  text: "#0f172a",
  sub: "#64748b",
  card: "#ffffff",
  border: "#e5e7eb",
  kpiBg: "#ffffff",
  barTrack: "#e5e7eb",
  barFill: "#0b0f1a",
  pillRail: "#ede9fe",
  pillActive: "#4f46e5",
  pillText: "#ffffff",
  softGreen: "#dcfce7",
  softBlue: "#dbeafe",
  softYellow: "#fef9c3",
  softRed: "#fee2e2",
  shadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
};

/* ---------------- Sample Data ---------------- */
const student = { name: "John Smith", id: "2021CS101", dept: "Computer Science", cgpa: 8.5, semester: "5th", year: "3rd Year" };
const kpi = { total: 67000, paid: 58000 };

const currentSemesterFees = [
  { title: "Tuition Fee", due: "2024-08-15", paidOn: "2024-08-10", amount: 45000, status: "paid" },
  { title: "Lab Fee", due: "2024-08-15", paidOn: "2024-08-12", amount: 8000, status: "paid" },
  { title: "Library Fee", due: "2024-08-15", paidOn: "2024-08-10", amount: 2000, status: "paid" },
  { title: "Examination Fee", due: "2024-09-15", amount: 1500, status: "pending" },
  { title: "Development Fee", due: "2024-09-15", amount: 5000, status: "pending" },
  { title: "Miscellaneous", due: "2024-09-15", amount: 2500, status: "pending" },
];

const payments = [
  { id: "TXN001", title: "Semester 5 - Tuition + Library + Sports Fee", date: "2024-08-10", method: "Online", amount: 50000 },
  { id: "TXN002", title: "Lab Fee - Semester 5", date: "2024-08-12", method: "Bank Transfer", amount: 8000 },
  { id: "TXN003", title: "Semester 4 - Full Payment", date: "2024-07-15", method: "Online", amount: 55000 },
  { id: "TXN004", title: "Semester 3 - Full Payment", date: "2024-04-10", method: "Cash", amount: 55000 },
];

const receipts = [
  { id: "TXN001", date: "2024-08-10", amount: 50000 },
  { id: "TXN002", date: "2024-08-12", amount: 8000 },
  { id: "TXN003", date: "2024-07-15", amount: 55000 },
  { id: "TXN004", date: "2024-04-10", amount: 55000 },
];

const appliedScholarships = [
  { name: "Merit Scholarship", amount: 5000, sem: "5th", tag: "Applied" },
  { name: "Need-based Aid", amount: 3000, sem: "5th", tag: "Approved" },
  { name: "Sports Excellence", amount: 2000, sem: "5th", tag: "Pending" },
];

const availableScholarships = [
  { name: "Academic Excellence Award", desc: "For students with CGPA above 9.0", amount: 10000, color: C.softBlue },
  { name: "Research Grant", desc: "For project-based research work", amount: 5000, color: "#eaf7ef" },
];

/* ---------------- Helpers ---------------- */
const toINR = (n) => "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
const percent = (paid, total) => Math.round((paid / total) * 100);

/* ---------------- Shared UI ---------------- */
const Card = ({ children, style }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 16, boxShadow: C.shadow, ...style }}>{children}</div>
);

const KPI = ({ label, value, icon }) => (
  <Card style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <div style={{ width: 36, height: 36, borderRadius: 12, background: C.softBlue, display: "grid", placeItems: "center", fontWeight: 800, color: "#2563eb" }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: 12, color: C.sub }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800 }}>{value}</div>
    </div>
  </Card>
);

const Bar = ({ value }) => (
  <div style={{ width: "100%", height: 10, background: C.barTrack, borderRadius: 8, overflow: "hidden" }}>
    <div style={{ width: `${Math.min(100, Math.max(0, value))}%`, height: "100%", background: C.barFill }} />
  </div>
);

const Badge = ({ text, tone = "neutral" }) => {
  const map = {
    success: { bg: C.softGreen, color: "#065f46" },
    warn: { bg: C.softYellow, color: "#92400e" },
    danger: { bg: C.softRed, color: "#991b1b" },
    neutral: { bg: "#eef2ff", color: "#3730a3" },
  };
  const { bg, color } = map[tone];
  return <span style={{ background: bg, color, borderRadius: 999, padding: "4px 10px", fontSize: 12, fontWeight: 800 }}>{text}</span>;
};

/* ---------------- Panels ---------------- */
function CurrentSemester() {
  const pending = kpi.total - kpi.paid;
  const completion = percent(kpi.paid, kpi.total);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
          <div style={{ fontWeight: 800 }}>Semester 5 Payment Progress</div>
          <Badge text={`${toINR(pending)} Pending`} tone="warn" />
        </div>
        <Bar value={completion} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, color: C.sub, fontWeight: 700, fontSize: 12 }}>
          <span>Paid: {toINR(kpi.paid)}</span>
          <span>Total: {toINR(kpi.total)}</span>
        </div>
      </Card>

      <div style={{ fontWeight: 800, marginTop: 8 }}>Fee Breakdown</div>
      <div style={{ display: "grid", gap: 12 }}>
        {currentSemesterFees.map((f, i) => (
          <Card key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 14 }}>
            <div style={{ display: "grid", gap: 4 }}>
              <div style={{ fontWeight: 700 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: C.sub }}>
                Due: {f.due}
                {f.paidOn ? ` | Paid: ${f.paidOn}` : ""}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontWeight: 800 }}>{toINR(f.amount)}</div>
              {f.status === "paid" ? <Badge text="paid" tone="success" /> : <Badge text="pending" tone="warn" />}
              {f.status !== "paid" && (
                <button
                  style={{
                    background: "linear-gradient(90deg,#4f46e5 0%, #14b8a6 100%)",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: 10,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Pay Now
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Payment Methods</div>
          <div style={{ display: "grid", gap: 10 }}>
            <PayMethod title="Online Payment" desc="Cards, UPI, Net Banking" />
            <PayMethod title="Bank Transfer" desc="NEFT, RTGS" badge="Preferred" />
            <PayMethod title="Cash Payment" desc="At Accounts Office" />
          </div>
        </Card>
        <Card>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Important Notes</div>
          <Note color={C.softYellow} title="Late Fee" desc="₹500 late fee applicable after due date." />
          <Note color={C.softBlue} title="Online Convenience" desc="2% convenience fee for online payments." />
          <Note color={C.softGreen} title="Scholarship Credit" desc="Approved scholarships auto-adjusted in fees." />
        </Card>
      </div>
    </div>
  );
}

function PaymentHistory() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {payments.map((p) => (
        <Card key={p.id} style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 12, alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 700 }}>{p.title}</div>
            <div style={{ fontSize: 12, color: C.sub, display: "flex", gap: 16 }}>
              <span>Transaction ID: {p.id}</span>
              <span>Date: {p.date}</span>
              <span>Method: {p.method}</span>
            </div>
          </div>
          <div style={{ fontWeight: 800 }}>{toINR(p.amount)}</div>
          <Badge text="Success" tone="success" />
          <button
            style={{
              background: "#ffffff",
              border: `1px solid ${C.border}`,
              padding: "8px 12px",
              borderRadius: 10,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ⬇ Receipt
          </button>
        </Card>
      ))}
    </div>
  );
}

function Scholarships() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Applied Scholarships</div>
          <div style={{ display: "grid", gap: 10 }}>
            {appliedScholarships.map((s, i) => (
              <div
                key={i}
                style={{
                  background: "#f9fafb",
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: C.sub }}>Amount: {toINR(s.amount)}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Badge text={s.tag} />
                  <div style={{ fontSize: 12, color: C.sub }}>Semester: {s.sem}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Available Scholarships</div>
          <div style={{ display: "grid", gap: 12 }}>
            {availableScholarships.map((s, i) => (
              <div
                key={i}
                style={{
                  background: s.color,
                  borderRadius: 12,
                  padding: 12,
                  border: `1px solid ${C.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontWeight: 800 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: C.sub }}>{s.desc}</div>
                  <div style={{ marginTop: 6, fontWeight: 800 }}>Amount: {toINR(s.amount)}</div>
                </div>
                <button
                  style={{
                    background: "#ffffff",
                    border: `1px solid ${C.border}`,
                    padding: "8px 12px",
                    borderRadius: 10,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Receipts() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ fontWeight: 800 }}>Download Receipts</div>
        <button
          style={{
            background: "#ffffff",
            border: `1px solid ${C.border}`,
            padding: "8px 12px",
            borderRadius: 10,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ⬇ Download All
        </button>
      </div>

      {receipts.map((r) => (
        <Card key={r.id} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", alignItems: "center", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 700 }}>Receipt #{r.id}</div>
            <div style={{ fontSize: 12, color: C.sub }}>
              {r.date} — {toINR(r.amount)}
            </div>
          </div>
          <div style={{ fontWeight: 800 }}>{toINR(r.amount)}</div>
          <button
            style={{
              background: "#ffffff",
              border: `1px solid ${C.border}`,
              padding: "8px 12px",
              borderRadius: 10,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ⬇ Download
          </button>
        </Card>
      ))}
    </div>
  );
}

/* ---------------- Small blocks ---------------- */
const MiniStat = ({ label, value }) => (
  <div style={{ background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 10, padding: 10, textAlign: "center" }}>
    <div style={{ fontSize: 12, color: C.sub }}>{label}</div>
    <div style={{ fontWeight: 800 }}>{value}</div>
  </div>
);

/* Renamed to avoid redeclaration conflicts */
const PayMethod = ({ title, desc, badge }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#f8fafc",
      border: `1px solid ${C.border}`,
      padding: 12,
      borderRadius: 12,
    }}
  >
    <div>
      <div style={{ fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 12, color: C.sub }}>{desc}</div>
    </div>
    {badge && <Badge text={badge} />}
  </div>
);

const Note = ({ color, title, desc }) => (
  <div style={{ background: color, borderRadius: 12, padding: 12, marginBottom: 10, border: `1px solid ${C.border}` }}>
    <div style={{ fontWeight: 800 }}>{title}</div>
    <div style={{ fontSize: 14, color: C.text }}>{desc}</div>
  </div>
);

/* ---------------- Main ---------------- */
export default function Fees() {
  const [tab, setTab] = useState("Current Semester");

  // Quick Filters: controlled dropdowns
  const [dept, setDept] = useState(student.dept);
  const [sem, setSem] = useState(student.semester);

  const completion = percent(kpi.paid, kpi.total);
  const pending = kpi.total - kpi.paid;

  return (
    <div style={{ padding: 24, fontFamily: "Inter, ui-sans-serif, system-ui, Arial", background: C.pageBg, minHeight: "100vh", color: C.text }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>Fees</span>
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
          {student.name}
        </div>
      </div>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16, marginBottom: 8 }}>
        <KPI label="Total Fees" value={toINR(kpi.total)} icon="$" />
        <KPI label="Paid Amount" value={toINR(kpi.paid)} icon="✓" />
        <KPI label="Pending" value={toINR(pending)} icon="!" />
        <KPI label="Completion" value={`${completion}%`} icon="🧾" />
      </div>

      {/* Content grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.9fr", gap: 16, alignItems: "start" }}>
        <Card>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Fee Management</div>

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
            {["Current Semester", "Payment History", "Scholarships", "Receipts"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  background: tab === t ? C.pillActive : "transparent",
                  color: tab === t ? C.pillText : C.text,
                  fontWeight: 700,
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "Current Semester" && <CurrentSemester />}
          {tab === "Payment History" && <PaymentHistory />}
          {tab === "Scholarships" && <Scholarships />}
          {tab === "Receipts" && <Receipts />}
        </Card>

        {/* Right column */}
        <div style={{ display: "grid", gap: 16 }}>
          <Card>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "#f1f5f9",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 800,
                  border: `1px solid ${C.border}`,
                  color: C.text,
                }}
              >
                JS
              </div>
              <div>
                <div style={{ fontWeight: 800 }}>{student.name}</div>
                <div style={{ fontSize: 12, color: C.sub }}>Student ID: {student.id}</div>
                <div style={{ fontSize: 12, color: C.sub }}>{student.dept}</div>
              </div>
            </div>
            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              <MiniStat label="CGPA" value={student.cgpa} />
              <MiniStat label="Semester" value={student.semester} />
              <MiniStat label="Year" value={student.year} />
            </div>
          </Card>

          <Card>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Quick Filters</div>
            <div style={{ display: "grid", gap: 10 }}>
              {/* Department dropdown */}
              <div>
                <div style={{ fontSize: 12, color: C.sub, marginBottom: 6 }}>Department</div>
                <select
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
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
                  {["Computer Science", "Electronics", "Mechanical", "Civil", "IT"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Semester dropdown */}
              <div>
                <div style={{ fontSize: 12, color: C.sub, marginBottom: 6 }}>Semester</div>
                <select
                  value={sem}
                  onChange={(e) => setSem(e.target.value)}
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
                  {["3rd", "4th", "5th", "6th", "7th", "8th"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => console.log("Apply Filters:", { dept, sem })}
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
        </div>
      </div>
    </div>
  );
}
