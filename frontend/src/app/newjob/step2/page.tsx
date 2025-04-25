/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import TaskStepBar from "@/components/bar/TaskStepBar";
import ButtonK1 from "@/components/button/ButtonK1";
import { useRouter } from "next/navigation";
import DrawableBoard from "@/components/DrawableBoard";
import useJobsDataStore from "@/stores/jobs-data/jobs-data";
import { getVideoThumbnail } from "@/lib/utils/getThumbnail";
import { useState, useEffect } from "react";
import { Line } from "@/components/DrawableBoard";
import useJobsProcessingDataStore from "@/stores/processsing-jobs/processing-jobs";
import axios from "axios";

export default function NewJobStep2() {
  const { addJobsProcessingData } = useJobsProcessingDataStore();
  const router = useRouter();
  const { jobsData } = useJobsDataStore();
  const file = jobsData?.video?.[0]?.video;

  const [lines, setLines] = useState<Line[]>([]);
  const [bgImage, setBgImage] = useState<string | null>(null);

  const onSubmit = async () => {
    if (!jobsData || !jobsData.video?.length || lines.length === 0) {
      alert("กรุณาอัปโหลดวิดีโอและวาดเส้นก่อน");
      return;
    }

    const payload = {
      lines,
      jobsData,
    };

    // 1. Create FormData
    const formData = new FormData();

    // 2. Append videos (File objects)
    payload.jobsData?.video?.forEach((vid, index) => {
      if (vid.video) {
        formData.append("videos", vid.video); // multiple videos, same key
      }
    });

    // 3. Append jobsData **without the File**
    const jobsDataWithoutFiles = {
      ...payload.jobsData,
      video: payload.jobsData?.video?.map(({ startTime, endTime }) => ({
        startTime,
        endTime,
      })),
    };

    // 4. Append the rest as JSON
    formData.append("lines", JSON.stringify(payload.lines));
    formData.append("jobsData", JSON.stringify(jobsDataWithoutFiles));

    try {
      const response = await axios.post("/api/jobs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload success:", response.data);
      router.push("/test-uploader");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    }
  };

  useEffect(() => {
    if (file) {
      getVideoThumbnail(file).then(setBgImage).catch(console.error);
    }
  }, [file]);

  return (
    <div className="flex flex-col space-y-[16px] pt-16">
      <TaskStepBar stepNumber={2} stepText="ลาก counting line" totalStep={2} />
      <DrawableBoard bgImage={bgImage} onChange={setLines} />
      <div className="flex justify-center pb-16">
        <ButtonK1
          text="Confirm"
          showIconLeft={true}
          onClick={() => {
            onSubmit();
          }}
        />
      </div>
    </div>
  );
}
