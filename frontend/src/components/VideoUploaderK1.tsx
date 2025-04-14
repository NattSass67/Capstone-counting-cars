/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { VideoData } from "@/service/interface";
import { TimePicker } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ButtonK1 from "./button/ButtonK1";

export default function VideoUploaderK1({
  onChange,
  index,
  onDelete,
  totalVideo,
  currentVideo,
}: {
  onChange: (data: any) => void;
  index: number;
  onDelete: (index: number) => void;
  totalVideo: number;
  currentVideo?: File | null;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [initial, setInitial] = useState<boolean>(true);

  const [data, setData] = useState<VideoData>({
    video: null,
    startTime: "07:00",
    endTime: "07:00",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("currentVideo", currentVideo);
    if (currentVideo && currentVideo instanceof Blob) {
      setSelectedFile(currentVideo);
      try {
        const url = URL.createObjectURL(currentVideo);
        setVideoPreviewUrl(url);
        console.log(url);
        return () => {
          if (url) URL.revokeObjectURL(url);
        };
      } catch (error) {
        console.error("Error creating URL for video:", error);
      }
    }
  }, [currentVideo]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setData({
        ...data,
        video: file,
      });
      try {
        const url = URL.createObjectURL(file);
        setVideoPreviewUrl(url);
      } catch (error) {
        console.error("Error creating URL for selected file:", error);
      }
    }
  };

  const handleTimeChange = (type: "startTime" | "endTime", value: string) => {
    setData({
      ...data,
      [type]: value,
    });
  };

  useEffect(() => {
    if (initial) {
      setInitial(false);
      console.log("initial", currentVideo);
    } else {
      console.log("Setdata ", data);
      onChange && onChange(data);
    }
  }, [data]);

  const showDeleteButton = index == totalVideo - 1;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 border-t border-amber-950 pt-10">
      <div className="pb-4 flex flex-row justify-between items-center">
        <h1 className="text-xl font-bold text-amber-950">
          คลิปที่ {index + 1}
        </h1>
        {showDeleteButton && (
          <ButtonK1 text="remove this video" onClick={() => onDelete(index)} />
        )}
      </div>
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 overflow-hidden">
        {/* Video Preview Background */}
        {videoPreviewUrl && (
          <video
            className="absolute inset-0 object-cover opacity-50 z-0"
            src={videoPreviewUrl}
            loop
            muted
            playsInline
          />
        )}

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-xl mb-2">Upload Video จากเครื่อง</h2>
          <p className="text-gray-500 mb-4">
            Upload Video ความยาวไม่เกิน 1 ชั่วโมง
          </p>

          {!selectedFile && (
            <div className="flex flex-col items-center justify-center">
              <ButtonK1
                roundedNumber={8}
                text="เลือก Video"
                onClick={() => fileInputRef.current?.click()}
              />
            </div>
          )}

          {selectedFile && (
            <div className="text-amber-950">
              <p>Selected file: {selectedFile.name}</p>
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="video/*"
          className="hidden"
        />
      </div>

      <div className="mt-6">
        <h3 className="text-xl mb-2 text-amber-950">ข้อมูลของ video</h3>
        <p className=" text-amber-950 mb-4">
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
