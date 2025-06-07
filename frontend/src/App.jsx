import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

import AuthPage from "./pages/auth-pages/AuthPage";
import BuilderPage from "@/pages/BuilderPage";
import PrivateRoute from "./components/PrivateRoute";

import CvHomePage from "./pages/cv/CvHomePage";
import QuestionsPage from "./pages/cv/QuestionsPage";
import CvGenerationLayout from "./pages/cv/CvGenerationLayout";

import SubscriptionPage from "./pages/subscription/SubscriptionPage";
import PaymentSuccessPage from "./pages/subscription/PaymentSuccessPage";
import RegisterPage from "./pages/auth-pages/RegisterPage";
import WelcomePage from "./pages/auth-pages/WelcomePage";
import GoogleRedirect from "./pages/GoogleRedirect";
import NotLoggedInRoutes from "./context/notLoggedInRoutes";
import LoadingPage from "./pages/LoadingPage";

import ProtectedRoutesLayout from "./context/ProtectedRoutesLayout";

import DashboardPage from "./pages/mainPage";

import ResumeReadyPage from "./pages/cv/cvReadyPage";
import { CreateProfileForm } from "./pages/profile/profileForm";
import ProfilePage from "./pages/profile/profilePage";
import PortfolioConsultPage from "./pages/PortfolioConsultPage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<NotLoggedInRoutes />}>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/google-redirect" element={<GoogleRedirect />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
          </Route>

          {/* Protected Routes with Notifications and Toaster */}
          <Route element={<ProtectedRoutesLayout />}>
            <Route
              path="/builder"
              element={
                <PrivateRoute>
                  <BuilderPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile-form"
              element={
                <PrivateRoute>
                  <CreateProfileForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
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

            <Route
              path="/main"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/resume-ready"
              element={
                <PrivateRoute>
                  <ResumeReadyPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/portfolio/:id"
              element={
                <PrivateRoute>
                  <PortfolioConsultPage />
                </PrivateRoute>
              }
            />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<p>404</p>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
