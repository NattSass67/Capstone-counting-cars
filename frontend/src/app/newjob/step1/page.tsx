/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// import "bootstrap/dist/css/bootstrap.min.css";

import TaskStepBar from "@/components/bar/TaskStepBar";
import { useEffect, useReducer, useState } from "react";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import VideoUploaderK1 from "@/components/VideoUploaderK1";
import useJobsDataStore, { JobsData } from "@/stores/jobs-data/jobs-data";
import ButtonK1 from "@/components/button/ButtonK1";
import { useRouter } from "next/navigation";
import Modal from "react-bootstrap/Modal";

export default function NewJobStep1() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const router = useRouter();

  const ADD_VIDEO = "ADD_VIDEO";
  const RESET_VIDEOS = "RESET_VIDEOS";
  const REMOVE_VIDEO = "REMOVE_VIDEO";

  // Reducer function
  const reducer = (state: number, action: { type: string }) => {
    switch (action.type) {
      case ADD_VIDEO:
        return state + 1;
      case RESET_VIDEOS:
        return 4; // Reset to default count
      case REMOVE_VIDEO:
        return state - 1;
      default:
        return state;
    }
  };

  const [videoCount, dispatch] = useReducer(reducer, 4, (initial) => {
    return Number(localStorage.getItem("videoCount")) || initial;
  });

  const { jobsData, setJobsData, resetJobsData } = useJobsDataStore();

  const onFormChange = (
    data: any,
    path: keyof JobsData,
    type?: "array" | "object",
    arrayIndex?: number
  ) => {
    if (!jobsData) return;

    if (type === "array" && arrayIndex !== undefined) {
      const newJobsData = [...(jobsData[path] as any[])];
      newJobsData[arrayIndex] = {
        ...newJobsData[arrayIndex],
        [path]: data,
      };
      setJobsData({
        ...jobsData,
        [path]: newJobsData,
      });
    } else {
      setJobsData({ ...jobsData, [path]: data });
    }
  };
  // useEffect(() => {
  //   const savedCount = Number(localStorage.getItem("videoCount")) || 4;
  //   dispatch({ type: RESET_VIDEOS, payload: savedCount }); // Update videoCount
  // }, []);
  useEffect(() => {
    resetJobsData();
    localStorage.setItem("videoCount", videoCount.toString());
  }, [videoCount]);

  return (
    <div className="flex flex-col space-y-[16px] pt-16 ">
      <TaskStepBar stepNumber={1} stepText="สร้างงานใหม่" totalStep={3} />
      <h1 className="text-amber-950 font-bold text-xl px-[64px]">
        กรอกข้อมูลเกี่ยวกับชุดข้อมูล
      </h1>
      <form action="" className="flex flex-col space-y-[16px] px-[64px]">
        <div className="w-full max-w-3xl mx-auto p-4">
          <div className="flex flex-row space-x-[8px] items-center mb-2">
            <div className="flex flex-row w-[30%]">
              <h1 className="text-xl text-amber-950 ">
                Intersection Name (ชื่อเเยก):
              </h1>
            </div>
            <input
              type="text"
              id="interName"
              name="interName"
              onChange={(e) => onFormChange(e.target.value, "intersectionName")}
              className="bg-gray-100 h-[48px] px-[32px] w-full rounded-[8px]
          border-[2.5px] border-transparent focus:border-orange-500 focus:outline-none"
              placeholder="ชื่อเเยก"
            />
          </div>
          <div className="flex flex-row space-x-[8px] items-center mb-2">
            <div className="flex flex-row w-[30%] ">
              <h1 className="text-xl text-amber-950">Date (วัน/เดือน/ปี):</h1>
            </div>
            <DatePicker
              onChange={(date, dateString) => onFormChange(dateString, "date")}
              className="w-full h-[48px] focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-row space-x-[8px] items-center mb-2">
            <div className="flex flex-row w-[30%]">
              <h1 className="text-xl text-amber-950 ">Direction (ทิศทาง):</h1>
            </div>
            <input
              type="text"
              id="direction"
              name="direction"
              onChange={(e) => onFormChange(e.target.value, "direction")}
              className="bg-gray-100 h-[48px] px-[32px] w-full rounded-[8px]
          border-[2.5px] border-transparent focus:border-orange-500 focus:outline-none"
              placeholder="ทิศทาง"
            />
          </div>
          <div className="flex flex-col gap-8 my-8">
            {Array.from({ length: videoCount }).map((_, index) => (
              <VideoUploaderK1
                key={index}
                index={index}
                totalVideo={videoCount}
                onChange={(data) => onFormChange(data, "video", "array", index)}
                onDelete={(index: number) => {
                  // dispatch({ type: REMOVE_VIDEO });
                  handleShow();
                }}
              />
            ))}
          </div>
        </div>
      </form>
      <div className="flex justify-center flex-col space-y-[8px] ">
        <div className="flex-grow-0 justify-center items-center flex">
          <ButtonK1
            text="Add more video"
            showIconLeft={false}
            onClick={() => dispatch({ type: ADD_VIDEO })}
          />
        </div>
        <div className="flex-grow-0 justify-center items-center flex">
          <ButtonK1
            text="Confirm"
            showIconLeft={false}
            onClick={() => router.push("/newjob/step2")}
          />
        </div>
      </div>
      {show && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleClose}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white border-[2.5px] border-amber-950 rounded-[8px] p-4 w-[90%] max-w-md shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-black hover:text-gray-900"
              onClick={handleClose}
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="text-center">
              <h1 className="text-xl font-bold text-red-500">Warning!!</h1>
            </div>

            {/* Modal Body */}
            <div className="text-center mt-2">
              <h1 className="text-base text-amber-950">
                คุณเเน่ใจที่จะลบคลิปวิดีนี้ใช่หรือไม่
              </h1>
            </div>

            {/* Modal Footer (Buttons) */}
            <div className="flex justify-center space-x-4 mt-4">
              <ButtonK1 text="ยกเลิก" onClick={handleClose} />
              <ButtonK1
                text="ยืนยัน"
                onClick={() => {
                  dispatch({ type: REMOVE_VIDEO });
                  handleClose();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
