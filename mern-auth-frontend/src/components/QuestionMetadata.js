
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