/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import authFormJson from '@/render-props/myAuthForms.json'

import { Container } from '@/components/components-gpts/layout/Container'
import avatarImage from '@/images/promptbase.jpg'
import { useLocation, useNavigate, useParams } from '@tanstack/react-router'
import { useSearchBarStore } from '@/stores/search-bar/search-bar'
import { SearchBarRedirect, SearchBarMobile } from './SearchBar'
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
  Transition,
  TransitionChild
} from '@headlessui/react'
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  Cog8ToothIcon,
  ShoppingBagIcon,
  HeartIcon
} from '@heroicons/react/20/solid'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'
import { Bars3Icon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { Link } from '@tanstack/react-router'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { MyPopover } from '../shared/Popover'
import { ProfileImage } from '../shared/CanvasProfile'
import { useThemeStore } from '@/stores/theme/theme'
import { useUserDataStore } from '@/stores/user-data/user-data'

export function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ButtonProfile() {
  const user= useUserDataStore()
  const isLoggedin = user.isAuthenticated
  const profileUrl = undefined
  const username = 'Natt Sass'
  const navigate = useNavigate({ from: '/$locale' })
 

  return (
    <MyPopover
      icon={
        <div className="flex h-10 w-10 items-center justify-center gap-1 overflow-hidden rounded-full">
          {isLoggedin ? (
            profileUrl ? (
              <img src={profileUrl} className="h-10 w-10" alt="" />
            ) : (
              <div className="scale-50">
                <ProfileImage username={username} />
              </div>
            )
          ) : (
            <UserCircleIcon className="h-7 w-7" />
          )}
        </div>
      }>
      <div className="mb-8 ml-4 flex w-48 flex-col rounded-lg bg-white text-sm shadow-lg ring-1 ring-zinc-900/10 backdrop-blur-sm dark:bg-zinc-800 dark:ring-zinc-300/10">
        {!isLoggedin && (
          <PopoverButton
            onClick={() => {
              navigate({ to: '/$locale/login' })
            }}
            className="nav-toggle modal flex px-3 py-1.5 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-700/20">
            <div>Log in</div>
          </PopoverButton>
        )}

        {isLoggedin && (
          <PopoverButton
            onClick={() => {
              navigate({ to: '/$locale/profile/my-profile' })
            }}
            className="nav-toggle flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-700/20">
            <UserCircleIcon className="h-4 w-4" />
            <div>Public Profile</div>
          </PopoverButton>
        )}

        {isLoggedin && (
          <PopoverButton
            onClick={() => {
              navigate({ to: '/$locale/account', search: { view: 'purchased' } })
            }}
            className="nav-toggle flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-700/20">
            <ShoppingBagIcon className="h-4 w-4" />
            <div>Purchased</div>
          </PopoverButton>
        )}

        {isLoggedin && (
          <PopoverButton
            onClick={() => {
              navigate({ to: '/$locale/account', search: { view: 'favorite' } })
            }}
            className="nav-toggle flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-700/20">
            <HeartIcon className="h-4 w-4" />
            <div>Favorite</div>
          </PopoverButton>
        )}

        {isLoggedin && (
          <PopoverButton
            onClick={() => {
              navigate({ to: '/$locale/account', search: { view: 'settings' } })
            }}
            className="nav-toggle flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-700/20">
            <Cog8ToothIcon className="h-4 w-4" /> <div>Settings</div>
          </PopoverButton>
        )}
      </div>
    </MyPopover>
  )
}

function ButtonChangeLang() {
  const locale = usePathname().split('/')[1]
  return (
    <Link
      to="/"
      className="group h-10 rounded-full bg-white/90 p-3 text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.0}
        stroke="currentColor"
        className="size-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
        />
      </svg>
    </Link>
  )
}

function SearchBarButton() {
  const locale = usePathname().split('/')[1]
  const searchBar = useSearchBarStore()
  return (
    <button
      onClick={() => {
        searchBar.setIsOpen(true)
      }}
      className="nav-toggle group flex h-10 w-10 items-center justify-center rounded-full bg-white/90 p-2 text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
      <MagnifyingGlassIcon
        className="pointer-events-none h-5 w-5 text-zinc-800 dark:text-zinc-200"
        aria-hidden="true"
      />
    </button>
  )
}

function SunIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
        fill="none"
      />
    </svg>
  )
}

function MoonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MobileNavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <PopoverButton as={Link} to={href} className="block py-2">
        {children}
      </PopoverButton>
    </li>
  )
}

