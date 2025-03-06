import TaskStepBar from "@/components/bar/TaskStepBar";

export default function NewJobStep2() {
  return (
    <div className="flex flex-col space-y-[16px]">
      <TaskStepBar stepNumber={2} stepText="ลาก counting line" totalStep={3} />
    </div>
  );
}
