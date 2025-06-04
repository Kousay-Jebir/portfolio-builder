import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import AuthPage from './pages/AuthPage';
import BuilderPage from '@/pages/BuilderPage';
import PrivateRoute from './components/PrivateRoute';

import CvHomePage from './components/cv/CvHomePage';
import QuestionsPage from './components/cv/QuestionsPage';
import CvGenerationLayout from './components/cv/CvGenerationLayout';

import useAutoSave from './hooks/useAutoSave';
import { useEditor } from '@craftjs/core';
import { preparePortfolioSave } from './components/builder/layout/Topbar';
import useExitPrompt from './hooks/useExitPrompt';
import SubscriptionPage from './components/subscription/SubscriptionPage';
import PaymentSuccessPage from './components/subscription/PaymentSuccessPage';


export default function App() {
  /* useAutoSave(() => {
    console.log("helo")
    navigator.sendBeacon('http://localhost:5001/builder/save', { code: 'test-code', content: preparePortfolioSave() });
  }); */
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
            <Route
            path="/subscription"
            element={
              <PrivateRoute>
                <SubscriptionPage />
              </PrivateRoute>
            }
          />
            <Route
            path="/payment_success"
            element={
              <PrivateRoute>
                <PaymentSuccessPage />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<p>404</p>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
