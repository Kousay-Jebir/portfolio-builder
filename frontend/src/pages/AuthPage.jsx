import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function AuthPage() {
    const { handleLogin } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleLogin(form);
            navigate('/builder');
        } catch (err) {
            setError('Invalid credentials');
        }
    };
    console.log(user)

    useEffect(() => {
        if (user) {
            navigate('/builder')
        }
    }, [])


    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl mb-4">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={onSubmit} className="space-y-4">
                <input name="email" onChange={onChange} placeholder="Email" className="w-full border p-2" />
                <input name="password" type="password" onChange={onChange} placeholder="Password" className="w-full border p-2" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
            </form>
        </div>
    );
}
