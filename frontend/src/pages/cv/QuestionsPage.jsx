import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { generateCv } from "@/api/builder/cv";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import LoadingPage from "../LoadingPage";
const QuestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questionsData = location.state?.questions;
  const portfolioId= location.state?.portfolioId

  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    if (!questionsData) {
      navigate("/cv-generation");
    } else {
      const initialAnswers = questionsData.map((section) => ({
        section: section.section,
        answers: section.questions.map(() => [""]),
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
    updated[sectionIndex].answers[qIdx].push("");
    setAnswers(updated);
  };

  const handleNext = async () => {
    if (sectionIndex < questionsData.length - 1) {
      setSectionIndex((prev) => prev + 1);
    } else {
      setLoading(true)
      console.log("Final answers:", answers);
      //  await new Promise(resolve => setTimeout(resolve, 30000));

      const res = await generateCv(portfolioId, answers);
      console.log(res);
      navigate("/resume-ready");
    }
  };

  const handlePrevious = () => {
    if (sectionIndex > 0) {
      setSectionIndex((prev) => prev - 1);
    }
  };
    if (loading) {
      return <LoadingPage/>;
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-200">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="bg-orange-100/30 text-white px-3 py-1 rounded-full text-sm font-medium">
                Section {sectionIndex + 1} of {questionsData.length}
              </span>
              <h2 className="text-2xl font-bold text-white">
                {currentSection.section}
              </h2>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <form className="space-y-6">
            {currentSection.questions.map((q, qIdx) => (
              <div
                key={qIdx}
                className="bg-orange-50/50 p-5 rounded-xl border border-orange-100"
              >
                <label className="block text-lg font-semibold text-orange-800 mb-3">
                  <span className="text-orange-600 mr-2">{qIdx + 1}.</span>
                  {q}
                </label>

                {answers[sectionIndex]?.answers[qIdx]?.map((answer, aIdx) => (
                  <div key={aIdx} className="flex items-center gap-3 mb-3">
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-orange-900 placeholder-orange-300"
                      value={answer}
                      onChange={(e) =>
                        handleInputChange(qIdx, aIdx, e.target.value)
                      }
                      placeholder={`Response ${aIdx + 1}`}
                    />
                    {aIdx ===
                      answers[sectionIndex].answers[qIdx].length - 1 && (
                      <button
                        type="button"
                        onClick={() => addAnswerInput(qIdx)}
                        className="flex items-center justify-center w-10 h-10 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-lg transition-colors"
                        title="Add another answer"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </form>
          <div className="flex justify-between pt-4 border-t border-orange-100">
            {sectionIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-5 py-3 bg-orange-100 hover:bg-orange-200 text-orange-700 font-medium rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
            )}

            <button
              onClick={handleNext}
              className="ml-auto flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg shadow-sm transition-all"
            >
              {sectionIndex < questionsData.length - 1 ? (
                <>
                  Next Section
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                "Generate CV"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
