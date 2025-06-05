import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import AuthPage from "./pages/auth-pages/AuthPage";
import BuilderPage from "@/pages/BuilderPage";
import PrivateRoute from "./components/PrivateRoute";

import CvHomePage from "./pages/cv/CvHomePage";
import QuestionsPage from "./pages/cv/QuestionsPage";
import CvGenerationLayout from "./pages/cv/CvGenerationLayout";

import useAutoSave from "./hooks/useAutoSave";
import { useEditor } from "@craftjs/core";
import { preparePortfolioSave } from "./components/builder/layout/Topbar";
import useExitPrompt from "./hooks/useExitPrompt";
import SubscriptionPage from "./pages/subscription/SubscriptionPage";
import PaymentSuccessPage from "./pages/subscription/PaymentSuccessPage";
import RegisterPage from "./pages/auth-pages/RegisterPage";

import WelcomePage from "./pages/auth-pages/WelcomePage";

import GoogleRedirect from "./pages/GoogleRedirect";
import NotLoggedInRoutes from "./context/notLoggedInRoutes";
import LoadingPage from "./pages/LoadingPage";
import NotificationsProvider from "./context/notificationContext";

export default function App() {
  /* useAutoSave(() => {
    console.log("helo")
    navigator.sendBeacon('http://localhost:5001/builder/save', { code: 'test-code', content: preparePortfolioSave() });
  }); */
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<NotLoggedInRoutes />}>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/google-redirect" element={<GoogleRedirect />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
          </Route>
          <NotificationsProvider>
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
            <Route path="/loading-resume" element={<LoadingPage />} />
            <Route
              path="/loading-analyzing"
              element={<LoadingPage text="Analyzing Your Portfolio" />}
            />
            <Route path="*" element={<p>404</p>} />
          </NotificationsProvider>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
