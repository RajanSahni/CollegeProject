// import React from 'react';
// import { useSelectedQuestions } from './SelectedQuestionsContext';

// const SelectedQuestionView = () => {
//   const { selectedQuestions, clearAll } = useSelectedQuestions();

//   return (
//     <div className="p-6 mt-8 bg-gray-100 rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Selected Questions ({selectedQuestions.length})</h2>
//       {selectedQuestions.length === 0 ? (
//         <p>No questions selected.</p>
//       ) : (
//         <>
//           <ul className="space-y-2">
//             {selectedQuestions.map((q, idx) => (
//               <li key={q._id} className="border p-2 rounded">
//                 <span dangerouslySetInnerHTML={{ __html: `${idx + 1}. ${q.title}` }} />
//               </li>
//             ))}
//           </ul>
//           <button
//             onClick={clearAll}
//             className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Clear All
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default SelectedQuestionView;



import React, { useState } from 'react';
import { useSelectedQuestions } from './SelectedQuestionsContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const SelectedQuestionView = ({ onDeployComplete }) => {
  const { selectedQuestions, clearAll } = useSelectedQuestions();
  const [subject, setSubject] = useState('');

  const handleDeploy = async () => {
    if (!subject) {
      toast.error('Please select a subject before deploying.');
      return;
    }

    if (selectedQuestions.length === 0) {
      toast.error('No questions selected for deployment.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/deploy`,
        {
          subject,
          questionIds: selectedQuestions.map((q) => q._id),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || 'Questions deployed successfully!');
      clearAll();
      setSubject('');

      // Notify parent to refresh DeployedQuestions
      if (onDeployComplete) {
        onDeployComplete(subject);
      }
    } catch (error) {
      console.error('Deployment error:', error);
      const errMsg =
        error.response?.data?.message || 'Failed to deploy questions.';
      toast.error(errMsg);
    }
  };

  return (
    <div className="p-6 mt-8 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        Selected Questions ({selectedQuestions.length})
      </h2>

      {selectedQuestions.length === 0 ? (
        <p>No questions selected.</p>
      ) : (
        <>
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {selectedQuestions.map((q, idx) => (
              <li key={q._id} className="border p-2 rounded">
                <span
                  dangerouslySetInnerHTML={{ __html: `${idx + 1}. ${q.title}` }}
                />
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="p-2 rounded border"
            >
              <option value="">Select Subject</option>
              <option value="Hindi">Hindi</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
            </select>

            <button
              onClick={handleDeploy}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Deploy to Subject
            </button>

            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear All
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectedQuestionView;



