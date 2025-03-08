/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import axios from "axios";

const VideoUploader = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>({});

  // Initialize WebSocket connection
  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      transports: ["websocket"],
    });
    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on("frame-processed", (data) => {
      console.log("Received processed frame", data);
      setResult({
        label_counts_in: data.label_counts_in || {},
        label_counts_out: data.label_counts_out || {},
      });

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = `data:image/jpeg;base64,${data.frame}`; // or 'data:image/png;base64,' if using PNG

        img.onload = () => {
          // Set canvas size to match the image size (1280x720)
          canvas.width = img.width;
          canvas.height = img.height;
          if (!ctx) {
            return;
          }
          // Draw the image without scaling
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Draw bounding boxes
          data.detections.forEach((detection: any) => {
            const [x1, y1, x2, y2] = detection.bbox;

            // Set styles for bounding boxes
            ctx.strokeStyle = "green";
            ctx.lineWidth = 2;
            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

            // Optionally, add labels
            ctx.fillStyle = "yellow";
            ctx.font = "16px Arial";
            ctx.fillText(detection.label, x1, y1 - 5);
          });

          // Draw the crossing line in blue
          ctx.strokeStyle = "blue";
          ctx.lineWidth = 2;
          ctx.beginPath();

          if (data.line_orientation === "horizontal") {
            // Draw a horizontal line across the canvas at the specified y-coordinate
            ctx.moveTo(0, data.line_position);
            ctx.lineTo(canvas.width, data.line_position);
          } else {
            // Draw a vertical line down the canvas at the specified x-coordinate
            ctx.moveTo(data.line_position, 0);
            ctx.lineTo(data.line_position, canvas.height);
          }

          ctx.stroke();
        };
      }
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  // Handle video file upload
  const handleVideoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("video", file);

    setProcessing(true); // Show a loading indicator if needed

    try {
      // Upload video to the server for processing
      const res = await axios.post("http://localhost:5000/detect", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Video uploaded successfully", res.data);
    } catch (error) {
      console.error("Error uploading video", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Upload Video for Processing
      </h1>

      {/* File Input to Upload Video */}
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Upload Video
      </label>
      <input
        id="file-upload"
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        className="hidden"
      />

      {/* Canvas for displaying processed frames */}
      <canvas
        ref={canvasRef}
        className="w-full max-w-3xl mx-auto border-2 mt-4 border-gray-300 rounded-lg shadow-md"
      ></canvas>

      {processing && <div className="text-gray-800 mt-8">Processing video...</div>}
      <div className="text-gray-800 mt-8">
        <h2 className="font-semibold">In Counts</h2>
        <pre>{JSON.stringify(result.label_counts_in, null, 2)}</pre>

        <h2 className="font-semibold mt-4">Out Counts</h2>
        <pre>{JSON.stringify(result.label_counts_out, null, 2)}</pre>
      </div>
    </div>
  );
};

export default VideoUploader;
