// import React, { useState} from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const DeployedQuestionsBySubject = () => {
//   const [subject, setSubject] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchQuestions = async (selectedSubject) => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/questions/subject/${selectedSubject}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setQuestions(response.data.questions || []);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//       toast.error('Failed to fetch questions.');
//       setLoading(false);
//     }
//   };
//   const handleSubjectChange = (e) => {
//     const selected = e.target.value;
//     setSubject(selected);
//     fetchQuestions(selected);
//   };

//   return (
//     <div className="p-6 mt-8 bg-white shadow rounded-lg">
//       <h2 className="text-xl font-bold mb-4">View Deployed Questions</h2>

//       <select
//         value={subject}
//         onChange={handleSubjectChange}
//         className="p-2 border rounded mb-4"
//       >
//         <option value="">Select Subject</option>
//         <option value="Hindi">Hindi</option>
//         <option value="Math">Math</option>
//         <option value="Science">Science</option>
//         <option value="English">English</option>
//       </select>

//       {loading ? (
//         <p>Loading questions...</p>
//       ) : questions.length === 0 ? (
//         <p>No questions found for this subject.</p>
//       ) : (
//         <ul className="space-y-3">
//           {questions.map((q, idx) => (
//             <li key={q._id} className="p-3 border rounded bg-gray-100">
//               <span dangerouslySetInnerHTML={{ __html: `${idx + 1}. ${q.title}` }} />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default DeployedQuestionsBySubject;










import React, { useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const DeployedQuestionsBySubject = () => {
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async (selectedSubject) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/questions/subject/${selectedSubject}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestions(response.data.questions || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('Failed to fetch questions.');
      setLoading(false);
    }
  };
  const handleSubjectChange = (e) => {
    const selected = e.target.value;
    setSubject(selected);
    fetchQuestions(selected);
  };

  return (
    <div className="p-6 mt-8 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">View Deployed Questions</h2>

      <select
        value={subject}
        onChange={handleSubjectChange}
        className="p-2 border rounded mb-4"
      >
        <option value="">Select Subject</option>
        <option value="Hindi">Hindi</option>
        <option value="Math">Math</option>
        <option value="Science">Science</option>
        <option value="English">English</option>
      </select>

      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length === 0 ? (
        <p>No questions found for this subject.</p>
      ) : (
        <ul className="space-y-3">
          {questions.map((q, idx) => (
            <li key={q._id} className="p-3 border rounded bg-gray-100">
              <span dangerouslySetInnerHTML={{ __html: `${idx + 1}. ${q.title}` }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeployedQuestionsBySubject;
