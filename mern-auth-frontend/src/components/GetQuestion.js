// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const GetQuestions = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchQuestions = async () => {
//     try {
//       const token = localStorage.getItem('token'); // token should be stored on login
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/questions`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
        
//       });
//      // console.log("Response from API:", response.data);

//       setQuestions(response.data.data);
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//       toast.error('Failed to load questions');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   if (loading) return <div className="p-4">Loading questions...</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">All Questions</h2>
//       {questions.length === 0 ? (
//         <p>No questions found.</p>
//       ) : (
//         <div className="space-y-4">
//           {questions.map((question, index) => (
//             <div key={question._id} className="border p-4 rounded-lg shadow">
//               <h3 className="font-semibold">
//                 {index + 1}. <span dangerouslySetInnerHTML={{ __html: question.title || 'No title provided' }} />

//               </h3>
//               <p><strong>Topic:</strong> {question.topic}</p>
//               <p><strong>Category:</strong> {question.category}</p>
//               <p><strong>Subcategory:</strong> {question.subcategory}</p>
//               <p><strong>Level:</strong> {question.level}</p>
//               <p><strong>Age Group:</strong> {question.age_group}</p>
//               <p><strong>Question Type:</strong> {question.question_type}</p>





//               {/* <div className="mt-2">
//                 <strong>Options:</strong>
//                 <ul className="list-disc pl-6">
//                   {question.options.map((opt, idx) => (
//                     <li key={idx} className={opt.isCorrect ? "text-green-600 font-semibold" : ""}>
//                       {opt.optionText} {opt.isCorrect ? "(Correct)" : ""}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <p className="mt-2"><strong>Correct Answer:</strong> {question.correct_answer}</p> */}



   
//                <div className="mt-2">
//                   <strong>Options:</strong>
//                     <ul className="list-disc pl-6">
//                       {question.options.map((opt, idx) => (
//                     <li
//                        key={idx}
//                        className={opt.isCorrect ? "text-green-600 font-semibold" : ""}
//                        >
//            <span
//              dangerouslySetInnerHTML={{
//                 __html: `${opt.optionText} ${opt.isCorrect ? "(Correct)" : ""}`,
//               }}
//                />
//             </li>
//            ))}
//           </ul>
//           </div>

//             <p className="mt-2">
//              <strong>Correct Answer:</strong>{" "}
//               <span
//            dangerouslySetInnerHTML={{ __html: question.correct_answer || "N/A" }}
//               />
//             </p>
//               <p><strong>Explanation:</strong> {question.explanation}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetQuestions;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const GetQuestions = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);

//   const fetchQuestions = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/questions`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setQuestions(response.data.data);
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//       toast.error('Failed to load questions');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const handleCheckboxChange = (questionId) => {
//     setSelectedQuestions((prev) =>
//       prev.includes(questionId)
//         ? prev.filter((id) => id !== questionId)
//         : [...prev, questionId]
//     );
//   };

//   if (loading) return <div className="p-4">Loading questions...</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">All Questions</h2>
//       {questions.length === 0 ? (
//         <p>No questions found.</p>
//       ) : (
//         <div className="space-y-4">
//           {questions.map((question, index) => (
//             <div key={question._id} className="border p-4 rounded-lg shadow">
//               <div className="flex items-center mb-2">
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={selectedQuestions.includes(question._id)}
//                   onChange={() => handleCheckboxChange(question._id)}
//                 />
//                 <h3 className="font-semibold">
//                   {index + 1}.{' '}
//                   <span
//                     dangerouslySetInnerHTML={{
//                       __html: question.title || 'No title provided',
//                     }}
//                   />
//                 </h3>
//               </div>
//               <p><strong>Topic:</strong> {question.topic}</p>
//               <p><strong>Category:</strong> {question.category}</p>
//               <p><strong>Subcategory:</strong> {question.subcategory}</p>
//               <p><strong>Level:</strong> {question.level}</p>
//               <p><strong>Age Group:</strong> {question.age_group}</p>
//               <p><strong>Question Type:</strong> {question.question_type}</p>

//               <div className="mt-2">
//                 <strong>Options:</strong>
//                 <ul className="list-disc pl-6">
//                   {question.options.map((opt, idx) => (
//                     <li
//                       key={idx}
//                       className={opt.isCorrect ? 'text-green-600 font-semibold' : ''}
//                     >
//                       <span
//                         dangerouslySetInnerHTML={{
//                           __html: `${opt.optionText} ${opt.isCorrect ? '(Correct)' : ''}`,
//                         }}
//                       />
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <p className="mt-2">
//                 <strong>Correct Answer:</strong>{' '}
//                 <span
//                   dangerouslySetInnerHTML={{ __html: question.correct_answer || 'N/A' }}
//                 />
//               </p>
//               <p><strong>Explanation:</strong> {question.explanation}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetQuestions;











import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelectedQuestions } from './SelectedQuestionsContext';
//import ManageDeployedQuestions from './ManageDeployedQuestions';

const GetQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedQuestions, addQuestion, removeQuestion } = useSelectedQuestions();

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/questions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestions(response.data.data);
    } catch (error) {
      toast.error('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleCheckboxChange = (question) => {
    const isSelected = selectedQuestions.find((q) => q._id === question._id);
    if (isSelected) removeQuestion(question._id);
    else addQuestion(question);
  };

  if (loading) return <div className="p-4">Loading questions...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Questions</h2>
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={question._id} className="border p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedQuestions.some((q) => q._id === question._id)}
                onChange={() => handleCheckboxChange(question)}
              />
              <h3 className="font-semibold">
                {index + 1}.{' '}
                <span
                  dangerouslySetInnerHTML={{
                    __html: question.title || 'No title',
                  }}
                />
              </h3>
            </div>
            {/* Options, correct answer, etc. (same as before) */}
          </div>
        ))}
      </div>
      {/* <ManageDeployedQuestions /> */}
    </div>
  );
};

export default GetQuestions;
