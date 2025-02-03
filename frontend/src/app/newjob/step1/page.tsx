import TaskStepBar from "@/components/bar/TaskStepBar";
import { useState } from "react";

export default function NewJobStep1() {
  return (
    <div>
      <TaskStepBar stepNumber={1} stepText="สร้างงานใหม่" totalStep={3} />
      <h1>กรอกข้อมูลเกี่ยวกับชุดข้อมูล</h1>
    </div>
  );
}