function MobileNavigation(props: React.ComponentPropsWithoutRef<typeof Popover>) {
  const local = usePathname().split('/')[1]
  return (
    <Popover {...props}>
      <PopoverButton className="group rounded-full bg-white/90 px-3 py-3 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20">
        <Bars3Icon className="block h-4 w-4" aria-hidden="true" />
      </PopoverButton>
      <Transition>
        <TransitionChild>
          <PopoverBackdrop
            className={clsx([
              'fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80',
              'data-[closed]:opacity-0',
              'data-[leave]:duration-150 data-[leave]:ease-in',
              'data-[enter]:duration-150 data-[enter]:ease-out'
            ])}
          />
        </TransitionChild>
        <TransitionChild>
          <PopoverPanel
            focus
            className={clsx([
              'fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800',
              'data-[closed]:scale-95 data-[closed]:opacity-0',
              'data-[leave]:duration-150 data-[leave]:ease-in',
              'data-[enter]:duration-150 data-[enter]:ease-out'
            ])}>
            <div className="flex flex-row-reverse items-center justify-between">
              <PopoverButton aria-label="Close menu" className="-m-1 p-1">
                <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
              </PopoverButton>
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Navigation</h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                <MobileNavItem href={'/' + local + '/marketplace'}>Marketplace</MobileNavItem>
                <MobileNavItem href={'/' + local + '/app'}>Apps</MobileNavItem>
                <MobileNavItem href={'/' + local + '/create'}>Create</MobileNavItem>
                <MobileNavItem href={'/' + local + '/account' + '?view=favorite'}>
                  Account
                </MobileNavItem>
              </ul>
            </nav>
            <nav className="mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Switch theme
                </h2>
                <ThemeToggle />
              </div>
            </nav>
          </PopoverPanel>
        </TransitionChild>
      </Transition>
    </Popover>
  )
}

export function NavItem({
  href,
  children,
  spa = true
}: {
  href: string
  children: React.ReactNode
  spa?: boolean
}) {
  let isActive = usePathname() === href

  return (
    <li className="flex items-center">
      {spa && (
        <Link
          to={href}
          className={clsx(
            'relative block rounded-md px-3 py-1.5 transition',
            isActive ? 'text-zinc-800 dark:text-teal-200' : ''
          )}>
          {children}
        </Link>
      )}
      {!spa && (
        <a
          href={href}
          className={clsx(
            'relative block rounded-md px-3 py-1.5 transition hover:bg-zinc-50 dark:hover:bg-zinc-800',
            isActive ? 'bg-zinc-50 text-zinc-800 dark:bg-zinc-800 dark:text-teal-200' : ''
          )}>
          {children}
        </a>
      )}
    </li>
  )
}

function DesktopNavigation() {
  const local = usePathname().split('/')[1]
  const searchBar = useSearchBarStore()
  const navRef = useRef<HTMLDivElement>(null)

  const path = useLocation().pathname.split('/')

  const active = path[2] != 'marketplace' && path[2] != 'chat' && path[2] != 'create'

  return (
    <div
      className={clsx(
        'nav-toggle relative w-full transition',
        searchBar.primaryTransition ? 'translate-y-12 md:translate-y-0' : ''
      )}>
      {searchBar.primaryTransition && (
        <div
          className={clsx(
            'absolute flex h-full w-full justify-center gap-4',
            'duration-400 transition',
            searchBar.secondaryTransition ? 'opacity-100' : '-translate-y-12 scale-50 opacity-0'
          )}>
          <div
            className={clsx(
              'flex cursor-pointer items-center',
              searchBar.searchProduct == 'Prompts' ? 'font-medium' : ''
            )}
            onClick={() => {
              searchBar.setSearchProduct('Prompts')
            }}>
            Prompts
          </div>
          <div
            className={clsx(
              'flex cursor-pointer items-center',
              searchBar.searchProduct == 'Bundles' ? 'font-medium' : ''
            )}
            onClick={() => {
              searchBar.setSearchProduct('Bundles')
            }}>
            Bundles
          </div>
          <div
            className={clsx(
              'flex cursor-pointer items-center',
              searchBar.searchProduct == 'Apps' ? 'font-medium' : ''
            )}
            onClick={() => {
              searchBar.setSearchProduct('Apps')
            }}>
            Apps
          </div>
        </div>
      )}
      <nav
        className={clsx(
          'mx-auto hidden w-full rounded-full bg-white/90 text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition-all duration-500 ease-out sm:block md:duration-200 dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10',
          searchBar.secondaryTransition ? 'h-16 max-w-[672px]' : 'h-10 max-w-[270px]',
          searchBar.primaryTransition ? 'translate-y-[60px]' : 'translate-y-0'
        )}
        ref={navRef}>
        {!searchBar.secondaryTransition && (
          <ul
            className={clsx(
              'flex rounded-full text-sm font-medium transition',
              searchBar.isOpen ? 'h-14 scale-x-105 px-1.5' : `h-10 ${active ? 'pl-1.5' : 'px-1.5'}`
            )}>
            <NavItem href={'/' + local + '/marketplace'}>Marketplace</NavItem>
            <NavItem href={'/' + local + '/app'}>Apps</NavItem>
            <NavItem href={'/' + local + '/create'}>Create</NavItem>
            {/* <NavItem href={'/' + local + '/sell '}>Sell</NavItem> */}

            {active && (
              <li className={clsx(['flex items-center p-1'])}>
                <button
                  onClick={() => {
                    searchBar.setIsOpen(true)
                  }}
                  className="nav-toggle flex items-center justify-center rounded-full bg-zinc-800 p-1.5 ring-1 ring-zinc-300/10">
                  <MagnifyingGlassIcon
                    className="pointer-events-none h-5 w-5 text-zinc-200 dark:text-zinc-400"
                    aria-hidden="true"
                  />
                </button>
              </li>
            )}
          </ul>
        )}
        {searchBar.secondaryTransition && <SearchBarRedirect />}
      </nav>
    </div>
  )
}

