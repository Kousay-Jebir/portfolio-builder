import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "@/api/main/auth";

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
    <div className="min-h-screen bg-brand-bg flex items-center justify-center">
      <div className="bg-brand-white rounded-2xl shadow-xl border-2 border-brand p-10 max-w-sm w-full">
        <h1 className="text-brand-primary font-extrabold text-3xl mb-2 tracking-wide">
          Create Account
        </h1>
        <p className="text-brand-secondary mb-6 font-medium">
          Join us and build your portfolio!
        </p>

        {error && (
          <div className="text-brand-error mb-3 font-semibold">{error}</div>
        )}

        {success && (
          <div className="text-brand-primary mb-3 font-semibold">
            Registration successful! Redirecting...
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={onChange}
            className="px-4 py-3 rounded-lg border-[1.5px] border-brand bg-brand-bg text-brand-text font-medium text-base outline-none"
            autoComplete="username"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            className="px-4 py-3 rounded-lg border-[1.5px] border-brand bg-brand-bg text-brand-text font-medium text-base outline-none"
            autoComplete="email"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            className="px-4 py-3 rounded-lg border-[1.5px] border-brand bg-brand-bg text-brand-text font-medium text-base outline-none"
            autoComplete="new-password"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`mt-2 py-4 rounded-lg text-white font-bold text-lg shadow-md transition ${
              loading
                ? "bg-brand-secondary cursor-not-allowed"
                : "bg-brand-primary hover:opacity-90 cursor-pointer"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-5 text-center text-brand-text text-sm">
          Already have an account?{" "}
          <span
            className="text-brand-primary font-semibold underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
