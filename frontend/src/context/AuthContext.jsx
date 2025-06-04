// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { login } from '@/api/main/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => Cookies.get('auth-token') || null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (credentials) => {
        const res = await login(credentials);
        const { access_token, data } = res;

        setUser(data);
        setToken(access_token);

        Cookies.set('auth-token', access_token);
        localStorage.setItem('user', JSON.stringify(data));
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        Cookies.remove('auth-token');
        localStorage.removeItem('user');
    };

    useEffect(() => {
        const cookieToken = Cookies.get('auth-token');
        const localUser = localStorage.getItem('user');

        if (cookieToken && localUser) {
            setToken(cookieToken);
            setUser(JSON.parse(localUser));
        } else {
            setUser(null);
            setToken(null);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, loading, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
