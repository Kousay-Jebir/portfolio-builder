import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackToMainArrow() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/main")}
      className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-white/90 hover:bg-brand-bg border border-brand-border shadow-lg rounded-full px-3 py-2 text-brand-primary font-bold text-lg transition-all duration-200"
      title="Back to Main Page"
      type="button"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="hidden sm:inline">Main</span>
    </button>
  );
}
