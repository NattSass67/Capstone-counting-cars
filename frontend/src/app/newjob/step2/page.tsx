"use client";

import TaskStepBar from "@/components/bar/TaskStepBar";
import ButtonK1 from "@/components/button/ButtonK1";
import { useRouter } from "next/navigation";

export default function NewJobStep2() {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-[16px] pt-16">
      <TaskStepBar stepNumber={2} stepText="ลาก counting line" totalStep={3} />
      <div className="flex flex-col w-full h-[200px] justify-center items-center">
        Coming soon
      </div>
      <div className="flex justify-center pb-16">
        <ButtonK1
          text="Confirm"
          showIconLeft={true}
            onClick={() => {
              router.push("/newjob/step3");
            }}
          />
      </div>
    </div>
  );
}
