// import React, { useState, useRef, useMemo } from "react";
// import { Form, Input, Checkbox, Upload, Button } from "antd";
// import JoditEditor from "jodit-react";

// const API_URL = process.env.REACT_APP_API_URL;

// const Questiontitle = () => {
//   const editor = useRef(null);
//   const [title, setTitle] = useState("");
//   const [inputType, setInputType] = useState([]);

//   const handleInputTypeChange = (checkedValues) => {
//     setInputType(checkedValues);
//   };

//   const handleTitleChange = (newValue) => {
//     setTitle(newValue);
//   };

//   // Handle paste event to process images
//   const handlePaste = (event) => {
//     const clipboardData = event.clipboardData;
//     const items = clipboardData?.items;

//     if (items) {
//       for (let i = 0; i < items.length; i++) {
//         if (items[i].type.indexOf("image") === 0) {
//           const file = items[i].getAsFile();
//           const reader = new FileReader();

//           reader.onload = (e) => {
//             const base64Image = e.target?.result;
//             setTitle((prevContent) => prevContent + `<img src="${base64Image}" alt="Pasted Image"/>`);
//           };

//           if (file) {
//             reader.readAsDataURL(file);
//           }
//         }
//       }
//     }
//   };

//   // Jodit Editor Config
//   const config = useMemo(
//     () => ({
//       readonly: false,
//       placeholder: "Write your question here...",
//       uploader: {
//         insertImageAsBase64URI: true,
//       },
//       events: {
//         afterInit: (editor) => {
//           console.log("Editor initialized");
//         },
//         beforePaste: handlePaste,
//       },
//     }),
//     []
//   );

//   return (
//     <>
//       {/* Topic */}
//       <Form.Item
//         name="topic"
//         label="Enter your topic"
//         rules={[{ required: true, message: "Please provide a topic" }]}
//       >
//         <Input placeholder="Enter your topic" />
//       </Form.Item>

//       {/* Question Type */}
//       <Form.Item
//         name="questionType"
//         label="Choose your question type"
//         rules={[{ required: true, message: "Please select at least one question type" }]}
//       >
//         <Checkbox.Group onChange={handleInputTypeChange}>
//           <Checkbox value="text">Text Type Question</Checkbox>
//           <Checkbox value="file">Image Type Question</Checkbox>
//         </Checkbox.Group>
//       </Form.Item>

//       {/* Text Question */}
//       {inputType.includes("text") && (
//         <Form.Item
//           name="title"
//           label="Enter Text Question"
//           rules={[{ required: true, message: "Please input your text question" }]}
//         >
//           <JoditEditor
//             ref={editor}
//             value={title}
//             config={config}
//             onChange={handleTitleChange}
//           />
//         </Form.Item>
//       )}

//       {/* Image Question */}
//       {inputType.includes("file") && (
//         <>
//           <Form.Item
//             name="title"
//             label="Enter Description"
//             rules={[{ required: true, message: "Please provide a description" }]}
//           >
//             <Input placeholder="Enter description for the image question" />
//           </Form.Item>

//           <Form.Item
//             name="titlefile"
//             valuePropName="fileList"
//             getValueFromEvent={(e) => {
//               const uploadedFiles = e?.fileList?.map((file) => {
//                 if (file.response) {
//                   return {
//                     name: file.name,
//                     id: file.response?.id || file.response[0]?.id, // Extract ID from server response
//                   };
//                 }
//                 return file;
//               });
//               return uploadedFiles;
//             }}
//             label="Upload Photos"
//           >
//             <Upload.Dragger
//                   name="files"
//                    action={`${API_URL}/upload`}
//                    listType="picture-card"
//                    headers={{
//                    Authorization: `Bearer ${localStorage.getItem("token")}`,
//                             }}
//                  // Add these props:
//                 withCredentials={true}
//                 accept="image/*"
//                   multiple={false}
//                   >
//                <Button>Click to Upload</Button>
//                 </Upload.Dragger>
//           </Form.Item>
//         </>
//       )}
//     </>
//   );
// };

// export default Questiontitle;










import React, { useState, useRef, useMemo } from "react";
import { Form, Input, Checkbox, Upload, Button, message } from "antd";
import JoditEditor from "jodit-react";

const API_URL = process.env.REACT_APP_API_URL;

const Questiontitle = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [inputType, setInputType] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleInputTypeChange = (checkedValues) => {
    setInputType(checkedValues);
  };

  const handleTitleChange = (newValue) => {
    setTitle(newValue);
  };

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

  // Custom upload handler for better error handling
  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const result = await response.json();
      onSuccess(result, file);
      message.success(`${file.name} uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      onError(error);
      message.error(`${file.name} upload failed`);
    } finally {
      setUploading(false);
    }
  };

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
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList?.map(file => ({
                uid: file.uid,
                name: file.name,
                status: file.status,
                url: file.url,
                response: file.response,
                id: file.response?.id || file.id
              }));
            }}
            label="Upload Photos"
          >
            <Upload.Dragger
              name="file"
              customRequest={customRequest}
              listType="picture-card"
              multiple={false}
              accept="image/*"
              showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: true,
                showDownloadIcon: false
              }}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith('image/');
                if (!isImage) {
                  message.error('You can only upload image files!');
                }
                const isLt50M = file.size / 1024 / 1024 < 50;
                if (!isLt50M) {
                  message.error('Image must be smaller than 50MB!');
                }
                return isImage && isLt50M;
              }}
            >
              <Button loading={uploading}>Click to Upload</Button>
            </Upload.Dragger>
          </Form.Item>
        </>
      )}
    </>
  );
};

export default Questiontitle;