import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Rocket,
  Palette,
  Code,
  Share2,
  Eye,
  Users,
} from "lucide-react";

export default function WelcomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Beautiful Templates",
      description:
        "Choose from ProFolio's stunning, professionally designed templates.",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Easy Customization",
      description:
        "ProFolio requires no coding - customize everything with clicks.",
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "One-Click Sharing",
      description: "Share your ProFolio with potential employers instantly.",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Live Preview",
      description: "See your ProFolio changes in real-time as you build.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "ProFolio Community",
      description: "Get inspired by other professionals in our network.",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Blazing Fast",
      description: "ProFolio ensures your portfolio loads in milliseconds.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-orange-200/20"
              style={{
                width: `${100 + Math.random() * 200}px`,
                height: `${100 + Math.random() * 200}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 20 + Math.random() * 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        <div className="container mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              The modern portfolio builder
            </div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Welcome to <span className="text-orange-600">ProFolio</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Create a stunning professional portfolio in minutes with ProFolio.
              No design skills needed - just your amazing work.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started - Free
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-4 bg-white hover:bg-gray-50 text-orange-600 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Sign In
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ProFolio?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to build a portfolio that gets you noticed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-orange-50/50 hover:bg-orange-50 p-8 rounded-xl border border-orange-100 transition-all duration-300 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your ProFolio?
            </h2>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto mb-10">
              Join thousands of professionals who showcase their work with
              ProFolio.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-orange-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Create Your ProFolio Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-orange-900 text-orange-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold">ProFolio</h3>
              <p className="mt-2">
                The modern way to showcase your professional journey.
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-orange-800 text-center text-sm">
            &copy; {new Date().getFullYear()} ProFolio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
