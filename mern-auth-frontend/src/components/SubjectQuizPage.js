
// import React, { useEffect, useState, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const SubjectQuizPage = () => {
//   const { subject } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [showResults, setShowResults] = useState(false);
//   const [filter, setFilter] = useState('All');
//   const [quizSubmitted, setQuizSubmitted] = useState(false);

//   const fetchQuestions = useCallback(async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/questions/subject/${subject}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setQuestions(response.data.questions || []);
//     } catch (error) {
//       toast.error('Failed to fetch questions.');
//     } finally {
//       setLoading(false);
//     }
//   }, [subject]);

//   useEffect(() => {
//     fetchQuestions();
//   }, [fetchQuestions]);

//   const handleAnswerSelect = (questionId, selectedOptionIndex) => {
//     setUserAnswers(prev => ({
//       ...prev,
//       [questionId]: selectedOptionIndex
//     }));
//   };

//   const handlePrevQuestion = () => {
//     setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     } else {
//       setShowResults(true);
//     }
//   };

//   const startQuiz = () => {
//     setCurrentQuestionIndex(0);
//     setUserAnswers({});
//     setShowResults(false);
//     setQuizSubmitted(false);
//   };

//   const getCorrectAnswers = () => {
//     let correctCount = 0;
//     questions.forEach(question => {
//       const correctOptionIndex = question.options.findIndex(opt => opt.isCorrect);
//       if (userAnswers[question._id] === correctOptionIndex) {
//         correctCount++;
//       }
//     });
//     return correctCount;
//   };

//   const isAnswerCorrect = (questionId) => {
//     const question = questions.find(q => q._id === questionId);
//     if (!question) return false;
    
//     const correctOptionIndex = question.options.findIndex(opt => opt.isCorrect);
//     return userAnswers[questionId] === correctOptionIndex;
//   };

//   const filteredQuestions = () => {
//     if (filter === 'All') return questions;
//     if (filter === 'Correct') return questions.filter(q => isAnswerCorrect(q._id));
//     if (filter === 'Incorrect') return questions.filter(q => !isAnswerCorrect(q._id) && userAnswers[q._id] !== undefined);
//     return questions;
//   };

//   const submitQuizResults = async () => {
//     try {
//       setSubmitting(true);
      
//       // Create answers array with required format
//       const formattedAnswers = Object.keys(userAnswers).map(questionId => {
//         const selectedOptionIndex = userAnswers[questionId];
//         const question = questions.find(q => q._id === questionId);
//         const correctOptionIndex = question.options.findIndex(opt => opt.isCorrect);
        
//         return {
//           questionId,
//           selectedOptionIndex,
//           isCorrect: selectedOptionIndex === correctOptionIndex
//         };
//       });
      
//       const quizData = {
//         subject,
//         answers: formattedAnswers,
//         score: getCorrectAnswers(),
//         totalQuestions: questions.length
//       };
      
//       const token = localStorage.getItem('token');
//       await axios.post(
//         `${process.env.REACT_APP_API_URL}/quiz/submit`,
//         quizData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
      
//       setQuizSubmitted(true);
//       toast.success('Quiz results saved successfully!');
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//       toast.error('Failed to save quiz results.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-lg">Loading...</p>
//       </div>
//     );
//   }

//   if (questions.length === 0) {
//     return (
//       <div className="p-6 mt-6 bg-white max-w-3xl mx-auto shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold mb-6">Questions for: {subject}</h2>
//         <p>No questions found for this subject.</p>
//       </div>
//     );
//   }

//   if (!showResults && questions.length > 0) {
//     // Quiz in progress
//     const currentQuestion = questions[currentQuestionIndex];
    
//     return (
//       <div className="p-6 mt-6 bg-white max-w-3xl mx-auto shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold mb-6">Quiz: {subject}</h2>
        
//         <div className="mb-4">
//           <div className="flex justify-between mb-2">
//             <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
//             <span>{currentQuestionIndex + 1}/{questions.length}</span>
//           </div>
          
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div 
//               className="bg-blue-400 h-2.5 rounded-full" 
//               style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
//             ></div>
//           </div>
//         </div>
        
//         <div className="mb-6">
//           <h3 className="text-lg font-medium mb-4" dangerouslySetInnerHTML={{ __html: currentQuestion.title }} />
          
//           <div className="grid grid-cols-1 gap-3">
//             {currentQuestion.options.map((option, index) => (
//               <button
//                 key={index}
//                 className={`py-3 px-4 text-left border rounded-lg transition-colors ${
//                   userAnswers[currentQuestion._id] === index
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-blue-50 hover:bg-blue-100'
//                 }`}
//                 onClick={() => handleAnswerSelect(currentQuestion._id, index)}
//                 dangerouslySetInnerHTML={{ __html: option.optionText }}
//               />
//             ))}
//           </div>
//         </div>
        
