
import { Form, Input } from 'antd';
//import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

//import { useCreate } from "@refinedev/core";
//import { useState } from "react";
//import { useList } from "@refinedev/core";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React from "react";


const QuestionMetadata=()=>{
    return(
        <>
       {/* Topic*/}
          <Form.Item
          name="topic"
          label="Enter your topic"
          rules={[{ required: true, message: "Please provide a topic" }]}
        >
          <Input placeholder="Enter your topic" />
        </Form.Item>
      {/* Category */}
        <Form.Item
          name="category"
          label="Enter category"
          rules={[{ required: true, message: "Please provide a category" }]}
        >
          <Input placeholder="Enter your category" />
        </Form.Item>

         {/* Subcategory */}
          <Form.Item
          name="subcategory"
          label="Enter subcategory"
          rules={[{ required: true, message: "Please provide a subcategory" }]}
        >
          <Input placeholder="Enter your subcategory" />
        </Form.Item> 


        {/* Level */}
      
        <Form.Item
          name="level"
          label="Enter level"
          rules={[{ required: true, message: "Please provide a level" }]}
        >
          <Input type="number" placeholder="Enter level" />
        </Form.Item> 

         {/* Level */}
      
         <Form.Item
          name="age_group"
          label="Age-group"
          rules={[{ required: true, message: "Please provide your age " }]}
        >
          <Input type="number" placeholder="Enter your age " />
        </Form.Item> 

         {/* Level */}
      
         <Form.Item
          name="question_type"
          label="Enter Your Question type "
          rules={[{ required: true, message: "Please provide a level" }]}
        >
          <Input placeholder="Enter Your Question type" />
        </Form.Item> 

        <Form.Item
          name="correct_answer"
          label="Enter Your correct answer "
          rules={[{ required: true, message: "Please provide correct answer" }]}
        >
          <Input placeholder="Enter Your Question type" />
        </Form.Item> 

        <Form.Item
          name="explanation"
          label="Enter Your answer explaination "
          rules={[{ required: true, message: "Please provide correct explaination" }]}
        >
          <Input placeholder="Enter Your explaination here " />
        </Form.Item> 

        </>
    )
}

export default QuestionMetadata;










// import { Form, Input } from 'antd';
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import React, { useEffect } from "react";

// const QuestionMetadata = () => {
//   useEffect(() => {
//     // Animation for form items when component mounts
//     const formItems = document.querySelectorAll('.form-item-animate');
//     formItems.forEach((item, index) => {
//       setTimeout(() => {
//         item.classList.remove('opacity-0', 'translate-y-4');
//         item.classList.add('opacity-100', 'translate-y-0');
//       }, index * 100);
//     });
//   }, []);

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
//       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 relative">
//         <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
//           Question Metadata
//         </span>
//         <div className="absolute h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 bottom-0 left-1/2 transform -translate-x-1/2 rounded-full mt-1"></div>
//       </h2>

//       <div className="space-y-6">
//         {/* Topic */}
//         <div className="form-item-animate opacity-0 translate-y-4 transition-all duration-500 ease-out transform bg-white p-4 rounded-lg shadow-sm hover:shadow-md border-l-4 border-blue-500">
//           <Form.Item
//             name="topic"
//             label={<span className="text-gray-700 font-medium">Topic</span>}
//             rules={[{ required: true, message: "Please provide a topic" }]}
//             className="mb-0"
//           >
//             <Input 
//               placeholder="Enter your topic" 
//               className="py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//             />
//           </Form.Item>
//         </div>

//         {/* Category */}
//         <div className="form-item-animate opacity-0 translate-y-4 transition-all duration-500 ease-out transform bg-white p-4 rounded-lg shadow-sm hover:shadow-md border-l-4 border-indigo-500">
//           <Form.Item
//             name="category"
//             label={<span className="text-gray-700 font-medium">Category</span>}
//             rules={[{ required: true, message: "Please provide a category" }]}
//             className="mb-0"
//           >
//             <Input 
//               placeholder="Enter your category" 
//               className="py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//             />
//           </Form.Item>
//         </div>

