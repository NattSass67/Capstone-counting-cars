import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import { Controller, useFormContext } from 'react-hook-form'

export function MySwitch({
  name,
  upperLabel,
  sideLabel,
  sideDescriptions,
  myOnChange,
  value,
}: {
  name?: string
  upperLabel?: string
  sideLabel?: string
  sideDescriptions?: string
  myOnChange?: (value: boolean) => void
  value?: boolean
}) {
  const { control } = useFormContext()
  return (
    <div className="w-fit">
      {upperLabel ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium leading-6 text-zinc-800 dark:text-zinc-100"
        >
          {upperLabel}
        </label>
      ) : (
        <></>
      )}
      <div className="flex flex-row items-center">
        {name ? (
          <Controller
            name={name ?? ''}
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={field.onChange}
                className={clsx(
                  field.value ? 'bg-zinc-700' : 'bg-zinc-200',
                  'relative ml-1 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-offset-1',
                )}
              >
                <span
                  aria-hidden="true"
                  className={clsx(
                    field.value ? 'translate-x-4' : '-translate-x-1',
                    'pointer-events-none ml-1 inline-block h-5 w-5 transform rounded-full bg-zinc-100 shadow ring-0 transition duration-200 ease-in-out',
                  )}
                />
              </Switch>
            )}
          />
        ) : (
          <div>
            <Switch
              checked={value ?? false}
              onChange={(e) => {
                myOnChange && myOnChange(e)
              }}
              className={clsx(
                value ? 'bg-zinc-700' : 'bg-zinc-200',
                'relative ml-1 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-offset-1',
              )}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  value ? 'translate-x-4' : '-translate-x-1',
                  'pointer-events-none ml-1 inline-block h-5 w-5 transform rounded-full bg-zinc-100 shadow ring-0 transition duration-200 ease-in-out',
                )}
              />
            </Switch>
          </div>
        )}
        {sideLabel ? (
          <label
            htmlFor={name}
            className="ml-2 block text-nowrap text-sm font-medium leading-6 text-zinc-800 dark:text-zinc-100"
          >
            {sideLabel}
          </label>
        ) : (
          <></>
        )}
        {sideDescriptions ? (
          <div className="ml-2 hidden w-fit text-sm font-medium leading-6 text-zinc-400 sm:block lg:hidden">
            {sideDescriptions}
          </div>
        ) : (
          <></>
        )}
      </div>
      {sideDescriptions ? (
        <div className="mt-1 block w-fit text-sm font-medium leading-6 text-zinc-400 sm:hidden lg:block">
          {sideDescriptions}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
