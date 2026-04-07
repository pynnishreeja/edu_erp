import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:8080/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const saveStudent = async () => {
    if (!name || !email) return;

    if (editId) {
      await axios.put(`http://localhost:8080/students/${editId}`, { name, email });
      setEditId(null);
    } else {
      await axios.post("http://localhost:8080/students", { name, email });
    }

    setName("");
    setEmail("");
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:8080/students/${id}`);
    fetchStudents();
  };

  const editStudent = (s) => {
    setName(s.name);
    setEmail(s.email);
    setEditId(s.id);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Students</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

      <button onClick={saveStudent}>
        {editId ? "Update" : "Add"} Student
      </button>

      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} - {s.email}

            <button onClick={() => editStudent(s)}>Edit</button>
            <button onClick={() => deleteStudent(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}