//         <div className="flex justify-between mt-6">
//           <button
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//             onClick={handlePrevQuestion}
//             disabled={currentQuestionIndex === 0}
//           >
//             Previous
//           </button>
          
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={handleNextQuestion}
//           >
//             {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish Quiz'}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Results page
//   return (
//     <div className="p-6 mt-6 bg-white max-w-3xl mx-auto shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-6">Quiz Results: {subject}</h2>
      
//       <div className="mb-6 text-center">
//         <p className="text-lg mb-4">
//           You completed the quiz! You got {getCorrectAnswers()} out of {questions.length} questions correct.
//         </p>
//         <div className="mb-6 flex justify-center gap-4">
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={startQuiz}
//           >
//             Retry Quiz
//           </button>
          
//           {!quizSubmitted && (
//             <button
//               className={`px-4 py-2 ${submitting ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white rounded`}
//               onClick={submitQuizResults}
//               disabled={submitting}
//             >
//               {submitting ? 'Saving...' : 'Save Results'}
//             </button>
//           )}
          
//           {quizSubmitted && (
//             <span className="px-4 py-2 bg-green-100 text-green-800 rounded border border-green-300">
//               Results Saved ✓
//             </span>
//           )}
//         </div>
//       </div>
      
//       <div className="mb-4">
//         <div className="flex gap-2 mb-4">
//           <button
//             className={`px-3 py-1 rounded ${filter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//             onClick={() => setFilter('All')}
//           >
//             All
//           </button>
//           <button
//             className={`px-3 py-1 rounded ${filter === 'Correct' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//             onClick={() => setFilter('Correct')}
//           >
//             Correct
//           </button>
//           <button
//             className={`px-3 py-1 rounded ${filter === 'Incorrect' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//             onClick={() => setFilter('Incorrect')}
//           >
//             Incorrect
//           </button>
//         </div>
//       </div>
      
//       <ul className="space-y-6">
//         {filteredQuestions().map((question, idx) => {
//           const userSelectedIndex = userAnswers[question._id];
//           const correctOptionIndex = question.options.findIndex(opt => opt.isCorrect);
//           const isCorrect = userSelectedIndex === correctOptionIndex;
          
//           return (
//             <li key={question._id} className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
//               <div className="mb-3 font-semibold text-lg">
//                 {idx + 1}. <span dangerouslySetInnerHTML={{ __html: question.title }} />
//               </div>
              
//               <div className="grid grid-cols-1 gap-3 mb-3">
//                 {question.options.map((option, i) => (
//                   <div
//                     key={i}
//                     className={`py-2 px-4 rounded border ${
//                       i === correctOptionIndex
//                         ? 'bg-green-100 border-green-500'
//                         : i === userSelectedIndex && i !== correctOptionIndex
//                         ? 'bg-red-100 border-red-500'
//                         : 'bg-white'
//                     }`}
//                   >
//                     <div dangerouslySetInnerHTML={{ __html: option.optionText }} />
//                   </div>
//                 ))}
//               </div>
              
//               <div className="mt-2 text-sm">
//                 {isCorrect ? (
//                   <p className="text-green-600">Correct answer!</p>
//                 ) : (
//                   <p className="text-red-600">
//                     {userSelectedIndex !== undefined 
//                       ? 'Incorrect answer.' 
//                       : 'You did not answer this question.'}
//                   </p>
//                 )}
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default SubjectQuizPage;






