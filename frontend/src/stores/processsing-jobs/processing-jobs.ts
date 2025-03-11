/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { JobsData } from "../jobs-data/jobs-data";
// Define the user profile interface


// Define the store state and actions interface
interface JobsProcessingDataState {
  data: JobsData[];
  addJobsProcessingData: (data: JobsData) => void;
  setJobsProcessingData: (data: JobsData[]) => void;
  resetJobsProcessingData: () => void;
}

// Create the store
const useJobsProcessingDataStore = create(
  persist<JobsProcessingDataState>(
    (set) => ({
      data: [],
      addJobsProcessingData: (data: JobsData) =>
        set((state) => ({ data: [...state.data, data] })),
      setJobsProcessingData: (data: JobsData[]) => set({ data: data }),
      resetJobsProcessingData: () => set({ data: [] }),
    }),
    {
      name: "job-processing-data-storage", // Name of the item in storage
      storage: createJSONStorage(() => localStorage), // Using localStorage
      version: 1,
    }
  )
);

export default useJobsProcessingDataStore;

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
