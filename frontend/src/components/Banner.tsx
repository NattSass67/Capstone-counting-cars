import { APPNAME, AppDescription } from "@/constant/constValue";

export default function Banner() {
  return (
    <div className="px-[96px] py-[72px] flex flex-col space-y-[8px] bg-amber-200 priority-100">
      <h1 className=" text-2xl font-bold text-amber-950">{APPNAME}</h1>
      <h1 className="text-base text-amber-950">{AppDescription}</h1>
    </div>
  );
}
