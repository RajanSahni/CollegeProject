// import React from 'react';
// //import DeployedQuestionsBySubject from './DeployedQuestionsBySubject';

// const StudentDashboard = () => {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <h1 className="text-3xl font-bold">Welcome to the Student Dashboard!</h1>

//     </div>
//   );
// };

// export default StudentDashboard;




// import React, { useState} from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const StudentDashboard = () => {
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

// export default StudentDashboard;







import React from 'react';
import { useNavigate } from 'react-router-dom';
//import SubjectQuizPage from './SubjectQuizPage';

const subjects = ['Hindi', 'Math', 'Science', 'English'];

const Studentdashboard = () => {
  const navigate = useNavigate();

  const handleClick = (subject) => {
    navigate(`/subject/${subject}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Select a Subject</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => handleClick(subject)}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Studentdashboard;
