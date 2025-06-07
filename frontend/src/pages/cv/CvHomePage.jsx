import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPortfoliosUrls } from "@/api/consulting/consult";

import { motion, AnimatePresence } from "framer-motion";
import { FileUp, Wand2, X, Upload, FileText, ChevronDown } from "lucide-react";

import { generateCv, getCvQuestions, uploadCv } from "@/api/builder/cv";
import LoadingPage from "../LoadingPage";
import BackToMainArrow from "@/components/BackToMainArrow";

const CvHomePage = () => {
  const navigate = useNavigate();
  const [portfolioUrls, setPortfolioUrls] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const urls = await getUserPortfoliosUrls();
        setPortfolioUrls(urls);
      } catch (err) {
        console.error("Failed to fetch portfolio URLs", err);
      }
    };

    fetchUrls();
  }, []);

  const handleFetchQuestions = async () => {
    if (!selectedPortfolio) {
      alert("Please select a portfolio first.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 30000));
      const q = await getCvQuestions(selectedPortfolio);
      setQuestions(q);
      if (q && q.length > 0) {
        navigate("/cv-generation/questions", {
          state: { questions: q, portfolioId: selectedPortfolio },
        });
      } else {
        // alert("No questions found for the selected portfolio.");
        const result = await generateCv(selectedPortfolio);
        console.log(result);
        navigate("/resume-ready");
      }
    } catch (err) {
      console.error("Error fetching questions", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please choose a file first.");
      return;
    }

    setUploading(true);
    try {
      const response = await uploadCv(selectedFile);
      console.log("Upload success:", response);
      // alert("CV uploaded successfully!");
      navigate("/resume-ready");

      setShowUpload(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("CV upload failed.");
    } finally {
      setUploading(false);
    }
  };
  if (loading) {
    return <LoadingPage text="Analyzing Your Portfolio" />;
  }
  return (
    <>
      <BackToMainArrow />
      <div className="min-h-screen bg-gradient-to-t from-[#ffbc8d] to-[#ff8c44] p-4 flex items-center justify-center">
        {" "}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-orange-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white flex items-center justify-center gap-3"
            >
              <FileText className="w-8 h-8" />
              Resume Generation Portal
            </motion.h2>
          </div>

          {/* Main Content */}
          <div className="p-8 flex flex-col gap-6 items-center">
            {/* Portfolio Selection */}
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
                <Wand2 className="w-5 h-5" />
                Select Portfolio:
              </label>
              <div className="relative">
                <select
                  value={selectedPortfolio}
                  onChange={(e) => setSelectedPortfolio(e.target.value)}
                  className="border border-orange-300 p-3 w-full rounded-lg bg-white text-orange-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none pr-10"
                >
                  <option value="">-- Select a portfolio --</option>
                  {portfolioUrls.map((p, idx) => (
                    <option key={idx} value={p.id}>
                      {p.url}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-orange-500 pointer-events-none" />
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleFetchQuestions}
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg px-6 py-3 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 transition-all duration-200 min-w-[200px]"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate with AI
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowUpload(true)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 min-w-[200px]"
              >
                <Upload className="w-5 h-5" />
                Upload CV
              </motion.button>
            </motion.div>
          </div>

          {/* Upload Modal */}
          <AnimatePresence>
            {showUpload && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-orange-200"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <FileUp className="w-5 h-5" />
                      Upload Your CV
                    </h3>
                    <button
                      onClick={() => setShowUpload(false)}
                      className="text-white hover:text-orange-200 transition"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center cursor-pointer bg-orange-50/50 mb-4"
                    >
                      <label className="flex flex-col items-center justify-center gap-2 cursor-pointer">
                        <Upload className="w-10 h-10 text-orange-500" />
                        <span className="text-orange-700 font-medium">
                          Click to select file
                        </span>
                        <span className="text-sm text-orange-600">
                          (PDF, DOC, DOCX)
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </motion.div>

                    <div className="flex justify-end gap-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setShowUpload(false)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleUpload}
                        disabled={uploading}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-md disabled:opacity-50 transition flex items-center gap-2"
                      >
                        {uploading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            Submit
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default CvHomePage;
