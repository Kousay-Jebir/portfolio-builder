import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { register } from '@/api/main/auth';

export default function RegisterPage() {
    const { handleLogin } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await register(form);
            await handleLogin({ email: form.email, password: form.password });
            navigate('/builder');
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl mb-4">Register</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={onSubmit} className="space-y-4">
                <input
                    name="username"
                    value={form.username}
                    onChange={onChange}
                    placeholder="Username"
                    className="w-full border p-2"
                    required
                />
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="Email"
                    className="w-full border p-2"
                    required
                />
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={onChange}
                    placeholder="Password"
                    className="w-full border p-2"
                    required
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2">Register</button>
            </form>
        </div>
    );
}
