import { job } from "@/service/interface";
import Image from "next/image";
import SingleSubJob from "./SingleSubJob";
import { formatThaiDate } from "@/service/formatThaiDate";
import CrossIcon from "./Icon/CrossIcon";

export default function SingleJob({
  SingleJob,
  number,
}: {
  SingleJob: job;
  number: number;
}) {
  /*export interface job {
  intersectionName: string;
  date: Dayjs;
  direction: string;
  subjob: subjob[];
}
  export interface subjob {
  status: number;
  resultUrl: string;
  videoUrl: string;
} */
  return (
    <div className="w-full flex flex-col space-y-[16px] px-[32px] py-[24px] bg-orange-100 border-[3px] border-orange-950 rounded-[16px]">
      <div className=" w-full flex flex-row px-[32px] justify-between">
        <h1 className="text-2xl font-bold text-amber-950">
          {"งาน " +
            number +
            " : " +
            SingleJob.intersectionName +
            " " +
            formatThaiDate(SingleJob.date) +
            " " +
            SingleJob.direction}
        </h1>
        <CrossIcon />
      </div>

      <div className="flex flex-col justify-center space-y-[16px] px-[64px]">
        {SingleJob.subjob.map((subjob, index) => (
          <SingleSubJob
            key={index}
            status={subjob.status}
            resultUrl={subjob.resultUrl}
            imageUrl={subjob.videoUrl}
          />
        ))}
      </div>
    </div>
  );
}
