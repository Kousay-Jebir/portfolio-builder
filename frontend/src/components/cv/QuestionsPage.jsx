import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const QuestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questionsData = location.state?.questions;

  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { section: { question: answer } }

  useEffect(() => {
    if (!questionsData) {
      navigate('/cv-generation'); // Redirect if accessed directly
    }
  }, [questionsData, navigate]);

  if (!questionsData) return null;

  const currentSection = questionsData[sectionIndex];

  const handleChange = (questionIndex, value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentSection.section]: {
        ...(prev[currentSection.section] || {}),
        [questionIndex]: value,
      },
    }));
  };

  const handleNext = () => {
    if (sectionIndex < questionsData.length - 1) {
      setSectionIndex((prev) => prev + 1);
    } else {
      console.log('Final answers:', answers);
      // Submit answers or navigate to summary
      navigate('/cv-generation'); // or to a "review" page
    }
  };

  return (
    <div>
      <h2>{currentSection.section.toUpperCase()} Questions</h2>
      <form className="space-y-4">
        {currentSection.questions.map((q, idx) => (
          <div key={idx}>
            <label className="block font-semibold">{q}</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={answers[currentSection.section]?.[idx] || ''}
              onChange={(e) => handleChange(idx, e.target.value)}
            />
          </div>
        ))}
      </form>
      <button
        onClick={handleNext}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {sectionIndex < questionsData.length - 1 ? 'Next Section' : 'Finish'}
      </button>
    </div>
  );
};

export default QuestionsPage;
