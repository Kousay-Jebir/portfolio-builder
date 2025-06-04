import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import AuthPage from './pages/AuthPage';
import BuilderPage from '@/pages/BuilderPage';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route
            path="/builder"
            element={
              <PrivateRoute>
                <BuilderPage />
              </PrivateRoute>
            }
          />
          {/* Add more routes here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}
