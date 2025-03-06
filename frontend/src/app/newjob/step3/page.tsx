import TaskStepBar from "@/components/bar/TaskStepBar";

export default function NewJobStep3() {
  return (
    <div className="flex flex-col space-y-[16px]">
      <TaskStepBar
        stepNumber={3}
        stepText="ยืนยันการลาก counting line"
        totalStep={3}
      />
    </div>
  );
}
