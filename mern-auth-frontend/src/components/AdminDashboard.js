// // // filepath: c:\Users\rajan\OneDrive\Desktop\Devops\mern-auth-frontend\src\components\AdminDashboard.js
//  import React from 'react';

// const AdminDashboard = () => {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <h1 className="text-3xl font-bold">Welcome to the Admin Dashboard!</h1>
//     </div>
//   );
// };

// export default AdminDashboard;




// import React, { useState, useEffect } from "react";
// import { Form, Button } from "antd";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import Questiontitle from "./Questiontitle";
// import QuestionOption from "./QuestionOption";
// import QuestionMetadata from "./QuestionMetadata";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [form] = Form.useForm();
//   const [inputType, setInputType] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [questionData, setQuestionData] = useState([]);
//   const [isFetching, setIsFetching] = useState(true);

//   // Fetch questions from the backend
//   useEffect(() => {
//     console.log('Current token:', localStorage.getItem('token'));
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/questions`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setQuestionData(response.data);
//       } catch (err) {
//         console.error("Error fetching questions:", err);
//         setError("Failed to fetch questions. Please try again later.");
//       } finally {
//         setIsFetching(false);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   if (isFetching) {
//     return <h1>Loading...</h1>;
//   }

//   console.log("questionList", questionData);

//   const sanitizeHtml = (text = "") => text.replace(/<\/?(p|strong|em|u)>/g, "");

//   const onFinish = async (values) => {
//     setIsLoading(true);
//     setError("");

//     const payload = {
//       ...values,
//       titlefile: values.titlefile?.map((file) => file.id || file.response?.id),
//       title: sanitizeHtml(values.title),
//       options:
//         values.options?.map((option) => ({
//           ...option,
//           optionText: sanitizeHtml(option.optionText),
//         })) || [],
//     };

//     console.log("Payload:", payload);

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/questions`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       console.log("Response Data:", response.data);
//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//       console.error("Error submitting question:", error);

//       if (error.response) {
//         setError(error.response.data.message || "Server error occurred.");
//       } else if (error.request) {
//         setError("No response from server. Please check your connection.");
//       } else {
//         setError(`Request error: ${error.message}`);
//       }
//     }
//   };

//   const handleInputTypeChange = (checkedValues) => {
//     setInputType(checkedValues);
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-4xl space-y-8">
//         <h2 className="text-center text-3xl font-extrabold text-gray-900">
//           Admin Dashboard - Create Question
//         </h2>
//         <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
//           <QuestionMetadata />
//           <Questiontitle
//             form={form}
//             handleInputTypeChange={handleInputTypeChange}
//             inputType={inputType}
//           />
//           <QuestionOption form={form} />

//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//               {error}
//             </div>
//           )}

//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={isLoading}>
//               {isLoading ? "Submitting..." : "Submit"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const handleAddQuestionClick = () => {
//     navigate('/add-question');
//   };

//   const getqquestionClick = () => {
//     navigate('/get-question');
//   };

//   const viewDeployedQuestionsClick = () => {
//     navigate('/view-deployed');
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold mb-8">Welcome to the Admin Dashboard!</h1>
//         <button
//           onClick={handleAddQuestionClick}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Add New Question
//         </button>

//         <button
//           onClick={getqquestionClick}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Get All Question
//         </button>

//         <button
//           onClick={viewDeployedQuestionsClick}
//           className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//         >
//           View Deployed Questions
//         </button>


      

//       </div>
//     </div>


//   );
// };

// export default AdminDashboard;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, List, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  // Add the missing state variable
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation effect when component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAddQuestionClick = () => {
    navigate('/add-question');
  };

  const getqquestionClick = () => {
    navigate('/get-question');
  };

  const viewDeployedQuestionsClick = () => {
    navigate('/view-deployed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div 
        className={`max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mb-8">Manage your questions and deployments</p>
          
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleAddQuestionClick}
              className="group relative flex w-full justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <PlusCircle className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
              </span>
              Add New Question
            </button>
            
            <button
              onClick={getqquestionClick}
              className="group relative flex w-full justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <List className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
              </span>
              Get All Questions
            </button>
            
            <button
              onClick={viewDeployedQuestionsClick}
              className="group relative flex w-full justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <CheckCircle className="h-5 w-5 text-green-300 group-hover:text-green-200" />
              </span>
              View Deployed Questions
            </button>
          </div>
          
          <div className="mt-8 text-xs text-gray-400">
            <p>Admin Panel • {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;