/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [logResult, setLogResult] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setSelectedFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      console.log("Sending....")
      const response = await axios.post("http://localhost:3001/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response!",response.data);
      setLogResult(response.data.log);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Container>
      <div className="mt-16 max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Test App</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-500 transition"
          >
            Upload Video
          </button>
        </form>

        {/* Video Preview */}
        {videoPreview && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Video Preview:</h2>
            <video
              className="w-full h-auto border rounded-md shadow"
              src={videoPreview}
              controls
            />
          </div>
        )}

        {/* Log Result */}
        {logResult && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Log Result:</h2>
            <pre className="bg-gray-100 p-4 rounded-md shadow">{logResult}</pre>
          </div>
        )}
      </div>
    </Container>
  );
}
