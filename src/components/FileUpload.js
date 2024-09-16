import React, { useState } from "react";
import axios from "axios";

var local_url = "http://localhost:8000"
var vercel_url = "https://web-gen-backend.vercel.app"

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${vercel_url}/upload-flask-app/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Failed to upload file.");
    }
  };

  // Handle deleting files
  const handleDeleteFiles = async () => {
    try {
      const response = await axios.delete(`${vercel_url}/delete-files/`);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error deleting files:", error);
      setMessage("Failed to delete files.");
    }
  };

  return (
    <div>
      <h2>Upload Flask App Zip</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <button onClick={handleDeleteFiles} style={{ marginTop: "20px" }}>Delete All Files</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;
