import { getCvQuestions } from "@/api/builder/cv";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';




const CvHomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      const questions = await getCvQuestions('6818926b145fbcabfeb5284c');
      navigate('/cv-generation/questions', { state: { questions } });
    } catch (err) {
      console.error('Error fetching questions', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Welcome to CV Generation</h2>
      <button onClick={handleStart} disabled={loading}>
        {loading ? 'Loading...' : 'Start Questions'}
      </button>
    </div>
  );
};

export default CvHomePage;