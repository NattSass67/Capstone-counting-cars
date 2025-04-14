/* eslint-disable @typescript-eslint/no-explicit-any */

import { VideoData } from "@/service/interface";
import { create } from "zustand";

// Define the user profile interface

export interface JobsData {
  intersectionName?: string;
  date?: string;
  direction?: string;
  video?: VideoData[];
}

// Define the store state and actions interface
interface JobsDataState {
  jobsData: JobsData | null;
  setJobsData: (data: JobsData) => void;
  resetJobsData: () => void;
  addJobsData: () => void;
  removeJobData: () => void;
}

// Create the store
const useJobsDataStore = create<JobsDataState>((set, get) => ({
  jobsData: {
    intersectionName: "",
    date: "",
    direction: "",
    video: [
      {
        video: null,
        startTime: "",
        endTime: "",
      },
    ],
  },

  setJobsData: (data: JobsData) => {
    console.log("Setdata store", data);
    set({ jobsData: data });
  },

  addJobsData: () => {
    const current = get().jobsData;
    if (!current) return;
    const newVideoData = {
      video: null,
      startTime: "",
      endTime: "",
    };
    set({
      jobsData: {
        ...current,
        video: [...(current.video || []), newVideoData],
      },
    });
  },

  removeJobData: () => {
    const current = get().jobsData;
    if (!current || !current.video?.length) return;
    const updatedVideoList = current.video.slice(0, -1);
    set({
      jobsData: {
        ...current,
        video: updatedVideoList,
      },
    });
  },

  resetJobsData: () =>
    set({
      jobsData: {
        intersectionName: "",
        date: "",
        direction: "",
        video: [
          {
            video: null,
            startTime: "",
            endTime: "",
          },
        ],
      },
    }),
}));

export default useJobsDataStore;

//This is example state-------------------------
// interface State {
//   count: number
//   increment: () => void
//   decrement: () => void
// }

//Example Persist!!
// const countPersist = create(
//   persist<State>(
//     (set) => ({
//       count: 0,
//       increment: () => set((state) => ({ count: state.count + 1 })),
//       decrement: () => set((state) => ({ count: state.count - 1 }))
//     }),
//     {
//       name: 'counter-storage', // name of the item in the storage (must be unique)
//       storage: createJSONStorage(() => localStorage) // specify which storage to use (localStorage or sessionStorage)
//     }
//   )
// )

//Example Normal
// const countNormal = create<State>((set) => ({
//   count: 0,
//   increment: () => set((state) => ({ count: state.count + 1 })),
//   decrement: () => set((state) => ({ count: state.count - 1 }))
// }))

// export { useUserDataStore }
