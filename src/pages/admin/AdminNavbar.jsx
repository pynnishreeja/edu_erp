export default function AdminNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "10px", background: "#f1f5f9" }}>
      <h3>Welcome, {user?.name}</h3>
    </div>
  );
}