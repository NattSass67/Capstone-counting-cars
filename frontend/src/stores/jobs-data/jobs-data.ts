/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { VideoData } from "@/components/VideoUploaderK1";
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
}

// Create the store
const useJobsDataStore = create(
  persist<JobsDataState>(
    (set) => ({
      jobsData: {
        intersectionName: "",
        date: "",
        direction: "",
        video: Array.from({ length: 4 }, () => ({
          video: null,
          startTime: "",
          endTime: "",
        })),
      }, // Initialize as null or default state
      setJobsData: (data: JobsData) => set({ jobsData: data }),
      resetJobsData: () =>
        set({
          jobsData: {
            intersectionName: "",
            date: "",
            direction: "",
            video: Array.from({ length: 4 }, () => ({
              video: null,
              startTime: "",
              endTime: "",
            })),
          },
        }),
    }),
    {
      name: "job-data-storage", // Name of the item in storage
      storage: createJSONStorage(() => localStorage), // Using localStorage
      version: 1,
    }
  )
);

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
