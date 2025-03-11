import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

const variantStyles = {
  primary:
    'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
  secondary:
    'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70',
  soft: 'bg-zinc-100 font-medium text-zinc-700 hover:bg-zinc-200 active:bg-zinc-200 active:text-zinc-700/60 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70',
  outline: `border border-zinc-300 dark:border-zinc-600 bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70`,
  ghost: '',
}

const buttonSizeStyles = {
  none: 'text-sm',
  small: 'py-1 px-2 text-sm',
  normal: 'py-1.5 px-3 text-sm',
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
  buttonSize?: keyof typeof buttonSizeStyles
} & (
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
)

export function Button({
  variant = 'primary',
  buttonSize = 'normal',
  isLoading,
  className,
  ...props
}: ButtonProps & { isLoading?: boolean }) {
  className = clsx(
    'disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-inherit disabled:text-zinc-300 disabled:border disabled:border-zinc-200 disabled:hover:bg-inherit disabled:hover:text-zinc-300 dark:disabled:border-zinc-800 dark:disabled:text-zinc-700 dark:disabled:hover:border-zinc-800 dark:disabled:hover:text-zinc-700 disabled:cursor-not-allowed inline-flex items-center gap-2 justify-center rounded-md outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    buttonSizeStyles[buttonSize],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props}>
      {isLoading && (
        <svg
          className="-ml-1 mr-2 h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {props.children}
    </button>
  ) : (
    <Link className={className} {...props} />
  )
}

export function MyButton({
  clickAction,
  children,
}: {
  clickAction: () => void
  children: ReactNode
}) {
  return (
    <div
      onClick={clickAction}
      className={`modal flex cursor-pointer justify-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600`}
    >
      {children}
    </div>
  )
}
