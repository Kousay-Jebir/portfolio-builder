import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import AuthPage from './pages/AuthPage';
import BuilderPage from '@/pages/BuilderPage';
import PrivateRoute from './components/PrivateRoute';
import CvHomePage from './components/cv/CvHomePage';
import QuestionsPage from './components/cv/QuestionsPage';
import CvGenerationLayout from './components/cv/CvGenerationLayout';

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
             <Route
            path="/cv-generation"
            element={
              <PrivateRoute>
                <CvGenerationLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<CvHomePage />} />
            <Route path="questions" element={<QuestionsPage />} />
          </Route>
          <Route path='*' element={<p>404</p>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
