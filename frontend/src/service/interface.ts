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

export interface jobK2 extends job {
  id: number;
}

export interface jobTable {
  direction: string;
  id: number;
  name: string;
  intersectionName: string;
  date: string;
  countingState: string;
}

export interface VideoData {
  video: File | null;
  startTime: string;
  endTime: string;
}

export interface singleSubjobResult {
  sjid: string;
  intersectionName: string;
  date: Dayjs;
  direction: string;
  startTime: string;
  stopTime: string;
  type1: number;
  type2: number;
  type3: number;
  type4: number;
}
