/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import TaskStepBar from "@/components/bar/TaskStepBar";
import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import { Dayjs } from "dayjs";
import VideoUploaderK1, { VideoData } from "@/components/VideoUploaderK1";
import useJobsDataStore, { JobsData } from "@/stores/jobs-data/jobs-data";
import { Button } from "@headlessui/react";
import ButtonK1 from "@/components/button/ButtonK1";
import { useRouter } from "next/navigation";

export default function NewJobStep1() {
  // const onChange: DatePickerProps<Dayjs[]>["onChange"] = (date, dateString) => {
  //   console.log(date, dateString);
  // };
  const router = useRouter();

  const [videoUploaders, setVideoUploaders] = useState<number>(4);

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

  useEffect(() => {
    resetJobsData();
  }, []);

  return (
    <div className="flex flex-col space-y-[16px] pt-16">
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
              needConfirm
              className="w-full h-[48px] focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-row space-x-[8px] items-center mb-2">
            <div className="flex flex-row w-[30%]">
              <h1 className="text-xl text-amber-950 ">Direction (ทิศทาง):</h1>
            </div>

            <input
              type="text"
              id="interName"
              name="interName"
              onChange={(e) => onFormChange(e.target.value, "direction")}
              className="bg-gray-100 h-[48px] px-[32px] w-full rounded-[8px]
          border-[2.5px] border-transparent focus:border-orange-500 focus:outline-none"
              placeholder="ทิศทาง"
            />
          </div>
          {/* <div className="flex flex-col gap-8 my-8">
            <VideoUploaderK1
              onChange={(data) => onFormChange(data, "video", "array", 0)}
            />
            <VideoUploaderK1
              onChange={(data) => onFormChange(data, "video", "array", 1)}
            />
            <VideoUploaderK1
              onChange={(data) => onFormChange(data, "video", "array", 2)}
            />
            <VideoUploaderK1
              onChange={(data) => onFormChange(data, "video", "array", 3)}
            />
          </div> */}
          <div className="flex flex-col gap-8 my-8">
            {Array.from({ length: videoUploaders }).map((_, index) => (
              <VideoUploaderK1
                key={index}
                onChange={(data) => onFormChange(data, "video", "array", index)}
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
            onClick={() => setVideoUploaders((prev) => prev + 1)}
          />
        </div>
        <div className="flex-grow-0 justify-center items-center flex">
          <ButtonK1
            text="Confirm"
            showIconLeft={false}
            onClick={() => {
              router.push("/newjob/step2");
            }}
          />
        </div>
      </div>
    </div>
  );
}
