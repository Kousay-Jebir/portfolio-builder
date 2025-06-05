import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loading.json";

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF6F00] to-[#FFA040] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-[#FFD180]/60 rounded-full blur-md animate-sparkle"
            style={{
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 3}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Glass Card */}
      <div className="bg-[#FFF3E0] backdrop-blur-xl border border-[#FFB300]/40 shadow-2xl rounded-3xl px-8 py-10 max-w-md w-full flex flex-col items-center">
        <div className="w-52 h-52 mb-6">
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#FF6F00] text-center drop-shadow-lg">
          Launching Your Portfolio
        </h2>
        <p className="text-[#212121] mt-3 text-center text-base leading-relaxed">
          Hang tight — we’re preparing your awesome showcase. It won’t be long!
        </p>
      </div>

      {/* Sparkle animation */}
      <style>{`
        @keyframes sparkle {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
        }
        .animate-sparkle {
          animation: sparkle ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
