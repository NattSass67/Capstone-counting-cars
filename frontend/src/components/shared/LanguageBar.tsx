import { useEffect, useState } from 'react'
import LocaleSwitcher from './LocaleSwitcher'
import { useLocale } from 'next-intl'
import { Button } from './Button'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter } from '@/lib/i18nNavigation'

const LanguageBar = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [currentLocale, setCurrentLocale] = useState<string>(locale)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale')
    if (storedLocale) {
      setCurrentLocale(storedLocale)
      router.push(pathname, { locale: storedLocale })
      router.refresh()
    } else {
      setIsVisible(true)
    }
  }, [currentLocale, pathname, router])

  const handleLanguageChange = (locale: string) => setCurrentLocale(locale)

  const handleContinue = () => {
    localStorage.setItem('locale', currentLocale)
    setIsVisible(false)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="bg-black text-white lg:px-8">
      <div className="items-around relative mx-auto flex h-max max-w-7xl flex-col flex-wrap gap-4 bg-black p-4 text-white lg:h-20 lg:flex-row lg:items-center">
        <div className="max-w-md pr-8 text-xs leading-4">
          เลือกประเทศหรือภูมิภาคอื่น
          หากต้องการดูเนื้อหาตามตำแหน่งที่ตั้งของคุณและเลือกซื้อสินค้าบนออนไลน์
        </div>
        <div className="flex flex-1 gap-4 lg:justify-end lg:pl-8">
          <div className="min-w-[252px] max-w-[349px] flex-grow">
            <LocaleSwitcher
              value={currentLocale}
              onChange={handleLanguageChange}
            />
          </div>
          <Button
            buttonSize="small"
            onClick={handleContinue}
            className="!bg-zinc-100 text-zinc-900 lg:px-4"
          >
            ต่อไป
          </Button>
          <Button
            className="absolute right-4 top-4 lg:static"
            onClick={handleClose}
            buttonSize="none"
            variant="ghost"
          >
            <XMarkIcon className="size-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LanguageBar
