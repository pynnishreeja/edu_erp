import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminNotices() {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchNotices = async () => {
    const res = await axios.get("http://localhost:8080/notices");
    setNotices(res.data);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const saveNotice = async () => {
    if (!title || !content) return;

    if (editId) {
      await axios.put(`http://localhost:8080/notices/${editId}`, { title, content });
      setEditId(null);
    } else {
      await axios.post("http://localhost:8080/notices", { title, content });
    }

    setTitle("");
    setContent("");
    fetchNotices();
  };

  const deleteNotice = async (id) => {
    await axios.delete(`http://localhost:8080/notices/${id}`);
    fetchNotices();
  };

  const editNotice = (n) => {
    setTitle(n.title);
    setContent(n.content);
    setEditId(n.id);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Notices</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />

      <button onClick={saveNotice}>
        {editId ? "Update" : "Add"} Notice
      </button>

      <ul>
        {notices.map((n) => (
          <li key={n.id}>
            {n.title} - {n.content}

            <button onClick={() => editNotice(n)}>Edit</button>
            <button onClick={() => deleteNotice(n.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}