'use client'
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { useEffect, useState } from 'react'
import { Button } from './Button'
import { Fragment } from 'react'
import clsx from 'clsx'

export default function Modal({
  children,
  open,
  onSave,
  onClose,
}: {
  children: React.ReactNode
  open: string
  onSave?: () => void
  onClose?: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  function closeModal() {
    setIsOpen(false)
    onClose && onClose()
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    // Handle component unmounting while animating
    return () => {
      if (fadeOut && onClose) {
        onClose()
      }
    }
  }, [fadeOut, onClose])

  return (
    <div className="w-full">
      <Button
        type="button"
        className="flex w-full"
        variant="secondary"
        onClick={openModal}
      >
        {open}
      </Button>
      <Transition appear={isOpen} show={isOpen} as={Fragment}>
        <Dialog
          open={isOpen}
          onClose={() => {
            closeModal()
            onClose && onClose()
          }}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-zinc-900/60 transition" />
              {/* <div
                className={`fixed inset-0 transition-opacity duration-200 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              /> */}
            </TransitionChild>
            <TransitionChild
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <DialogPanel className="relative h-fit w-fit">
                {children}
                <Button
                  className="absolute bottom-4 right-4 h-10"
                  type="button"
                  onClick={() => {
                    closeModal()
                    onSave && onSave()
                  }}
                >
                  Save
                </Button>
                <Button
                  className="absolute bottom-4 right-20 h-10"
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    onClose && onClose()
                    closeModal()
                  }}
                >
                  Cancel
                </Button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

// 'use client'
// import {
//   Dialog,
//   DialogPanel,
//   Transition,
//   TransitionChild,
// } from '@headlessui/react'
// import { useState, Fragment, useEffect } from 'react'
// import { Button } from './Button'

// export default function Modal({
//   children,
//   open,
//   onSave,
//   onClose,
// }: {
//   children: React.ReactNode
//   open: string
//   onSave?: () => void
//   onClose?: () => void
// }) {
//   const [isOpen, setIsOpen] = useState(false)
//   const [isAnimating, setIsAnimating] = useState(false)

//   function closeModal() {
//     // Start the leave animation
//     setIsAnimating(true)

//     // Wait for the animation to complete before closing the dialog
//     setTimeout(() => {
//       setIsOpen(false)
//       setIsAnimating(false)
//       if (onClose) {
//         onClose()
//       }
//     }, 200) // This should match the CSS transition duration
//   }

//   function openModal() {
//     setIsOpen(true)
//     setIsAnimating(false)
//   }

//   useEffect(() => {
//     // Handle component unmounting while animating
//     return () => {
//       if (isAnimating && onClose) {
//         onClose()
//       }
//     }
//   }, [isAnimating, onClose])

//   return (
//     <div className="w-full">
//       <Button
//         type="button"
//         className="flex w-full"
//         variant="secondary"
//         onClick={openModal}
//       >
//         {open}
//       </Button>
//       {isOpen && (
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-50"
//           onClose={closeModal}
//           open={isOpen}
//         >
//           <div
//             className={`fixed inset-0 transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
//             style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//           />
//           <DialogPanel
//             className={`left-1/2 top-1/2 m-6 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-4 shadow-xl transition duration-200 ${isAnimating ? 'hidden' : 'fixed'}`}
//           >
//             {children}
//             <div className="absolute bottom-4 right-4 flex space-x-4">
//               <Button
//                 onClick={() => {
//                   if (onSave) onSave()
//                   closeModal()
//                 }}
//               >
//                 Save
//               </Button>
//               <Button variant="secondary" onClick={closeModal}>
//                 Cancel
//               </Button>
//             </div>
//           </DialogPanel>
//         </Dialog>
//       )}
//     </div>
//   )
// }
