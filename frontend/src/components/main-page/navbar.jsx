import { Rocket, FileText, User, Home, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getUserPortfoliosUrls } from "@/api/consulting/consult";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [portfolioId,setPortfolioId]=useState("")
  const navigate = useNavigate();
  const auth = useAuth();
const fetchPortfolio = async () => {
  const data = await getUserPortfoliosUrls();
  console.log(data);

  if (data && data.length > 0) {
    const latestPortfolio = data.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    )[0];

    setPortfolioId(latestPortfolio.id);
  } else {
    console.warn("No portfolio data found.");
  }
};

  useEffect(()=>{
    fetchPortfolio()
  },[])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-300 bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/main" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold bg-white/90 bg-clip-text text-transparent group-hover:opacity-90 transition-all">
            ProFolio
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className="gap-2 px-4 text-white hover:text-orange-100 hover:bg-white/10 transition-colors"
          >
            <Link to="/resume-ready">
              <FileText className="h-4 w-4" />
              <span className="relative">
                My Resume
                <span className="absolute -top-1 -right-3 w-2 h-2 bg-white rounded-full animate-ping"></span>
                <span className="absolute -top-1 -right-3 w-2 h-2 bg-white rounded-full"></span>
              </span>
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="gap-2 px-4 text-white hover:text-orange-100 hover:bg-white/10 transition-colors"
          >
            <Link to={`/portfolio/${portfolioId}`}>
              <Rocket className="h-4 w-4" />
              <span className="relative">
                My Portfolio
                <span className="absolute -top-1 -right-3 w-2 h-2 bg-white rounded-full animate-ping"></span>
                <span className="absolute -top-1 -right-3 w-2 h-2 bg-white rounded-full"></span>
              </span>
            </Link>
          </Button>

          <Button
            onClick={() => navigate("/profile")}
            variant="secondary"
            className="gap-2 ml-2 text-orange-600 bg-white hover:bg-orange-50 hover:text-orange-700 transition-colors border-none"
          >
            <User className="h-4 w-4" />
            Profile
          </Button>
          <Button
            onClick={() => navigate("/subscription")}
            variant="secondary"
            className="gap-2 ml-2 text-orange-600 bg-white hover:bg-orange-50 hover:text-orange-700 transition-colors border-none"
          >
            <Plus className="h-4 w-4" />
            subscribe
          </Button>
          <Button
            onClick={() => auth.handleLogout()}
            variant="secondary"
            className="gap-2 ml-2 text-orange-600 bg-white hover:bg-orange-50 hover:text-orange-700 transition-colors border-none"
          >
            <LogOut className="h-4 w-4" />
            logout
          </Button>
        </div>
      </div>
    </header>
  );
};
