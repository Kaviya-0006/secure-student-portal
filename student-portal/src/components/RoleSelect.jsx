import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    localStorage.setItem("selectedRole", role);
    navigate("/register");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #0d1b2a, #1b263b)", // navy gradient
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          color: "#ffffff",
          fontSize: "2.5rem",
          marginBottom: "50px",
          fontWeight: "bold",
        }}
      >
        Select Your Role
      </h1>

      <div
        style={{
          display: "flex",
          gap: "60px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Student Card */}
        <div
          onClick={() => selectRole("student")}
          style={{
            cursor: "pointer",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "50px 40px",
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            transition: "transform 0.3s, box-shadow 0.3s",
            width: "250px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-10px)";
            e.currentTarget.style.boxShadow = "0 15px 50px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.3)";
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            width={100}
            style={{ marginBottom: "25px" }}
            alt="Student Icon"
          />
          <h3 style={{ marginBottom: "20px", color: "#fff", fontSize: "1.5rem" }}>
            Student
          </h3>
          <button
            style={{
              background: "#1a237e",
              color: "#fff",
              border: "none",
              padding: "12px 25px",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "all 0.3s",
              boxShadow: "0 4px 15px rgba(26,35,126,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#3949ab";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(57,73,171,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#1a237e";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(26,35,126,0.4)";
            }}
          >
            Select
          </button>
        </div>

        {/* Faculty Card */}
        <div
          onClick={() => selectRole("faculty")}
          style={{
            cursor: "pointer",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "50px 40px",
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            transition: "transform 0.3s, box-shadow 0.3s",
            width: "250px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-10px)";
            e.currentTarget.style.boxShadow = "0 15px 50px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.3)";
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
            width={100}
            style={{ marginBottom: "25px" }}
            alt="Faculty Icon"
          />
          <h3 style={{ marginBottom: "20px", color: "#fff", fontSize: "1.5rem" }}>
            Faculty
          </h3>
          <button
            style={{
              background: "#1a237e",
              color: "#fff",
              border: "none",
              padding: "12px 25px",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "all 0.3s",
              boxShadow: "0 4px 15px rgba(26,35,126,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#3949ab";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(57,73,171,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#1a237e";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(26,35,126,0.4)";
            }}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
