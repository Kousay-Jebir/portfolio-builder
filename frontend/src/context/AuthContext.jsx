import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { login } from '@/api/main/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => Cookies.get('auth-token') || null);
    const [loading, setLoading] = useState(true);

    const handleLogin = async (credentials) => {
        const res = await login(credentials);
        const { access_token } = res;

        let decoded;
        try {
            decoded = jwtDecode(access_token);
        } catch (err) {
            console.error('Invalid JWT:', err);
            return;
        }


        const expSeconds = decoded.exp;
        const expirationDate = new Date(expSeconds * 1000);
        if (expirationDate <= new Date()) {
            console.error('Token is already expired.');
            return;
        }

        setToken(access_token);
        setUser(decoded);
        Cookies.set('auth-token', access_token, { expires: expirationDate });
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        Cookies.remove('auth-token');
    };

    useEffect(() => {
        const cookieToken = Cookies.get('auth-token');
        if (cookieToken) {
            try {
                const decoded = jwtDecode(cookieToken);
                const nowSeconds = Date.now() / 1000;
                if (decoded.exp && decoded.exp < nowSeconds) {
                    setUser(null);
                    setToken(null);
                    Cookies.remove('auth-token');
                } else {
                    setUser(decoded);
                    setToken(cookieToken);
                }
            } catch (e) {
                setUser(null);
                setToken(null);
                Cookies.remove('auth-token');
            }
        }
        setLoading(false);
    }, []);

    if (loading) return <p>Loading authentication…</p>;

    return (
        <AuthContext.Provider value={{ user, token, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
