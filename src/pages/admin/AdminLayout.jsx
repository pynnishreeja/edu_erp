import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ flex: 1 }}>
        <AdminNavbar />
        <div style={{ padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}