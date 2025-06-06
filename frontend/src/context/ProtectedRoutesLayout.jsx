// src/layouts/ProtectedRoutesLayout.jsx
import NotificationsProvider from "@/context/notificationContext";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export default function ProtectedRoutesLayout() {
  return (
    <NotificationsProvider>
      <Toaster />
      <Outlet />
    </NotificationsProvider>
  );
}
