// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import StudentDashboard from './components/StudentDashboard';
// import AdminDashboard from './components/AdminDashboard';
// import AddQuestion from './components/AddQuestion';
// import GetQuestions from './components/GetQuestion';


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/studashboard" element={<StudentDashboard />} />
//         <Route path="/admdashboard" element={<AdminDashboard />} />
//         <Route path="/add-question" element={<AddQuestion />} />


//         <Route path="/get-question" element={<GetQuestions />} />

//         <Route path="/" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;






import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import AddQuestion from './components/AddQuestion';
import GetQuestions from './components/GetQuestion';
import SelectedQuestionView from './components/SelectedQuestionView';
import DeployedQuestionsBySubject from './components/DeployedQuestionsBySubject';

// ✅ Import Context Provider
import { SelectedQuestionsProvider } from './components/SelectedQuestionsContext';

// ✅ Create a combined component for /get-question
const GetQuestionsPage = () => (
  <>
    <GetQuestions />
    <SelectedQuestionView />
  </>
);

function App() {
  return (
    <Router>
      {/* ✅ Wrap everything in the context provider */}
      <SelectedQuestionsProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/studashboard" element={<StudentDashboard />} />
          <Route path="/admdashboard" element={<AdminDashboard />} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/view-deployed" element={<DeployedQuestionsBySubject />} />
          
          {/* ✅ Updated route */}
          <Route path="/get-question" element={<GetQuestionsPage />} />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </SelectedQuestionsProvider>
    </Router>
  );
}

export default App;
