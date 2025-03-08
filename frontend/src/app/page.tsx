/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import JobsPanel from "@/components/JobsPanel";
import Banner from "@/components/Banner";
import FeatureSection from "@/components/FeatureSection";
import { APPNAME, AppDescriptionFull } from "@/constant/constValue";
import JobsPanelK3 from "@/components/JobsPanelK3";

export default function Home() {
  return (
    <div className="bg-white">
      {/* <AppHeader /> */}
      <Banner />
      <div className="flex flex-col space-y-[64px] px-[64px] py-[64px]">
        <FeatureSection />
        <div className="flex flex-col space-y-[32px]">
          <h1 className="font-bold text-3xl text-orange-950">
            {"What is " + APPNAME}
          </h1>
          <h1 className="text-base text-orange-950 ">{AppDescriptionFull}</h1>
        </div>
        <JobsPanelK3 />
      </div>
    </div>
    //
  );
}