import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const SubjectQuizPage = () => {
  const { subject } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [filter, setFilter] = useState('All');
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizAttempt, setQuizAttempt] = useState(null);

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/questions/subject/${subject}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuestions(response.data.questions || []);
    } catch (error) {
      toast.error('Failed to fetch questions.');
    } finally {
      setLoading(false);
    }
  }, [subject]);

  useEffect(() => {
    const checkPreviousAttempt = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/quiz/attempts/${subject}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.quizAttempts.length > 0) {
          setQuizSubmitted(true);
          setQuizAttempt(res.data.quizAttempts[0]);
          toast.error('You have already attempted this quiz.');
        } else {
          fetchQuestions();
        }
      } catch (error) {
        console.error('Error checking previous attempts:', error);
        toast.error('Failed to verify quiz attempt status.');
      }
    };

    checkPreviousAttempt();
  }, [subject, fetchQuestions]);

  const handleAnswerSelect = (questionId, selectedOptionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOptionIndex,
    }));
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
      if (!quizSubmitted) {
        submitQuizResults();
      }
    }
  };

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setQuizSubmitted(false);
    setQuizAttempt(null);
    fetchQuestions();
  };

  const getCorrectAnswers = () => {
    let correctCount = 0;
    questions.forEach((question) => {
      const correctOptionIndex = question.options.findIndex((opt) => opt.isCorrect);
      if (userAnswers[question._id] === correctOptionIndex) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const isAnswerCorrect = (questionId) => {
    const question = questions.find((q) => q._id === questionId);
    if (!question) return false;

    const correctOptionIndex = question.options.findIndex((opt) => opt.isCorrect);
    return userAnswers[questionId] === correctOptionIndex;
  };

  const filteredQuestions = () => {
    if (filter === 'All') return questions;
    if (filter === 'Correct') return questions.filter((q) => isAnswerCorrect(q._id));
    if (filter === 'Incorrect') return questions.filter((q) => !isAnswerCorrect(q._id) && userAnswers[q._id] !== undefined);
    return questions;
  };

  const submitQuizResults = async () => {
    try {
      setSubmitting(true);

      const formattedAnswers = Object.keys(userAnswers).map((questionId) => {
        const selectedOptionIndex = userAnswers[questionId];
        const question = questions.find((q) => q._id === questionId);
        const correctOptionIndex = question.options.findIndex((opt) => opt.isCorrect);

        return {
          questionId,
          selectedOptionIndex,
          isCorrect: selectedOptionIndex === correctOptionIndex,
        };
      });

      const quizData = {
        subject,
        answers: formattedAnswers,
        score: getCorrectAnswers(),
        totalQuestions: questions.length,
      };

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/quiz/submit`,
        quizData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuizSubmitted(true);
      setQuizAttempt(response.data.quizAttempt);
      toast.success('Quiz results saved successfully!');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error('Failed to save quiz results.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (quizSubmitted && quizAttempt && !showResults) {
    return (
      <div className="p-6 mt-6 bg-white max-w-3xl mx-auto shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Quiz Already Attempted</h2>
        <p>You have already submitted the quiz for <strong>{subject}</strong>.</p>
        <p>Your score: {quizAttempt.score}/{quizAttempt.totalQuestions}</p>
      </div>
    );
  }

  if (!showResults && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="p-6 mt-6 bg-white max-w-3xl mx-auto shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Quiz: {subject}</h2>

        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-400 h-2.5 rounded-full"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4" dangerouslySetInnerHTML={{ __html: currentQuestion.title }} />
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`py-3 px-4 text-left border rounded-lg transition-colors ${
                  userAnswers[currentQuestion._id] === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-50 hover:bg-blue-100'
                }`}
                onClick={() => handleAnswerSelect(currentQuestion._id, index)}
                dangerouslySetInnerHTML={{ __html: option.optionText }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleNextQuestion}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    );
  }

  // Results Section
  return (
    <div className="p-6 mt-6 bg-white max-w-3xl mx-auto shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Quiz Results: {subject}</h2>

      <div className="mb-6 text-center">
        <p className="text-lg mb-4">
          You completed the quiz! You got {getCorrectAnswers()} out of {questions.length} questions correct.
        </p>

        {quizSubmitted && quizAttempt && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-700">Results Saved Successfully</h3>
            <p className="text-green-700">Student: {quizAttempt.userName}</p>
            <p className="text-green-700">Score: {quizAttempt.score}/{quizAttempt.totalQuestions}</p>
          </div>
        )}

        <div className="mb-6 flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={startQuiz}
          >
            Retry Quiz
          </button>

          {!quizSubmitted && (
            <button
              className={`px-4 py-2 ${submitting ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white rounded`}
              onClick={submitQuizResults}
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Results'}
            </button>
          )}

          {quizSubmitted && !quizAttempt && (
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded border border-green-300">
              Results Saved ✓
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex gap-2 mb-4">
          {['All', 'Correct', 'Incorrect'].map((f) => (
            <button
              key={f}
              className={`px-3 py-1 rounded ${filter === f ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {filteredQuestions().map((q, i) => {
          const selected = userAnswers[q._id];
          const correctIndex = q.options.findIndex((opt) => opt.isCorrect);
          return (
            <div key={q._id} className="mb-4 border p-4 rounded">
              <p className="font-semibold mb-2" dangerouslySetInnerHTML={{ __html: `${i + 1}. ${q.title}` }} />
              <ul className="space-y-2">
                {q.options.map((option, idx) => (
                  <li
                    key={idx}
                    className={`p-2 rounded ${
                      idx === correctIndex
                        ? 'bg-green-100 text-green-800'
                        : idx === selected
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100'
                    }`}
                    dangerouslySetInnerHTML={{ __html: option.optionText }}
                  />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectQuizPage;
