/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import { TimePicker } from "antd";
import { useEffect } from "react";
import { VideoData } from "@/service/interface";
import ButtonK1 from "./button/ButtonK1";

export default function VideoUploaderK1({
  onChange,
  index,
  onDelete,
  totalVideo,
}: {
  onChange: (data: any) => void;
  index: number;
  onDelete: Function;
  totalVideo: number;
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
    // props.onChange && props.onChange(data);
    onChange && onChange(data);
  }, [data]);

  let showDeleteButton = index == totalVideo - 1;

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
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
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
