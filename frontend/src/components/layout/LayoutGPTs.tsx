/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Footer } from '@/components/components-gpts/layout/Footer'
import { HeaderGPT } from '@/components/components-gpts/layout/HeaderGPT'
import { useLocation } from '@tanstack/react-router'
import { useEffect }from 'react'
import { useSession } from 'next-auth/react'
import useUserDataStore from '@/stores/user-data/user-data'
import { fetchMyProfile } from '@/service/request'
import type { Image } from '@/types/image'

export function LayoutGPTs({ children }: { children: React.ReactNode }) {
  const path = useLocation().pathname.split('/')
  const session = useSession()
  const user = useUserDataStore()

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchMyProfile()
      user.login({
        email: data.email,
        username: data.username,
        profileUrl: data.profileImage && (data.profileImage as Image).url
      })
    }
    if (session && session.status == 'authenticated') {
      getProfile()
    }else{
      user.logout()
    }
  }, [session])

  const Active = path[2] != 'create' && path[2] != 'chat'
  return (
    <>
      <div className="fixed inset-0 flex justify-center">
        <div className="flex w-full max-w-7xl px-6 md:px-10">
          <div className="w-full bg-white dark:bg-zinc-900" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <HeaderGPT />
        <main className="flex-auto">{children}</main>
        {/* {Active && <FooterGPT />} */}
        {Active && <Footer />}
      </div>
    </>
  )
}