//         {/* Subcategory */}
//         <div className="form-item-animate opacity-0 translate-y-4 transition-all duration-500 ease-out transform bg-white p-4 rounded-lg shadow-sm hover:shadow-md border-l-4 border-purple-500">
//           <Form.Item
//             name="subcategory"
//             label={<span className="text-gray-700 font-medium">Subcategory</span>}
//             rules={[{ required: true, message: "Please provide a subcategory" }]}
//             className="mb-0"
//           >
//             <Input 
//               placeholder="Enter your subcategory" 
//               className="py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
//             />
//           </Form.Item>
//         </div>

//         {/* Level */}
//         <div className="form-item-animate opacity-0 translate-y-4 transition-all duration-500 ease-out transform bg-white p-4 rounded-lg shadow-sm hover:shadow-md border-l-4 border-cyan-500">
//           <Form.Item
//             name="level"
//             label={<span className="text-gray-700 font-medium">Difficulty Level</span>}
//             rules={[{ required: true, message: "Please provide a level" }]}
//             className="mb-0"
//           >
//             <Input 
//               type="number" 
//               placeholder="Enter level (1-5)" 
//               className="py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
//             />
//           </Form.Item>
//         </div>

//         {/* Age Group */}
//         <div className="form-item-animate opacity-0 translate-y-4 transition-all duration-500 ease-out transform bg-white p-4 rounded-lg shadow-sm hover:shadow-md border-l-4 border-teal-500">
//           <Form.Item
//             name="age_group"
//             label={<span className="text-gray-700 font-medium">Age Group</span>}
//             rules={[{ required: true, message: "Please provide your age" }]}
//             className="mb-0"
//           >
//             <Input 
//               type="number" 
//               placeholder="Enter suitable age group" 
//               className="py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
//             />
//           </Form.Item>
//         </div>

//         {/* Question Type */}
//         <div className="form-item-animate opacity-0 translate-y-4 transition-all duration-500 ease-out transform bg-white p-4 rounded-lg shadow-sm hover:shadow-md border-l-4 border-green-500">
//           <Form.Item
//             name="question_type"
//             label={<span className="text-gray-700 font-medium">Question Type</span>}
//             rules={[{ required: true, message: "Please provide question type" }]}
//             className="mb-0"
//           >
//             <Input 
//               placeholder="E.g., Multiple Choice, True/False" 
//               className="py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
//             />
//           </Form.Item>
//         </div>

//         <div className="relative py-3">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300"></div>
//           </div>
//           <div className="relative flex justify-center">
//             <span className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 text-gray-500 text-sm font-medium">
//               Answer Details
//             </span>
//           </div>
//         </div>

//         {/* Correct Answer */}
//         <div className="form-item-animate opacity-0 translate-y-4 transition-all duration-500 ease-out transform bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg shadow-sm hover:shadow-md border-l-4 border-emerald-500">
//           <Form.Item
//             name="correct_answer"
//             label={<span className="text-gray-700 font-medium">Correct Answer</span>}
//             rules={[{ required: true, message: "Please provide correct answer" }]}
//             className="mb-0"
//           >
//             <Input 
//               placeholder="Enter the correct answer" 
//               className="py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
//             />
//           </Form.Item>
//         </div>

//         {/* Explanation */}
//         <div className="form-item-animate opacity-0 translate-y-4 transition-all duration-500 ease-out transform bg-white p-4 rounded-lg shadow-sm hover:shadow-md border-l-4 border-yellow-500">
//           <Form.Item
//             name="explanation"
//             label={<span className="text-gray-700 font-medium">Answer Explanation</span>}
//             rules={[{ required: true, message: "Please provide correct explanation" }]}
//             className="mb-0"
//           >
//             <Input.TextArea 
//               placeholder="Enter your explanation here" 
//               className="py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
//               rows={4}
//             />
//           </Form.Item>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuestionMetadata;