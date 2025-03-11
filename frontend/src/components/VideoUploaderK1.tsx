/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import { TimePicker } from "antd";
import { useEffect } from "react";

export interface VideoData {
  video: File | null;
  startTime: string;
  endTime: string;
}

export default function VideoUploader(props: {
  onChange: (data: any) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [data, setData] = useState<VideoData>({
    video: null,
    startTime: "07:00",
    endTime: "07:00",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setData({
        ...data,
        video: file,
      });
    }
  };

  const handleTimeChange = (type: "startTime" | "endTime", value: string) => {
    setData({
      ...data,
      [type]: value,
    });
  };

  useEffect(() => {
    console.log(data);
    props.onChange && props.onChange(data);
  }, [data]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 border-t border-gray-300 pt-10">
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
        <h3 className="text-xl mb-2">ข้อมูลของ video</h3>
        <p className="text-gray-600 mb-4">
          ช่วงเวลาของวิดีโอ (เช่น 07:00 - 07:15):
        </p>

        <div className="flex justify-center items-center gap-4 text-lg">
          <span>จาก</span>
          <div className="relative">
            <TimePicker
              onChange={(value, dateString) =>
                handleTimeChange("startTime", dateString as any)
              }
              className="text-lg h-[48px]"
              format="HH:mm"
            />
          </div>

          <span>ถึง</span>
          <div className="relative">
            <TimePicker
              onChange={(value, dateString) =>
                handleTimeChange("endTime", dateString as any)
              }
              className="text-lg h-[48px]"
              format="HH:mm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
