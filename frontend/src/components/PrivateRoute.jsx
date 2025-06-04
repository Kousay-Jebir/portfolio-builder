import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <p>Loading...</p>;
    console.log(user)
    if (!user) return <Navigate to="/login" />;
    return children;
}