export function ThemeToggle() {
  let { resolvedTheme, setTheme } = useTheme()
  const themeState = useThemeStore()
  let otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
  let [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
      className="group h-10 rounded-full bg-white/90 px-2 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={() => {
        setTheme(otherTheme)
        themeState.setTheme(otherTheme)
        // dispatch(appFunction.setTheme(otherTheme))
      }}>
      <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600" />
      <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500" />
    </button>
  )
}

export function AvatarContainer({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10'
      )}
      {...props}
    />
  )
}

export function Avatar() {
  return (
    <div aria-label="Home">
      <Image
        src={avatarImage}
        alt=""
        sizes={'2.25rem'}
        className={clsx(
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
          false ? 'h-16 w-16' : 'h-9 w-9'
        )}
        priority
      />
    </div>
  )
}

export function HeaderGPT() {
  let isHomePage = usePathname() === '/'
  let { resolvedTheme, setTheme } = useTheme()
  const themeState = useThemeStore()
  const searchBar = useSearchBarStore()
  const params = useParams({ from: '/$locale' })
  const forms = authFormJson
  const [isMdScreen, setIsMdScreen] = useState(false) // State to track screen size
  const path = useLocation().pathname.split('/')
  const active = path[2] != 'marketplace' && path[2] != 'chat'

  const handleOutsideClick = (event: any) => {
    if (!event.target.closest('.nav-toggle')) {
      searchBar.setIsOpen(false)
      console.log('closed via out')
    }
  }

  const handleScroll = () => {
    isMdScreen && searchBar.setIsOpen(false) // Close search bar on scroll
  }

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMdScreen(window.innerWidth >= 768) // Tailwind's md breakpoint is 768px
    }

    checkScreenSize() // Check on initial render
    window.addEventListener('resize', checkScreenSize) // Check on resize
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', checkScreenSize) // Clean up listener
      window.addEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    setTheme(themeState.resolvedTheme)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [isHomePage, setTheme])

  return (
    <>
      {searchBar.isOpen && (
        <div className="fixed inset-0 z-30 hidden bg-zinc-400/40 sm:block dark:bg-zinc-600/50"></div>
      )}
      <header
        className={`pointer-events-none z-30 transition-all ease-out ${searchBar.isOpen ? 'sm:h-[212px] md:h-[164px]' : 'h-[80px]'} absolute left-0 top-0 z-30 flex w-full flex-none flex-col bg-white py-5 ring-1 ring-zinc-900/10 dark:bg-zinc-900 dark:ring-zinc-300/20`}>
        <div className="z-10 flex h-10 items-center">
          <Container className="w-full">
            <div className="flex gap-4">
              <div className="relative z-10 flex gap-x-2 md:flex-1">
                <Link
                  to="/$locale"
                  params={{ locale: params.locale }}
                  className="pointer-events-auto flex items-center gap-2">
                  {true && (
                    <AvatarContainer>
                      <Avatar />
                    </AvatarContainer>
                  )}
                  <p className="hidden items-center text-2xl font-bold text-zinc-800 md:flex dark:text-zinc-200">
                    PromptBase
                  </p>
                </Link>
              </div>

              <div className="pointer-events-auto hidden w-[270px] items-center sm:flex md:justify-center">
                <div
                  className={clsx(
                    'flex justify-center',
                    !isMdScreen
                      ? searchBar.primaryTransition
                        ? 'absolute inset-0'
                        : ''
                      : searchBar.primaryTransition
                        ? 'absolute inset-0'
                        : ''
                  )}>
                  <DesktopNavigation />
                </div>
              </div>

              <div className="z-10 flex flex-1 items-center justify-end">
                <div className="pointer-events-auto flex gap-x-2">
                  <div className="flex items-center px-4">
                    <a href={'/' + params.locale + '/chat '}>
                      <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
                    </a>
                  </div>

                  {active && (
                    <div className="flex items-center sm:hidden">
                      <SearchBarButton />
                    </div>
                  )}
                  <div className="flex items-center">
                    <ButtonChangeLang />
                  </div>
                  <div className="hidden items-center md:flex">
                    <ThemeToggle />
                  </div>
                  <div className="hidden items-center sm:flex">
                    <ButtonProfile />
                  </div>
                  <div className="flex items-center">
                    <MobileNavigation className="pointer-events-auto md:hidden" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {searchBar.isOpen && (
        <div className="z-30">
          <SearchBarMobile />
        </div>
      )}
    </>
  )
}
