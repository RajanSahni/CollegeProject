

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
