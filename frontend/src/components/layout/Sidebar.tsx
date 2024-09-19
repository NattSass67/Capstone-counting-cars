'use client'

import { Avatar, AvatarContainer } from '@/components/components-gpts/layout/HeaderGPT'
import { useAppRoute } from '@/service/custom'

import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import {
    Bars3Icon,
    HeartIcon,
    MoonIcon,
    SunIcon,
    UserIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  let { resolvedTheme, setTheme } = useTheme()
  const router = useAppRoute()
  const locale = useAppRoute().locale
  const pathName = usePathname()
  const navigation = [
    {
      name: 'My account',
      href: '/' + locale + '/dashboard/my-account',
      icon: UserIcon,
      current: '/' + locale + '/dashboard/my-account' === pathName
    },
    {
      name: 'Saved',
      href: '/' + locale + '/dashboard/saved',
      icon: HeartIcon,
      current: '/' + locale + '/dashboard/saved' === pathName
    }
  ]

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div>
        <div className="fixed left-0 top-0 z-40 flex h-20 items-center px-6 md:hidden md:px-10 xl:px-20">
          <button
            type="button"
            className="-m-2.5 rounded-full border border-zinc-900/10 bg-white p-2.5 text-zinc-800 dark:border-zinc-300/20 dark:bg-zinc-800 dark:text-zinc-200"
            onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Dialog className="relative z-50 md:hidden" open={sidebarOpen} onClose={setSidebarOpen}>
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-zinc-900/70 backdrop-blur-sm transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full">
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 ring-1 ring-white/10 backdrop-blur-3xl dark:bg-zinc-800/50">
                <div className="flex items-center justify-between">
                  <a href="/" className="pointer-events-auto flex gap-2 py-5">
                    {true && (
                      <AvatarContainer>
                        <Avatar />
                      </AvatarContainer>
                    )}
                    <p className="hidden items-center text-2xl font-bold text-zinc-800 sm:flex dark:text-zinc-200">
                      GPTs Hunter
                    </p>
                  </a>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
                                  : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800',
                                'group flex gap-x-3 rounded-md p-2 font-semibold leading-6'
                              )}>
                              <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <a className="group -mx-2 flex h-10 items-center justify-between gap-x-3 rounded-md pl-2 font-semibold leading-6 text-zinc-600 dark:text-zinc-400">
                        <div>Theme</div>
                        <div className="flex items-center overflow-hidden rounded-md bg-zinc-200 p-1 dark:bg-zinc-700/50">
                          <button
                            onClick={() => {
                              setTheme('light')
                              // dispatch(appFunction.setTheme('light'))
                            }}
                            className={`rounded-md p-1 ${resolvedTheme == 'light' ? 'bg-white shadow dark:bg-zinc-700' : ''}`}>
                            <SunIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                          </button>
                          <button
                            onClick={() => {
                              setTheme('dark')
                              // dispatch(appFunction.setTheme('dark'))
                            }}
                            className={`rounded-md p-1 ${resolvedTheme == 'dark' ? 'bg-white shadow dark:bg-zinc-700' : ''}`}>
                            <MoonIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                          </button>
                        </div>
                      </a>
                      <a
                        href={'/' + locale + '/choose-country-region'}
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 font-semibold leading-6 text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800">
                        Language
                      </a>
                      <a
                        onClick={() => {
                          // dispatch(logoutUser())
                          router.push('/')
                        }}
                        className="group -mx-2 flex cursor-pointer gap-x-3 rounded-md p-2 font-semibold leading-6 text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800">
                        Log out
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="z-30 hidden md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-zinc-900/10 bg-white px-6 pb-4 backdrop-blur-3xl dark:border-zinc-300/20 dark:bg-zinc-800/50">
            <nav className="flex flex-1 flex-col">
              <div className="flex items-center justify-between">
                <Link href="/" className="pointer-events-auto z-50 flex gap-2 py-5">
                  {true && (
                    <AvatarContainer>
                      <Avatar />
                    </AvatarContainer>
                  )}
                  <p className="hidden items-center text-2xl font-bold text-zinc-800 sm:flex dark:text-zinc-200">
                    GPTs Hunter
                  </p>
                </Link>
              </div>

              <ul role="list" className="mt-5 flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
                              : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800',
                            'group flex gap-x-3 rounded-md p-2 font-semibold leading-6'
                          )}>
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="mt-auto">
                  <a className="group -mx-2 flex h-10 items-center justify-between gap-x-3 rounded-md pl-2 font-semibold leading-6 text-zinc-600 dark:text-zinc-400">
                    <div>Theme</div>
                    <div className="flex items-center overflow-hidden rounded-md bg-zinc-200 p-1 dark:bg-zinc-700/50">
                      <button
                        onClick={() => {
                          setTheme('light')
                          // dispatch(appFunction.setTheme('light'))
                        }}
                        className={`rounded-md p-1 ${resolvedTheme == 'light' ? 'bg-white shadow dark:bg-zinc-700' : ''}`}>
                        <SunIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => {
                          setTheme('dark')
                          // dispatch(appFunction.setTheme('dark'))
                        }}
                        className={`rounded-md p-1 ${resolvedTheme == 'dark' ? 'bg-white shadow dark:bg-zinc-700' : ''}`}>
                        <MoonIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                      </button>
                    </div>
                  </a>
                  <a
                    href={'/' + locale + '/choose-country-region'}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 font-semibold leading-6 text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800">
                    Language
                  </a>
                  <a
                    onClick={() => {
                      // dispatch(logoutUser())
                      router.push('/')
                    }}
                    className="group -mx-2 flex cursor-pointer gap-x-3 rounded-md p-2 font-semibold leading-6 text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800">
                    Log out
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="min-h-screen bg-zinc-100 md:pl-72 dark:bg-inherit">
          <main className="py-10">
            <div className="">{children}</div>
          </main>
        </div>
      </div>
    </>
  )
}
