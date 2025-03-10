"use client";

import TaskStepBar from "@/components/bar/TaskStepBar";
import { useState } from "react";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import { Dayjs } from "dayjs";
import VideoUploaderK1 from "@/components/VideoUploaderK1";

export default function NewJobStep1() {
  const onChange: DatePickerProps<Dayjs[]>["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="flex flex-col space-y-[16px]">
      <TaskStepBar stepNumber={1} stepText="สร้างงานใหม่" totalStep={3} />
      <h1 className="text-amber-950 font-bold text-2xl px-[64px]">
        กรอกข้อมูลเกี่ยวกับชุดข้อมูล
      </h1>
      <form action="" className="flex flex-col space-y-[16px] px-[64px]">
        <div className="flex flex-row space-x-[8px] items-center">
          <div className="flex flex-row w-[30%]">
            <h1 className="text-xl text-amber-950 ">
              Intersection Name (ชื่อเเยก):
            </h1>
          </div>

          <input
            type="text"
            id="interName"
            name="interName"
            className="bg-gray-100 h-[48px] px-[32px] w-full rounded-[8px]
          border-[2.5px] border-transparent focus:border-orange-500 focus:outline-none"
            placeholder="ชื่อเเยก"
          />
        </div>
        <div className="flex flex-row space-x-[8px] items-center">
          <div className="flex flex-row w-[30%] ">
            <h1 className="text-xl text-amber-950">Date (วัน/เดือน/ปี):</h1>
          </div>
          <DatePicker
            onChange={onChange}
            needConfirm
            className="w-full h-[48px] focus:border-orange-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-row space-x-[8px] items-center">
          <div className="flex flex-row w-[30%]">
            <h1 className="text-xl text-amber-950 ">Direction (ทิศทาง):</h1>
          </div>

          <input
            type="text"
            id="interName"
            name="interName"
            className="bg-gray-100 h-[48px] px-[32px] w-full rounded-[8px]
          border-[2.5px] border-transparent focus:border-orange-500 focus:outline-none"
            placeholder="ทิศทาง"
          />
        </div>
        <VideoUploaderK1 />
        <VideoUploaderK1 />
        <VideoUploaderK1 />
        <VideoUploaderK1 />
      </form>
      <div></div>
    </div>
  );
}
