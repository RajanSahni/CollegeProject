import React, { useRef, useMemo, useState } from "react";
import { Form, Button, Space, Checkbox } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";

const QuestionOption = () => {
  const editor = useRef(null);
  const [content, setContent] = useState(""); // Store editor content

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
            setContent((prevContent) => prevContent + `<img src="${base64Image}" alt="Pasted Image"/>`);
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
      readonly: false, // All options from https://xdsoft.net/jodit/docs/
      placeholder: "Write your options here...",
      uploader: {
        insertImageAsBase64URI: true,
      },
      events: {
        afterInit: (editor) => {
          console.log("Editor initialized");
        },
        beforePaste: handlePaste, // Add the paste handler here
      },
    }),
    []
  );

  return (
    <>
      {/* Options List */}
      <Form.List
        name="options"
        rules={[
          {
            validator: async (_, options) => {
              if (!options || options.length < 1) {
                return Promise.reject(new Error("At least one option is required"));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                {/* Option Text with JoditEditor */}
                <Form.Item
                  {...restField}
                  name={[name, "optionText"]}
                  fieldKey={[fieldKey, "optionText"]}
                  rules={[{ required: true, message: "Option text is required" }]}
                >
                  <JoditEditor
                    ref={editor}
                    value={content} // Set the content state here
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => {
                      setContent(newContent); // Update state on blur
                    }}
                    onChange={(newContent) => setContent(newContent)} // Update state on change
                  />
                </Form.Item>

                {/* Checkbox for Correct Option */}
                <Form.Item
                  {...restField}
                  name={[name, "isCorrect"]}
                  fieldKey={[fieldKey, "isCorrect"]}
                  valuePropName="checked"
                >
                  <Checkbox>Correct</Checkbox>
                </Form.Item>

                {/* Remove Option */}
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}

            {/* Add Option Button */}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Option
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default QuestionOption;










