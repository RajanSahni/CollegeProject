import React, { createContext, useState, useContext } from 'react';

const SelectedQuestionsContext = createContext();

export const useSelectedQuestions = () => useContext(SelectedQuestionsContext);

export const SelectedQuestionsProvider = ({ children }) => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const addQuestion = (question) => {
    setSelectedQuestions((prev) =>
      prev.find((q) => q._id === question._id) ? prev : [...prev, question]
    );
  };

  const removeQuestion = (id) => {
    setSelectedQuestions((prev) => prev.filter((q) => q._id !== id));
  };

  const clearAll = () => {
    setSelectedQuestions([]);
  };

  return (
    <SelectedQuestionsContext.Provider
      value={{ selectedQuestions, addQuestion, removeQuestion, clearAll }}
    >
      {children}
    </SelectedQuestionsContext.Provider>
  );
};
