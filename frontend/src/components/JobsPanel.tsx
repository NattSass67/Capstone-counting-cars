import { job } from "@/service/interface";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import SingleJob from "./SingleJob";

export default function JobsPanel() {
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
  const mockdata: job[] = [
    {
      intersectionName: "เเยกM1",
      date: dayjs(),
      direction: "ม่งทิศเหนือ",
      subjob: [
        {
          status: 0,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
        {
          status: 1,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
        {
          status: 2,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
        {
          status: 0,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
      ],
    },
    {
      intersectionName: "เเยกM1",
      date: dayjs(),
      direction: "ม่งทิศเหนือ",
      subjob: [
        {
          status: 0,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
        {
          status: 1,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
        {
          status: 2,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
        {
          status: 0,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col space-y-[24px] px-[64px]">
      <h1 className="text-2xl text-amber-900 py-[8px] px-[16px] font-bold">
        Jobs List
      </h1>
      {mockdata.map((job, index) => (
        <SingleJob key={index} SingleJob={job} number={index + 1} />
      ))}
    </div>
  );
}
