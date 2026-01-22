import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../api/api";

export default function FacultyDashboard() {
  const { token, logout } = useContext(AuthContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await apiRequest("/api/faculty/assigned-students", "GET", null, token);
        setStudents(data.assignedStudents || []);
      } catch (err) {
        console.error(err);
        logout();
      }
    }
    fetchData();
  }, [token]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0d1b2a, #1b263b)",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#fff",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <h1 style={{ fontSize: "2rem" }}>Faculty Dashboard</h1>
        <button
          onClick={logout}
          style={{
            background: "#e74c3c",
            border: "none",
            borderRadius: 12,
            padding: "10px 20px",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#c0392b";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#e74c3c";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Logout
        </button>
      </div>

      {/* Assigned Students */}
      <h2 style={{ marginBottom: 20 }}>Assigned Students</h2>
      {students.length === 0 && <p>No students assigned yet.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {students.map((s) => (
          <div
            key={s._id}
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              borderRadius: 20,
              padding: 20,
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 15px 50px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.3)";
            }}
          >
            <h3 style={{ marginBottom: 10, color: "#4a90e2" }}>{s.name}</h3>
            <p style={{ marginBottom: 5 }}>
              <strong>Email:</strong> {s.email}
            </p>
            <p>
              <strong>Department:</strong> {s.department}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
