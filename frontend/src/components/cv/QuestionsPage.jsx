import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const QuestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questionsData = location.state?.questions;

  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // [{ section: '', answers: [['', ''], ['']] }]
  
  useEffect(() => {
    if (!questionsData) {
      navigate('/cv-generation');
    } else {
      const initialAnswers = questionsData.map((section) => ({
        section: section.section,
        answers: section.questions.map(() => ['']) // array of empty answers per question
      }));
      setAnswers(initialAnswers);
    }
  }, [questionsData, navigate]);

  if (!questionsData) return null;

  const currentSection = questionsData[sectionIndex];

  const handleInputChange = (qIdx, aIdx, value) => {
    const updated = [...answers];
    updated[sectionIndex].answers[qIdx][aIdx] = value;
    setAnswers(updated);
  };

  const addAnswerInput = (qIdx) => {
    const updated = [...answers];
    updated[sectionIndex].answers[qIdx].push('');
    setAnswers(updated);
  };

  const handleNext = () => {
    if (sectionIndex < questionsData.length - 1) {
      setSectionIndex((prev) => prev + 1);
    } else {
      console.log('Final answers:', answers);
      navigate('/cv-generation');
    }
  };

  const handlePrevious = () => {
    if (sectionIndex > 0) {
      setSectionIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {currentSection.section.toUpperCase()} Questions
      </h2>
      <form className="space-y-4">
        {currentSection.questions.map((q, qIdx) => (
          <div key={qIdx} className="mb-4">
            <label className="block font-semibold mb-1">{q}</label>
            {answers[sectionIndex]?.answers[qIdx]?.map((answer, aIdx) => (
              <div key={aIdx} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  className="border p-2 flex-1"
                  value={answer}
                  onChange={(e) =>
                    handleInputChange(qIdx, aIdx, e.target.value)
                  }
                />
                {aIdx === answers[sectionIndex].answers[qIdx].length - 1 && (
                  <button
                    type="button"
                    onClick={() => addAnswerInput(qIdx)}
                    className="bg-gray-300 hover:bg-gray-400 text-sm px-2 py-1 rounded"
                    title="Add another answer"
                  >
                    ➕
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </form>

      <div className="mt-6 flex justify-between">
        {sectionIndex > 0 && (
          <button
            onClick={handlePrevious}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Previous
          </button>
        )}
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {sectionIndex < questionsData.length - 1 ? 'Next Section' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default QuestionsPage;
