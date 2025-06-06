import { getCv } from "@/api/builder/cv";
import { downloadFile, openFile } from "@/api/main/file";
import { motion } from "framer-motion";
import { Download, Eye, FileText, CheckCircle } from "lucide-react";

export default function ResumeReadyPage() {
  const handleDownload =async () => {
    console.log("Downloading resume...");
    const cvName=await getCv()
    if(!cvName){alert('there is no cv to view for this user')}
    return await downloadFile(cvName)


  };

  const handleView =async () => {
    console.log("Viewing resume...");
    const cvName=await getCv()
    if(!cvName){alert('there is no cv to view for this user')}
    return await openFile(cvName)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffbc8d] to-[#ff8c44] p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-orange-300"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <CheckCircle className="w-12 h-12 text-white mb-3" />
            <h2 className="text-3xl font-bold text-white">
              Your Resume is Ready!
            </h2>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="p-8 flex flex-col items-center">
          {/* Success Illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 relative"
          >
            <div className="w-40 h-40 bg-orange-100 rounded-full flex items-center justify-center">
              <FileText className="w-20 h-20 text-orange-500" />

              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-400 rounded-full"></div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-orange-800 mb-8 text-lg"
          >
            Your professional resume has been successfully generated. You can
            now download it or view it directly in your browser.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleView}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 min-w-[200px]"
            >
              <Eye className="w-5 h-5" />
              View Resume
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 min-w-[200px]"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </motion.button>
          </motion.div>

          {/* Additional Options */}
          <motion.div
            className="mt-8 text-center text-sm text-orange-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="mb-2">Need to make changes?</p>
            <button className="text-orange-500 hover:text-orange-700 underline">
              Regenerate with different options
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
