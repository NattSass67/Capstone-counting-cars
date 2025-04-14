/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Footer } from '@/components/shared/Footer'
import { Header } from '@/components/shared/Header'
import { usePathname } from '@/lib/i18nNavigation'
import { fetchMyProfile } from '@/service/request'
import useUserDataStore from '@/stores/user-data/user-data'
import { Image } from '@/types/image'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import LanguageBar from './LanguageBar'

export function Layout({ children }: { children: React.ReactNode }) {
  let isSearchPage = usePathname().includes('search')
  let isTrackPage =
    usePathname().includes('tracking') || usePathname().includes('landing')

  const session = useSession()
  const user = useUserDataStore()

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchMyProfile()

      data &&
        user.login({
          email: data.email,
          username: data.username,
          profileUrl: data.profileImage && (data.profileImage as Image).url,
          name: data.name,
          surname: data.surname,
          phone: data.phone_number,
        })
    }
    if (session && session.status == 'authenticated') {
      console.log('Session', session)
      getProfile()
    } else {
      user.logout()
    }
  }, [session])

  return (
    <>
      <div className="fixed flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <LanguageBar />
        {!isTrackPage && <Header />}
        <main className="flex-auto">{children}</main>
        {!isSearchPage && !isTrackPage && <Footer />}
      </div>
    </>
  )
}
