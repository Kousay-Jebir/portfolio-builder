import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "@/api/main/auth";
import { orangePalette } from "./orangePalette";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: orangePalette.border,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.4s",
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${orangePalette.secondary} 0%, ${orangePalette.primary} 100%)`,
          borderRadius: 24,
          boxShadow: "0 8px 32px rgba(255, 111, 0, 0.18)",
          padding: "2.5rem 2rem",
          maxWidth: 420,
          width: "100%",
          border: `2.5px solid ${orangePalette.accent}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "box-shadow 0.3s, border 0.3s",
        }}
      >
        <h1
          style={{
            color: orangePalette.white,
            fontWeight: 900,
            fontSize: "2.3rem",
            marginBottom: 8,
            letterSpacing: 1,
            textShadow: "0 2px 8px rgba(255, 111, 0, 0.15)",
          }}
        >
          Create Account
        </h1>
        <p
          style={{
            color: orangePalette.white,
            marginBottom: 24,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          Join us and build your portfolio!
        </p>
        {error && (
          <div
            style={{
              color: orangePalette.error,
              marginBottom: 12,
              fontWeight: 600,
              background: orangePalette.white,
              borderRadius: 8,
              padding: "0.5rem 1rem",
              boxShadow: "0 1px 4px rgba(216, 67, 21, 0.08)",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              color: orangePalette.white,
              marginBottom: 12,
              fontWeight: 600,
              background: orangePalette.secondary,
              borderRadius: 8,
              padding: "0.5rem 1rem",
              boxShadow: "0 1px 4px rgba(255, 167, 38, 0.08)",
            }}
          >
            Registration successful! Redirecting...
          </div>
        )}
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: "100%",
          }}
        >
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={onChange}
            style={{
              padding: "0.9rem 1rem",
              borderRadius: 10,
              border: `1.5px solid ${orangePalette.accent}`,
              fontSize: 16,
              outline: "none",
              background: orangePalette.white,
              color: orangePalette.text,
              fontWeight: 500,
              boxShadow: "0 1px 4px rgba(255, 167, 38, 0.08)",
              transition: "border 0.2s, box-shadow 0.2s",
            }}
            autoComplete="username"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            style={{
              padding: "0.9rem 1rem",
              borderRadius: 10,
              border: `1.5px solid ${orangePalette.accent}`,
              fontSize: 16,
              outline: "none",
              background: orangePalette.white,
              color: orangePalette.text,
              fontWeight: 500,
              boxShadow: "0 1px 4px rgba(255, 167, 38, 0.08)",
              transition: "border 0.2s, box-shadow 0.2s",
            }}
            autoComplete="email"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            style={{
              padding: "0.9rem 1rem",
              borderRadius: 10,
              border: `1.5px solid ${orangePalette.accent}`,
              fontSize: 16,
              outline: "none",
              background: orangePalette.white,
              color: orangePalette.text,
              fontWeight: 500,
              boxShadow: "0 1px 4px rgba(255, 167, 38, 0.08)",
              transition: "border 0.2s, box-shadow 0.2s",
            }}
            autoComplete="new-password"
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              background: orangePalette.accent,
              color: orangePalette.white,
              fontWeight: 800,
              fontSize: 18,
              border: "none",
              borderRadius: 10,
              padding: "1rem",
              marginTop: 8,
              boxShadow: "0 2px 8px rgba(255, 111, 0, 0.10)",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: 1,
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div
          style={{
            marginTop: 18,
            textAlign: "center",
            color: orangePalette.white,
            fontSize: 15,
          }}
        >
          Already have an account?{" "}
          <span
            style={{
              color: orangePalette.accent,
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "underline",
              marginLeft: 2,
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
