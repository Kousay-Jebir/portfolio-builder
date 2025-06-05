import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50/30 bg-gradient-to-br from-brand-primary to-brand-secondary p-4 overflow-hidden relative">
      {/* Subtle orange-tinted background elements */}
      <motion.div
        className="absolute top-20 left-20 w-40 h-40 rounded-full bg-orange-100/20 blur-xl"
        animate={{
          x: [0, 20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-orange-50/15 blur-xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center bg-white/90 rounded-3xl shadow-2xl px-10 py-16 border border-white/20 max-w-xl w-full relative overflow-hidden backdrop-blur-sm"
      >
        {/* Glitter effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-brand-secondary/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Sparkles size={16} />
            </motion.div>
          ))}
        </div>

        {/* Animated logo */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-brand-primary drop-shadow-lg mb-4 tracking-tight">
            Pro<span className="text-brand-secondary">Folio</span>
          </h1>
        </motion.div>

        {/* Tagline with animated underline */}
        <div className="relative mb-8">
          <p className="text-lg md:text-xl text-brand-text font-medium text-center max-w-md relative z-10">
            Welcome to{" "}
            <span className="font-bold text-brand-primary">ProFolio</span> — the
            modern way to build, manage, and showcase your professional
            portfolio.
          </p>
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-brand-secondary/30 w-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          />
        </div>

        {/* Interactive buttons */}
        <div className="flex gap-4 mt-2 w-full justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all duration-200 group"
            onClick={() => navigate("/register")}
          >
            <span className="relative z-10">Get Started</span>
            <motion.span
              className="absolute inset-0 bg-white/10 rounded-lg"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden bg-white border border-brand-primary text-brand-primary font-bold py-3 px-8 rounded-lg text-lg shadow-md hover:bg-brand-bg transition-all duration-200 group"
            onClick={() => navigate("/login")}
          >
            <span className="relative z-10">Login</span>
            <motion.span
              className="absolute inset-0 bg-brand-primary/5 rounded-lg"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-brand-secondary/10 blur-md" />
        <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-brand-primary/10 blur-md" />
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-brand-text/70 text-sm text-center"
      >
        &copy; {new Date().getFullYear()} ProFolio. All rights reserved.
      </motion.footer>
    </div>
  );
}
