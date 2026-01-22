import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../api/api";

export default function StudentDashboard() {
  const { token, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [academics, setAcademics] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const prof = await apiRequest("/api/student/profile", "GET", null, token);
        const records = await apiRequest("/api/student/academics", "GET", null, token);
        setProfile(prof);
        setAcademics(records);
      } catch (err) {
        console.error(err);
        logout();
      }
    }
    fetchData();
  }, [token]);

  // Helper to determine progress bar color
  const getGPAColor = (gpa) => {
    if (gpa >= 9) return "#4caf50"; // green
    if (gpa >= 7) return "#ff9800"; // orange
    return "#f44336"; // red
  };

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
        <h1 style={{ fontSize: "2rem" }}>Welcome, {profile.name || "Student"}</h1>
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

      {/* Academics Section */}
      <h2 style={{ marginBottom: 20 }}>Academics</h2>
      <div style={{ display: "grid", gap: 25, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        {academics.length === 0 && <p>No academic records available.</p>}

        {academics.map((rec) => (
          <div
            key={rec._id}
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
            <div
              style={{
                background: "#4a90e2",
                padding: "10px 15px",
                borderRadius: 12,
                marginBottom: 15,
                display: "inline-block",
                fontWeight: "bold",
              }}
            >
              Semester {rec.semester}
            </div>

            {/* GPA / CGPA Bars */}
            <div style={{ marginBottom: 15 }}>
              <p style={{ marginBottom: 5 }}>GPA: {rec.gpa?.toFixed(2)}</p>
              <div
                style={{
                  height: 12,
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.2)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${(rec.gpa / 10) * 100}%`,
                    height: "100%",
                    background: getGPAColor(rec.gpa),
                    borderRadius: 6,
                    transition: "width 0.5s",
                  }}
                />
              </div>
              <p style={{ marginTop: 5 }}>CGPA: {rec.cgpa?.toFixed(2)}</p>
            </div>

            {/* Subjects */}
            <ul style={{ paddingLeft: 20 }}>
              {rec.subjects.map((s) => (
                <li
                  key={s.course}
                  style={{
                    marginBottom: 8,
                    padding: "5px 10px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 8,
                  }}
                >
                  <strong>{s.course}</strong>: Marks {s.marks}, Grade {s.grade}, Attendance {s.attendance}%
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
