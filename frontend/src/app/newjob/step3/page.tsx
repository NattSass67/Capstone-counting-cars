/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'

import TaskStepBar from "@/components/bar/TaskStepBar";
import ButtonK1 from "@/components/button/ButtonK1";
import { useRouter } from "next/navigation";
import useJobsDataStore from "@/stores/jobs-data/jobs-data";
import useJobsProcessingDataStore from "@/stores/processsing-jobs/processing-jobs";

export default function NewJobStep3() {
  const router = useRouter();
  const { jobsData } = useJobsDataStore();
  const { addJobsProcessingData } = useJobsProcessingDataStore();
  return (
    <div className="flex flex-col space-y-[16px] py-16">
      <TaskStepBar
        stepNumber={3}
        stepText="ยืนยันการลาก counting line"
        totalStep={3}
      />
      <div className="flex flex-col w-full h-[200px] justify-center items-center">
        Coming soon
      </div>
      <div className="flex justify-center pb-16">
        <ButtonK1
          text="Confirm"
          showIconLeft={true}
            onClick={() => {
              jobsData && addJobsProcessingData(jobsData);
              router.push("/");
            }}
          />
      </div>
    </div>
  );
}
