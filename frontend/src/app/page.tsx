/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import AppHeader from "@/components/AppHeader";
import TestComponent from "@/components/TestComponent";
import CrossIcon from "@/components/Icon/CrossIcon";
import CheckMarkIcon from "@/components/Icon/CheckMarkIcon";
import JobsPanel from "@/components/JobsPanel";

export default function Home() {
  return (
    <div className="">
      <AppHeader />
      <div className="flex flex-col space-y-[16px]">
        <div className="py-[24px] flex items-center w-full">
          <h1 className="text-2xl  w-full text-center font-bold text-amber-900">
            Automated vehicle counting and classification at intersections and
            straight road
          </h1>
        </div>
        <JobsPanel />
      </div>

      {/* <CrossIcon />
      <CheckMarkIcon /> */}
      <TestComponent />
    </div>
    //
  );
}
