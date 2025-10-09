// Sidebar.jsx (order updated)
import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";

const C = {
  text: "#0f172a",
  sub: "#64748b",
  border: "#e5e7eb",
  bg: "#ffffff",
  rail: "#f8fafc",
  grad: "linear-gradient(90deg,#5956e9 0%, #14b8a6 100%)",
};

const NAV = [
  { to: "/", label: "Dashboard", icon: "▦" },
  { to: "/attendance", label: "Attendance", icon: "🗓" },
  { to: "/marks", label: "Marks", icon: "🎯" },
  { to: "/fees", label: "Fees", icon: "💳" },
  { to: "/timetable", label: "Timetable", icon: "⏱" },
  { to: "/notices", label: "Notices", icon: "💬" },
  { to: "/profile", label: "Profile", icon: "👤" },
  { to: "/assignments", label: "Assignments", icon: "📝" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const width = useMemo(() => (collapsed ? 72 : 260), [collapsed]);

  const Item = ({ to, icon, label }) => (
    <NavLink
      to={to}
      end
      style={({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        margin: "6px 10px",
        borderRadius: 12,
        color: isActive ? "#ffffff" : C.text,
        textDecoration: "none",
        fontWeight: 600,
        background: isActive ? C.grad : "transparent",
        boxShadow: isActive ? "0 8px 22px rgba(20,184,166,.28)" : "none",
        transition: "background .15s ease, box-shadow .15s ease",
      })}
      className="sidebar-link"
      onClick={() => setMobileOpen(false)}
    >
      <span style={{ fontSize: 18, width: 22, textAlign: "center", opacity: 0.9 }}>{icon}</span>
      {!collapsed && <span style={{ letterSpacing: 0.2 }}>{label}</span>}
    </NavLink>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen((v) => !v)}
        style={{
          position: "fixed",
          top: 14,
          left: 14,
          zIndex: 1100,
          padding: "8px 10px",
          borderRadius: 10,
          border: `1px solid ${C.border}`,
          background: C.bg,
          boxShadow: "0 6px 14px rgba(15,23,42,.08)",
        }}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <button
        onClick={() => setCollapsed((v) => !v)}
        style={{
          position: "fixed",
          top: 14,
          left: width + 14,
          zIndex: 1100,
          padding: "8px 10px",
          borderRadius: 10,
          border: `1px solid ${C.border}`,
          background: C.bg,
          boxShadow: "0 6px 14px rgba(15,23,42,.08)",
          transition: "left .2s ease",
        }}
        aria-label="Collapse sidebar"
      >
        {collapsed ? "➡" : "⬅"}
      </button>

      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width,
          transition: "width .2s ease, transform .2s ease",
          background: C.bg,
          borderRight: `1px solid ${C.border}`,
          boxShadow: "0 10px 24px rgba(15,23,42,.06)",
          zIndex: 1050,
          transform: mobileOpen ? "translateX(0)" : "translateX(0)",
        }}
        className={mobileOpen ? "sidebar-open" : "sidebar-closed"}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "18px 16px 12px",
            borderBottom: `1px solid ${C.border}`,
            background: C.rail,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: C.grad,
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontWeight: 900,
            }}
          >
            🎓
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontWeight: 800, color: C.text, lineHeight: 1 }}>College ERP</div>
              <div style={{ fontSize: 12, color: C.sub, marginTop: 2 }}>Student Portal</div>
            </div>
          )}
        </div>

        <nav style={{ paddingTop: 6 }}>
          {NAV.map((n) => (
            <Item key={n.to} {...n} />
          ))}
        </nav>

        {!collapsed && (
          <div style={{ position: "absolute", bottom: 12, left: 12, right: 12, color: C.sub, fontSize: 12 }}>
            Press the arrow to collapse
          </div>
        )}
      </aside>

      <style>{`
        .sidebar-link:hover { background: rgba(20,184,166,.08); }
        @media (max-width: 1024px) {
          aside.sidebar-closed { transform: translateX(-100%); }
          aside.sidebar-open { transform: translateX(0); }
        }
        body { margin-left: ${width}px; transition: margin-left .2s ease; }
        @media (max-width: 1024px) { body { margin-left: 0; } }
      `}</style>
    </>
  );
}
