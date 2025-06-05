import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { orangePalette } from "./orangePalette";

export default function AuthPage() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(form);
      navigate("/builder");
    } catch (err) {
      setError("Invalid credentials");
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
          Login
        </h1>
        <p
          style={{
            color: orangePalette.secondary,
            marginBottom: 24,
            fontWeight: 500,
          }}
        >
          Welcome back! Please sign in to continue.
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
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <input
            name="email"
            onChange={onChange}
            placeholder="Email"
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
            onChange={onChange}
            placeholder="Password"
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
            autoComplete="current-password"
            required
          />
          <button
            type="submit"
            style={{
              background: orangePalette.primary,
              color: orangePalette.white,
              fontWeight: 700,
              fontSize: 18,
              border: "none",
              borderRadius: 8,
              padding: "1rem",
              marginTop: 8,
              boxShadow: "0 2px 8px rgba(255, 111, 0, 0.10)",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Login
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
          Don't have an account?{" "}
          <span
            style={{
              color: orangePalette.primary,
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
}
