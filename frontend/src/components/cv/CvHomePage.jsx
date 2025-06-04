import { getCvQuestions } from "@/api/builder/cv";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserPortfoliosUrls } from "@/api/consulting/consult";

const CvHomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [portfolioUrls, setPortfolioUrls] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState('');

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const urls = await getUserPortfoliosUrls();
        setPortfolioUrls(urls);
      } catch (err) {
        console.error('Failed to fetch portfolio URLs', err);
      }
    };

    fetchUrls();
  }, []);

  const handleStart = async () => {
    if (!selectedPortfolio) {
      alert("Please select a portfolio first.");
      return;
    }

    setLoading(true);
    try {
      const questions = await getCvQuestions(selectedPortfolio);
      navigate('/cv-generation/questions', { state: { questions } });
    } catch (err) {
      console.error('Error fetching questions', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome to CV Generation</h2>

      <label className="block font-semibold mb-2">Select Portfolio:</label>
      <select
        value={selectedPortfolio}
        onChange={(e) => setSelectedPortfolio(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option value="">-- Select a portfolio --</option>
        {portfolioUrls.map((url, idx) => (
          <option key={idx} value={url}>
            {url}
          </option>
        ))}
      </select>

      <button
        onClick={handleStart}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Start Questions'}
      </button>
    </div>
  );
};

export default CvHomePage;
