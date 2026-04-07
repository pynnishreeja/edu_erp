// Notices.jsx
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

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
};

/* ---------------- Helpers ---------------- */
const fmt = (n) => n.toLocaleString("en-IN");

const pillTone = (type, text) => {
  if (type === "priority") {
    if (text === "high") return { bg: C.danger, color: "#991b1b" };
    if (text === "medium") return { bg: C.warn, color: "#92400e" };
    return { bg: C.ok, color: "#065f46" };
  }
  return { bg: C.pill, color: "#3730a3" };
};

/* ---------------- Main ---------------- */
export default function Notices() {
  const [notices, setNotices] = useState([]);

  const [tab, setTab] = useState("All");
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");
  const [readFilter, setReadFilter] = useState("All");
  const [query, setQuery] = useState("");

  // ✅ Fetch notices from backend
  const fetchNotices = async () => {
    try {
      const res = await axios.get("http://localhost:8080/notices");

      // Convert backend → UI format
      const formatted = res.data.map((n) => ({
        id: n.id,
        title: n.title,
        body: n.content,
        category: "General",
        priority: "medium",
        pinned: false,
        read: false,
        attachments: [],
        author: "Admin",
        daysAgo: 0,
        views: 0,
        dept: "Administration",
      }));

      setNotices(formatted);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const stats = useMemo(() => {
    const total = notices.length;
    const unread = notices.filter((n) => !n.read).length;
    const urgent = notices.filter((n) => n.priority === "high").length;
    const pinned = notices.filter((n) => n.pinned).length;
    return { total, unread, urgent, pinned };
  }, [notices]);

  const list = useMemo(() => {
    let arr = [...notices];

    if (tab === "Pinned") arr = arr.filter((n) => n.pinned);
    else if (tab === "Unread") arr = arr.filter((n) => !n.read);

    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.body.toLowerCase().includes(q)
      );
    }

    return arr;
  }, [tab, notices, query]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Student Notices</h2>

      <input
        placeholder="Search notices..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div style={{ marginTop: 20 }}>
        {list.length === 0 ? (
          <p>No notices available</p>
        ) : (
          list.map((n) => (
            <div
              key={n.id}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                marginBottom: 10,
                borderRadius: 8,
              }}
            >
              <h4>{n.title}</h4>
              <p>{n.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}