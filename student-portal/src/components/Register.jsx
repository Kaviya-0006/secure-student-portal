import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const role = localStorage.getItem("selectedRole") || "student";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      return setError("⚠️ All fields are required");
    }

    setLoading(true);

    const endpoint =
      role === "student"
        ? "/api/student/auth/register"
        : "/api/faculty/auth/register";

    try {
      await apiRequest(endpoint, "POST", form);
      alert("🎉 Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0d1b2a, #1b263b)",
        padding: 20,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(15px)",
          borderRadius: 20,
          padding: "50px 40px",
          width: 400,
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          textAlign: "center",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <h2 style={{ marginBottom: 10, fontSize: "2rem" }}>
          {role === "student" ? "Student" : "Faculty"} Registration
        </h2>
        <p
          style={{
            color: role === "student" ? "#4a90e2" : "#e27d60",
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Role: {role.toUpperCase()}
        </p>

        <GlassInput
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <GlassInput
          placeholder="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <GlassInput
          placeholder="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 20,
            padding: "12px 0",
            width: "100%",
            borderRadius: 12,
            border: "none",
            background: loading
              ? "rgba(74,144,226,0.5)"
              : "linear-gradient(90deg, #4a90e2, #50e3c2)",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 15px rgba(74,144,226,0.5)",
            transition: "all 0.3s",
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Link to login */}
        <p style={{ marginTop: 10, fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#4a90e2", fontWeight: "bold" }}>
            Login
          </Link>
        </p>

        {error && (
          <p style={{ color: "#ff6b6b", fontWeight: "bold", marginTop: 10 }}>{error}</p>
        )}
      </form>
    </div>
  );
}

function GlassInput({ placeholder, type = "text", name, value, onChange }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      style={{
        padding: "12px 15px",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.3)",
        background: "rgba(255,255,255,0.1)",
        color: "#fff",
        outline: "none",
        fontSize: "1rem",
        backdropFilter: "blur(5px)",
        transition: "all 0.3s",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#4a90e2";
        e.currentTarget.style.boxShadow = "0 0 10px rgba(98, 160, 222, 0.5)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  );
}
