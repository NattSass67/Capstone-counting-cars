"use client";

import { usePathname } from "next/navigation";

export default function AppFooter() {
  const pathname = usePathname();
  const show = !pathname.includes("newjob");
  if (!show) return null;
  return (
    <div className="w-full h-[216px] flex flex-row bg-orange-950 px-[56px] py-[32px] space-x-[32px]">
      <div className="flex flex-col space-y-[8px]">
        <h1 className="font-semibold text-white grow-0 text-base">Text1</h1>
        <h1 className="text-white grow-0 text-sm">Text2</h1>
        <h1 className="text-white grow-0 text-sm">Text3</h1>
        <h1 className="text-white grow-0 text-sm">Text4</h1>
        {/* <div className="inline-block">
          <h1 className="font-semibold text-white grow-0 text-lg">Text1</h1>
        </div>
        <div className="inline-block">
          <h1 className="text-white grow-0 text-base">Text2</h1>
        </div> */}
      </div>
    </div>
  );
}
