import { ActionCards } from "@/components/main-page/actionCards";
import { Navbar } from "@/components/main-page/navbar";
import { RecentlyViewed } from "@/components/main-page/recentlyViewed";
import { SuggestedProfiles } from "@/components/main-page/suggestedProfiles";
import { motion } from "framer-motion";
export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20">
      <Navbar />

      <main className="flex-1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-orange-100/20 blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-orange-200/10 blur-3xl"></div>
        </div>

        <div className="container relative py-8 px-4 max-w-7xl mx-auto">
          {/* Welcome section with centered content */}
          <section className="mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex flex-col items-center"
            >
              <h1 className="text-4xl font-bold tracking-tight mb-3 text-orange-900">
                Welcome To ProFolio!
              </h1>
              <p className="text-lg text-black max-w-2xl">
                Ready to build your next amazing resume or portfolio? Let's make
                your profile shine!
              </p>
              <div className="mt-4 h-1 w-24 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
            </motion.div>
          </section>

          <div className="max-w-6xl mx-auto">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-12"
            >
              <ActionCards />
            </motion.section>

            {/* Suggested profiles with theme-consistent styling */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-12"
            >
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-semibold text-orange-900 inline-flex items-center gap-2 justify-center">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                    Recommended
                  </span>
                  Profiles You Might Like
                </h2>
              </div>
              <SuggestedProfiles />
            </motion.section>

            {/* Recently viewed with enhanced header */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-0.5 bg-orange-300"></div>
                <h2 className="text-xl font-medium text-orange-800 text-center">
                  Your Recently Viewed
                </h2>
                <div className="w-8 h-0.5 bg-orange-300"></div>
              </div>
              <RecentlyViewed />
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
}
