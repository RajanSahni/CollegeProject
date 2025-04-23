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