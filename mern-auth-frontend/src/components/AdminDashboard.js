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







import React, { useState, useEffect } from "react";
import { Form, Button } from "antd";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Questiontitle from "./Questiontitle";
import QuestionOption from "./QuestionOption";
import QuestionMetadata from "./QuestionMetadata";
import axios from "axios";

const AdminDashboard = () => {
  const [form] = Form.useForm();
  const [inputType, setInputType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [questionData, setQuestionData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/questions`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setQuestionData(response.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to fetch questions. Please try again later.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchQuestions();
  }, []);

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  console.log("questionList", questionData);

  const sanitizeHtml = (text = "") => text.replace(/<\/?(p|strong|em|u)>/g, "");

  const onFinish = async (values) => {
    setIsLoading(true);
    setError("");

    const payload = {
      ...values,
      titlefile: values.titlefile?.map((file) => file.id || file.response?.id),
      title: sanitizeHtml(values.title),
      options:
        values.options?.map((option) => ({
          ...option,
          optionText: sanitizeHtml(option.optionText),
        })) || [],
    };

    console.log("Payload:", payload);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/questions`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Response Data:", response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting question:", error);

      if (error.response) {
        setError(error.response.data.message || "Server error occurred.");
      } else if (error.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError(`Request error: ${error.message}`);
      }
    }
  };

  const handleInputTypeChange = (checkedValues) => {
    setInputType(checkedValues);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Admin Dashboard - Create Question
        </h2>
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <QuestionMetadata />
          <Questiontitle
            form={form}
            handleInputTypeChange={handleInputTypeChange}
            inputType={inputType}
          />
          <QuestionOption form={form} />

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminDashboard;