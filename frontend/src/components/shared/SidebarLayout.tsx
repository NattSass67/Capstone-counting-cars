/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Image as myImage } from '@/types/image'
import {
  Bars3Icon,
  BuildingOfficeIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  CodeBracketIcon,
  DocumentIcon,
  LockClosedIcon,
  PencilSquareIcon,
  EnvelopeIcon,
  UserIcon,
  XMarkIcon,
  CreditCardIcon,
  UserPlusIcon,
  CpuChipIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
  GlobeAltIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, ReactNode, useEffect, useState } from 'react'
import UserProfile from './UserProfile'
import { Button } from './Button'
import LanguageBar from './LanguageBar'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import useUserDataStore from '@/stores/user-data/user-data'
import { fetchMyProfile } from '@/service/request'
import { useAppRoute } from '@/service/custom'
import OrganizationSelect from '../message-eagle/shared/OrganizationSelect'

interface NavigationItem {
  value: string
  href?: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  children?: NavigationItem[]
  hideChildren?: boolean // New property to hide children in the sidebar
  newTab?: boolean
}

const navigationMenu: NavigationItem[] = [
  {
    value: 'profile',
    href: '/profile',
    icon: UserIcon,
  },
  {
    value: 'dashboard',
    href: '/dashboard',
    icon: ChartBarIcon,
  },
  {
    value: 'pricing',
    href: '/pricing',
    icon: CreditCardIcon,
  },
  {
    value: 'sendername',
    href: '/sender-name',
    icon: UserPlusIcon,
  },
  {
    value: 'otp',
    href: '/otp-sender',
    icon: EnvelopeIcon,
  },
  {
    value: 'template',
    href: '/template',
    icon: DocumentIcon,
  },
  {
    value: 'contacts',
    href: '/contacts',
    icon: PencilSquareIcon,
  },
  {
    value: 'sendmessage',
    href: '/sendmessage',
    icon: PaperAirplaneIcon,
  },
  {
    value: 'api',
    href: '/developers',
    icon: CpuChipIcon,
  },
  {
    value: 'reports',
    href: '/reports',
    icon: DocumentTextIcon,
  },
  {
    value: 'builder',
    href: '/formbuilder',
    icon: ClipboardDocumentListIcon,
  },
  {
    value: 'organization',
    icon: BuildingOfficeIcon,
    children: [
      {
        value: 'general',
        href: '/organization/general',
      },
      {
        value: 'members',
        href: '/organization/members',
      },
      {
        value: 'billing',
        href: '/organization/billing',
      },
    ],
  },
  {
    value: 'shortlink',
    href: '/tracking/dashboard',
    icon: GlobeAltIcon,
    newTab: true,
  },
  {
    value: 'affiliate',
    href: '/affiliate',
    icon: UserGroupIcon,
  },
]

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const t = useTranslations('components.sidebar')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [navigation, setNavigation] = useState(navigationMenu)
  const pathname = usePathname()
  const [sidebarWidth, setSidebarWidth] = useState(0)

  useEffect(() => {
    setSidebarWidth(window.innerWidth - document.documentElement.clientWidth)
    window.addEventListener('resize', () => {
      setSidebarWidth(window.innerWidth - document.documentElement.clientWidth)
    })
  }, [])

  const isChildActive = (item: NavigationItem): boolean => {
    if (!item.children) return false
    return item.children.some((child) => {
      if (child.href) {
        const childPath = child.href.split('/').slice(1)
        const currentPath = pathname.split('/').slice(1)
        return childPath.every((part, index) => part === currentPath[index])
      }
    })
  }

  const renderNavItem = (item: NavigationItem) =>
    !item.newTab ? (
      <li key={item.value}>
        <Link
          href={item?.href ?? ''}
          className={clsx(
            item.href === pathname || isChildActive(item)
              ? 'bg-gray-50 text-indigo-600 dark:bg-zinc-800 dark:text-white'
              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200',
            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
          )}
        >
          {item.icon ? (
            <item.icon
              className={clsx(
                item.href === pathname || isChildActive(item)
                  ? 'text-indigo-600 dark:text-white'
                  : 'text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white',
                'h-6 w-6 shrink-0',
              )}
              aria-hidden="true"
            />
          ) : (
            <div className="h-6 w-6 shrink-0"></div>
          )}
          {t(`navigation.${item.value}`)}
        </Link>
        {item.children && !item.hideChildren && (
          <ul role="list">{item.children.map(renderNavItem)}</ul>
        )}
      </li>
    ) : (
      <li key={item.value}>
        <div
          onClick={() => {
            window.open(item.href, '_blank', 'noopener,noreferrer')
          }}
          className={clsx(
            item.href === pathname || isChildActive(item)
              ? 'bg-gray-50 text-indigo-600 dark:bg-zinc-800 dark:text-white'
              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200',
            'group flex cursor-pointer gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
          )}
        >
          {item.icon ? (
            <item.icon
              className={clsx(
                item.href === pathname || isChildActive(item)
                  ? 'text-indigo-600 dark:text-white'
                  : 'text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white',
                'h-6 w-6 shrink-0',
              )}
              aria-hidden="true"
            />
          ) : (
            <div className="h-6 w-6 shrink-0"></div>
          )}
          {t(`navigation.${item.value}`)}
        </div>
        {item.children && !item.hideChildren && (
          <ul role="list">{item.children.map(renderNavItem)}</ul>
        )}
      </li>
    )

  const session = useSession()
  const user = useUserDataStore()
  const router = useAppRoute()

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchMyProfile()
      data &&
        user.login({
          email: data.email,
          username: data.username,
          profileUrl: data.profileImage && (data.profileImage as myImage).url,
          name: data.name,
          surname: data.surname,
          phone: data.phone_number,
        })
    }
    if (session && session.status == 'authenticated') {
      // console.log("Session",session)
      localStorage.setItem('token', (session.data as any).jwt)
      getProfile()
    } else {
      
    }
  }, [session, user.rehydrated])

  return (
    <>
      <div className="w-full dark:bg-zinc-900">
        <div>
          <Transition show={sidebarOpen} as={Fragment}>
            <Dialog
              className="relative z-50 lg:hidden"
              onClose={setSidebarOpen}
            >
              <TransitionChild
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-900/80" />
              </TransitionChild>

              <div className="fixed inset-0 flex">
                <TransitionChild
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                    <TransitionChild
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                        <Button
                          type="button"
                          variant="ghost"
                          buttonSize="none"
                          className="-m-2.5 p-2.5"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">{t('closeSidebar')}</span>
                          <XMarkIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </Button>
                      </div>
                    </TransitionChild>
                    <div className="flex grow flex-col gap-y-5 bg-white px-6 pb-2 pt-5 dark:bg-zinc-900">
                      {/* <div className="flex h-16 shrink-0 items-center justify-between">
                        <Image
                          width={32}
                          height={32}
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                          alt="Your Company"
                        />
                      </div> */}
                      <OrganizationSelect />
                      <nav className="flex flex-1 flex-col">
                        <ul
                          role="list"
                          className="flex flex-1 flex-col gap-y-7"
                        >
                          <li>
                            <ul role="list" className="-mx-2 space-y-1">
                              {navigation.map(renderNavItem)}
                            </ul>
                          </li>
                          <li className="-mx-6 mt-auto">
                            <UserProfile />
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </Dialog>
          </Transition>
        </div>

        {/* Static sidebar for desktop */}
        <div>
          <div className="relative z-[9999] hidden md:block">
            <LanguageBar />
          </div>

          <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-64 lg:flex-col">
            <div className="no-scrollbar flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pt-5 dark:border-zinc-700 dark:bg-zinc-900">
              {/* <div className="flex h-16 shrink-0 items-center justify-between">
                <Image
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
              </div> */}
              <OrganizationSelect />
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map(renderNavItem)}
                    </ul>
                  </li>
                  <li className="-mx-6 mt-auto">
                    <UserProfile />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden dark:bg-zinc-900">
            <Button
              type="button"
              variant="ghost"
              buttonSize="none"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">{t('openSidebar')}</span>
              <Bars3Icon
                className="h-6 w-6 dark:text-zinc-100"
                aria-hidden="true"
              />
            </Button>
            <div className="flex-1" />
            <a href="#">
              <span className="sr-only">Your profile</span>
              <Image
                width={32}
                height={32}
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </a>
          </div>
          <main className={`w-[calc(100vw_-_${15}px)] lg:pl-64`}>
            <div className="py-10">{children}</div>
          </main>
        </div>
      </div>
    </>
  )
}
