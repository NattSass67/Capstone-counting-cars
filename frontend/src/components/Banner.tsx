"use client";

import { APPNAME, AppDescription } from "@/constant/constValue";
import { Container } from "./layout/Container";
import { usePathname } from "next/navigation";

export default function Banner() {
  const pathname = usePathname();
  const show = !(pathname.includes("newjob") || pathname.includes("howtouse"));

  if (!show) return null;
  return (
    <div className=" w-screen px-[96px] py-[72px] flex flex-col space-y-[8px] bg-gradient-to-b from-orange-400 to-white priority-100">
      <h1 className=" text-2xl font-bold text-amber-950">{APPNAME}</h1>
      <h1 className="text-base text-amber-950">{AppDescription}</h1>
    </div>
  );
}
