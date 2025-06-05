import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPortfoliosUrls } from "@/api/consulting/consult";
import { getCvQuestions } from "@/api/builder/cv";

const CvHomePage = () => {
  const navigate = useNavigate();
  const [portfolioUrls, setPortfolioUrls] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

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
      const q = await getCvQuestions(selectedPortfolio);
      setQuestions(q);
      if (q && q.length > 0) {
        navigate('/cv-generation/questions', { state: { questions: q } });
      } else {
        alert("No questions found for the selected portfolio.");
      }
    } catch (err) {
      console.error("Error fetching questions", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Uploaded: ${file.name}`);
      // You can now read the file or send it to your server.
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 flex flex-col gap-6 items-center">
      <h2 className="text-3xl font-bold mb-6 text-center">Welcome to CV Generation</h2>

      <label className="font-semibold">Select Portfolio:</label>
      <select
        value={selectedPortfolio}
        onChange={(e) => setSelectedPortfolio(e.target.value)}
        className="border p-2 w-full max-w-md rounded"
      >
        <option value="">-- Select a portfolio --</option>
        {portfolioUrls.map((p, idx) => (
          <option key={idx} value={p.id}>
            {p.url}
          </option>
        ))}
      </select>

      <div className="flex flex-col sm:flex-row gap-6 mt-6">
        <button
          onClick={handleFetchQuestions}
          disabled={loading}
          className="bg-blue-600 text-white text-xl px-6 py-4 rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? 'Loading...' : 'Generate with AI'}
        </button>

        <button
          onClick={() => setShowUpload(true)}
          className="bg-green-600 text-white text-xl px-6 py-4 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Upload CV
        </button>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 max-w-md text-center">
            <h3 className="text-xl font-semibold mb-4">Upload Your CV</h3>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="block w-full mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowUpload(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CvHomePage;
