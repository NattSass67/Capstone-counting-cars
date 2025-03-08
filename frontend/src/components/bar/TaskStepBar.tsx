export default function TaskStepBar({
  stepNumber,
  stepText,
  totalStep,
}: {
  stepNumber: number;
  stepText: string;
  totalStep: number;
}) {
  return (
    <div className="flex flex-col px-[64px] py-[16px]  space-y-[16px]">
      <h1 className="text-2xl font-bold text-amber-950">
        {"Step " + `${stepNumber}` + ": " + `${stepText}`}
      </h1>
      <div className="h-[40px] w-full  flex rounded-[99px] border-[2.5px] border-amber-950 bg-orange-100 overflow-hidden">
        <div
          className="h-full bg-orange-600"
          style={{ width: `${(stepNumber / totalStep) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
