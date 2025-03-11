'use client'

import { Button } from '@/components/shared/Button'
import { Tab } from '@/models'
import {
  Label,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react'
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useState } from 'react'
import Tabs, { TabItem, TabsGroup, TabsLabel } from './Tabs'
import { useTranslations } from 'next-intl'
import useUserDataStore from '@/stores/user-data/user-data'
import { signOut } from 'next-auth/react'
import { useAppRoute } from '@/service/custom'

const themeTabs: Tab[] = [
  { id: 1, label: 'Light', value: 'light', icon: SunIcon },
  { id: 2, label: 'Dark', value: 'dark', icon: MoonIcon },
  { id: 3, label: 'System', value: 'system', icon: ComputerDesktopIcon },
]

export default function UserProfile() {
  const t = useTranslations('components.userProfile')
  const [currentTab, setCurrentTab] = useState<Tab>(themeTabs[2])
  let { setTheme } = useTheme()

  const onChangeTheme = (tab: Tab['value']) => {
    const selectedTab = themeTabs.find((item) => item.value === tab)

    if (!selectedTab) return
    setTheme(selectedTab.value)
    setCurrentTab(selectedTab)
  }

  const user = useUserDataStore()
  const router = useAppRoute()

  return (
    <Popover className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 ">
      <Image
        width={32}
        height={32}
        className="h-8 w-8 rounded-full bg-gray-50"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <span className="sr-only ">{t('label')}</span>
      <PopoverButton>
        <span
          aria-hidden="true"
          className="text-gray-900 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300"
        >
          Tom Cook
        </span>
      </PopoverButton>
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          anchor="top start"
          className="border-black/2 z-10 min-w-[200px] divide-y rounded-xl border bg-white text-sm/6 [--anchor-gap:4px] dark:divide-white/5 dark:border-white/5 dark:bg-zinc-900"
        >
          <div className="p-3">
            <p>Tom Cook</p>
            <p>tom.cook@mail.com</p>
          </div>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{t('theme.title')}</p>
              <div>
                <Tabs currentTab={currentTab.value} onChange={onChangeTheme}>
                  <TabsLabel className="sr-only">
                    {t('theme.tabsLabel')}
                  </TabsLabel>
                  <TabsGroup className="flex max-w-max gap-0.5 rounded-md p-0.5 dark:bg-zinc-950">
                    {themeTabs.map((tab) => (
                      <TabItem
                        key={tab.id}
                        value={tab.value}
                        className={({ checked }) =>
                          clsx(
                            checked
                              ? 'dark:text-bg-zinc-200 bg-gray-200 text-gray-800 dark:bg-zinc-800'
                              : 'text-gray-600 hover:text-gray-800',
                            'group cursor-pointer rounded-md px-[10px] py-1 text-sm font-medium ',
                          )
                        }
                      >
                        <Label>
                          {tab.icon && (
                            <tab.icon
                              className={clsx(
                                currentTab.id === tab.id
                                  ? 'text-indigo-500'
                                  : 'text-gray-400 group-hover:text-gray-500',
                                'size-4 cursor-pointer ',
                              )}
                              aria-hidden="true"
                            />
                          )}
                        </Label>
                      </TabItem>
                    ))}
                  </TabsGroup>
                </Tabs>
              </div>
            </div>
            <div>
              <p className="font-semibold">
                <a href="#">{t('links.termsAndPolicies')}</a>
              </p>
            </div>
            <div>
              <Button
                variant="ghost"
                buttonSize="none"
                type="button"
                className="font-semibold"
                onClick={async () => {
                  console.log('logout')
                  user.logout()
                  localStorage.removeItem('orgId')
                  await signOut({ redirect: false, callbackUrl: '/' })
                  router.push('/')
                }}
              >
                {t('actions.logout')}
              </Button>
            </div>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}
