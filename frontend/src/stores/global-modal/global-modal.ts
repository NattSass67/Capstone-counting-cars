import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Define the user profile interface
export interface GlobalModal {
  currentOpenModalId: string
}

// Define the store state and actions interface
interface GlobalModalState {
  targetModal: GlobalModal
  setTargetModal: (id: string) => void
  clearTargetModal: () => void
}

// Create the store
const  useGlobalModalStore  = create(
  persist<GlobalModalState>(
    (set) => ({
      targetModal: {
        currentOpenModalId: '',
      },
      setTargetModal: (id) => set({ targetModal: { currentOpenModalId: id } }),
      clearTargetModal: () => set({ targetModal: { currentOpenModalId: '' } }),
    }),
    {
      name: 'global-modal-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage) // specify which storage to use (localStorage or sessionStorage)
    },
  ),
)

export { useGlobalModalStore }
