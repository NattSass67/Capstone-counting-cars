import { Dayjs } from "dayjs";
import dayjs from "dayjs";

export interface subjob {
  status: number;
  resultUrl: string;
  videoUrl: string;
}

export interface job {
  intersectionName: string;
  date: Dayjs;
  direction: string;
  subjob: subjob[];
}
