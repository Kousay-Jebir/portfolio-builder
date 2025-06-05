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
      await register(form);
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
        background: orangePalette.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: orangePalette.white,
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(255, 111, 0, 0.15)",
          padding: "2.5rem 2rem",
          maxWidth: 400,
          width: "100%",
          border: `2px solid ${orangePalette.border}`,
        }}
      >
        <h1
          style={{
            color: orangePalette.primary,
            fontWeight: 800,
            fontSize: "2.2rem",
            marginBottom: 8,
            letterSpacing: 1,
          }}
        >
          Create Account
        </h1>
        <p
          style={{
            color: orangePalette.secondary,
            marginBottom: 24,
            fontWeight: 500,
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
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              color: orangePalette.primary,
              marginBottom: 12,
              fontWeight: 600,
            }}
          >
            Registration successful! Redirecting...
          </div>
        )}
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={onChange}
            style={{
              padding: "0.9rem 1rem",
              borderRadius: 8,
              border: `1.5px solid ${orangePalette.border}`,
              fontSize: 16,
              outline: "none",
              background: orangePalette.background,
              color: orangePalette.text,
              fontWeight: 500,
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
              borderRadius: 8,
              border: `1.5px solid ${orangePalette.border}`,
              fontSize: 16,
              outline: "none",
              background: orangePalette.background,
              color: orangePalette.text,
              fontWeight: 500,
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
              borderRadius: 8,
              border: `1.5px solid ${orangePalette.border}`,
              fontSize: 16,
              outline: "none",
              background: orangePalette.background,
              color: orangePalette.text,
              fontWeight: 500,
            }}
            autoComplete="new-password"
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading
                ? orangePalette.secondary
                : orangePalette.primary,
              color: orangePalette.white,
              fontWeight: 700,
              fontSize: 18,
              border: "none",
              borderRadius: 8,
              padding: "1rem",
              marginTop: 8,
              boxShadow: "0 2px 8px rgba(255, 111, 0, 0.10)",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div
          style={{
            marginTop: 18,
            textAlign: "center",
            color: orangePalette.text,
            fontSize: 15,
          }}
        >
          Already have an account?{" "}
          <span
            style={{
              color: orangePalette.primary,
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "underline",
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
