"use client";

import React, { useRef, useState } from "react";
import { TimePicker } from "antd";

interface TimeRange {
  startTime: string;
  endTime: string;
}

export default function VideoUploader() {
  const format = "HH:mm";
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>({
    startTime: "07:00",
    endTime: "07:00",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleTimeChange = (type: "startTime" | "endTime", value: string) => {
    setTimeRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleNowClick = (type: "startTime" | "endTime") => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
    handleTimeChange(type, currentTime);
  };

  const handleClear = (type: "startTime" | "endTime") => {
    handleTimeChange(type, "07:00");
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
        <h2 className="text-xl mb-2">Upload a Video Here</h2>
        <p className="text-gray-500 mb-4">
          Upload Video ความยาวไม่เกิน 15 นาที
        </p>

        {!selectedFile && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            เลือก Video
          </button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="video/*"
          className="hidden"
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg mb-2">ข้อมูลของ video</h3>
        <p className="text-gray-600 mb-4">
          ช่วงเวลาของวิดีโอ (เช่น 07:00 - 07:15):
        </p>

        <div className="flex justify-center items-center gap-4">
          <span>จาก</span>
          <div className="relative">
            <TimePicker
              format={format}
              onChange={(value) => handleTimeChange("endTime", value as any)}
            />
          </div>

          <span>ถึง</span>
          <div className="relative">
            <TimePicker
              format={format}
              onChange={(value) => handleTimeChange("endTime", value as any)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
