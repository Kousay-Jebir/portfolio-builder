import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

export default function NotLoggedInRoutes() {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTeams = async () => {
      if (auth.token) {
        navigate("/builder");
      }
    };

    fetchTeams();
  }, [auth.isLoggedIn]);

  return <Outlet />;
}
