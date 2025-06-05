import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { orangePalette } from "./orangePalette";
import { loginWithGoogle } from "@/api/main/auth";

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

  const connectWithGoogle=async()=>{
    // await loginWithGoogle()
    // console.log('google')
    window.location.href='http://localhost:5000/main/auth/google'
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: orangePalette.secondary,
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
          Login
        </h1>
        <p
          style={{
            color: orangePalette.accent,
            marginBottom: 24,
            fontWeight: 500,
            textAlign: "center",
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
              background: orangePalette.white,
              borderRadius: 8,
              padding: "0.5rem 1rem",
              boxShadow: "0 1px 4px rgba(216, 67, 21, 0.08)",
            }}
          >
            {error}
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
            name="email"
            onChange={onChange}
            placeholder="Email"
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
            onChange={onChange}
            placeholder="Password"
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
            autoComplete="current-password"
            required
          />
          <button
            type="submit"
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
              cursor: "pointer",
              letterSpacing: 1,
              transition: "background 0.2s, color 0.2s",
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={connectWithGoogle}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              background: "#fff",
              color: orangePalette.text,
              fontWeight: 700,
              fontSize: 17,
              border: `1.5px solid ${orangePalette.accent}`,
              borderRadius: 10,
              padding: "0.9rem 1rem",
              marginTop: 8,
              boxShadow: "0 2px 8px rgba(255, 167, 38, 0.10)",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 48 48"
              style={{ display: "inline", marginRight: 6 }}
            >
              <g>
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.91 2.09 30.28 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.98 6.2C12.13 13.09 17.62 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.04l7.19 5.59C43.93 37.13 46.1 31.3 46.1 24.55z"
                />
                <path
                  fill="#FBBC05"
                  d="M9.67 28.65c-1.09-3.22-1.09-6.7 0-9.92l-7.98-6.2C-1.06 17.09-1.06 30.91 1.69 38.56l7.98-6.2z"
                />
                <path
                  fill="#EA4335"
                  d="M24 46c6.28 0 11.91-2.09 16.04-5.71l-7.19-5.59c-2.01 1.35-4.6 2.15-7.85 2.15-6.38 0-11.87-3.59-14.33-8.79l-7.98 6.2C6.73 42.52 14.82 48 24 48z"
                />
              </g>
            </svg>
            Login with Google
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
          Don't have an account?{" "}
          <span
            style={{
              color: orangePalette.accent,
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "underline",
              marginLeft: 2,
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
