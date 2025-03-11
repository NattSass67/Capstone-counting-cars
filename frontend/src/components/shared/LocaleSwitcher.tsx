import { LocaleSwitcherProps } from '@/models'
import { AppConfig } from '@/utils/AppConfig'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

export default function LocaleSwitcher({
  onChange,
  value,
}: LocaleSwitcherProps) {
  const t = useTranslations('locale')
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="relative">
          <ListboxButton className="relative flex w-full cursor-default items-center rounded-md bg-zinc-700 py-1.5 pl-3 pr-10 text-left text-zinc-200 shadow-sm ring-0 ring-inset ring-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <CheckIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            <span className="block truncate pl-2">{t(value)}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <Transition
            show={open}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-[9999] mt-1 max-h-60 w-full overflow-auto rounded-md bg-zinc-700 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {AppConfig.locales.map((elt) => (
                <ListboxOption
                  key={elt}
                  value={elt}
                  className={({ focus }) =>
                    clsx(
                      focus ? 'bg-zinc-600 text-white' : '',
                      !focus ? 'text-zinc-100' : '',
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                    )
                  }
                >
                  {({ selected, focus }) => (
                    <span
                      className={clsx(
                        selected ? 'font-semibold' : 'font-normal',
                        'block truncate dark:text-zinc-100',
                      )}
                    >
                      {t(elt)}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}
