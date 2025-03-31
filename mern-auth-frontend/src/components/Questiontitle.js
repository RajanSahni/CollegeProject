import React, { useState, useRef, useMemo } from "react";
import { Form, Input, Checkbox, Upload, Button } from "antd";
import JoditEditor from "jodit-react";

const API_URL = process.env.REACT_APP_API_URL;

const Questiontitle = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [inputType, setInputType] = useState([]);

  const handleInputTypeChange = (checkedValues) => {
    setInputType(checkedValues);
  };

  const handleTitleChange = (newValue) => {
    setTitle(newValue);
  };

  // Handle paste event to process images
  const handlePaste = (event) => {
    const clipboardData = event.clipboardData;
    const items = clipboardData?.items;

    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") === 0) {
          const file = items[i].getAsFile();
          const reader = new FileReader();

          reader.onload = (e) => {
            const base64Image = e.target?.result;
            setTitle((prevContent) => prevContent + `<img src="${base64Image}" alt="Pasted Image"/>`);
          };

          if (file) {
            reader.readAsDataURL(file);
          }
        }
      }
    }
  };

  // Jodit Editor Config
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Write your question here...",
      uploader: {
        insertImageAsBase64URI: true,
      },
      events: {
        afterInit: (editor) => {
          console.log("Editor initialized");
        },
        beforePaste: handlePaste,
      },
    }),
    []
  );

  return (
    <>
      {/* Topic */}
      <Form.Item
        name="topic"
        label="Enter your topic"
        rules={[{ required: true, message: "Please provide a topic" }]}
      >
        <Input placeholder="Enter your topic" />
      </Form.Item>

      {/* Question Type */}
      <Form.Item
        name="questionType"
        label="Choose your question type"
        rules={[{ required: true, message: "Please select at least one question type" }]}
      >
        <Checkbox.Group onChange={handleInputTypeChange}>
          <Checkbox value="text">Text Type Question</Checkbox>
          <Checkbox value="file">Image Type Question</Checkbox>
        </Checkbox.Group>
      </Form.Item>

      {/* Text Question */}
      {inputType.includes("text") && (
        <Form.Item
          name="title"
          label="Enter Text Question"
          rules={[{ required: true, message: "Please input your text question" }]}
        >
          <JoditEditor
            ref={editor}
            value={title}
            config={config}
            onChange={handleTitleChange}
          />
        </Form.Item>
      )}

      {/* Image Question */}
      {inputType.includes("file") && (
        <>
          <Form.Item
            name="title"
            label="Enter Description"
            rules={[{ required: true, message: "Please provide a description" }]}
          >
            <Input placeholder="Enter description for the image question" />
          </Form.Item>

          <Form.Item
            name="titlefile"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              const uploadedFiles = e?.fileList?.map((file) => {
                if (file.response) {
                  return {
                    name: file.name,
                    id: file.response?.id || file.response[0]?.id, // Extract ID from server response
                  };
                }
                return file;
              });
              return uploadedFiles;
            }}
            label="Upload Photos"
          >
            <Upload.Dragger
              name="files"
              action={`${API_URL}/upload`}
              listType="picture-card"
              headers={{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }}
            >
              <Button>Click to Upload</Button>
            </Upload.Dragger>
          </Form.Item>
        </>
      )}
    </>
  );
};

export default Questiontitle;