import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

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
    <div className="min-h-screen bg-brand-bg flex items-center justify-center">
      <div className="bg-brand-white rounded-2xl shadow-[0_8px_32px_rgba(255,111,0,0.15)] p-10 max-w-sm w-full border-2 border-brand">
        <h1 className="text-brand-primary font-extrabold text-[2.2rem] mb-2 tracking-wide">
          Login
        </h1>
        <p className="text-brand-secondary mb-6 font-medium">
          Welcome back! Please sign in to continue.
        </p>

        {error && (
          <div className="text-brand-error mb-3 font-semibold">{error}</div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-[18px]">
          <input
            name="email"
            onChange={onChange}
            placeholder="Email"
            className="px-4 py-3.5 rounded-lg border-[1.5px] border-brand text-[16px] outline-none bg-brand-bg text-brand-text font-medium"
            autoComplete="email"
            required
          />
          <input
            name="password"
            type="password"
            onChange={onChange}
            placeholder="Password"
            className="px-4 py-3.5 rounded-lg border-[1.5px] border-brand text-[16px] outline-none bg-brand-bg text-brand-text font-medium"
            autoComplete="current-password"
            required
          />
          <button
            type="submit"
            className="bg-brand-primary text-white font-bold text-lg rounded-lg py-4 mt-2 shadow-[0_2px_8px_rgba(255,111,0,0.10)] cursor-pointer transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-[18px] text-center text-brand-text text-sm">
          Don&apos;t have an account?{" "}
          <span
            className="text-brand-primary font-semibold cursor-pointer underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
}
