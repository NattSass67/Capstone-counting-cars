import clsx from 'clsx'
import { forwardRef } from 'react'

type InputLabelProps = {
  /**
   * Whether this component use custom styles in `className`
   */
  custom?: boolean
} & React.ComponentPropsWithRef<'label'>

export const InputLabel = ({
  className,
  custom,
  children,
  ...rest
}: InputLabelProps) => {
  return (
    <label
      className={clsx(
        custom
          ? className
          : `block text-sm font-medium leading-6 text-gray-900 dark:text-zinc-100 ${className}`,
      )}
      {...rest}
    >
      {children}
    </label>
  )
}

type InputProps = {
  /**
   * Whether this component use custom styles in `className`
   */
  custom?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, custom, ...props }: InputProps, ref) => {
    return (
      <input
        ref={ref}
        autoComplete="off"
        className={clsx(
          custom
            ? className
            : `block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-gray-500 ${className}`,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

type RadioInputProps = {
  /**
   * Whether this component use custom styles in `className`
   */
  custom?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  ({ className, custom, ...props }: RadioInputProps, ref) => {
    return (
      <input
        ref={ref}
        type="radio"
        className={clsx(
          custom
            ? className
            : `h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:bg-zinc-900 ${className}`,
        )}
        {...props}
      />
    )
  },
)

RadioInput.displayName = 'RadioInput'

type CheckboxInputProps = {
  /**
   * Whether this component use custom styles in `className`
   */
  custom?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export const CheckboxInput = forwardRef<HTMLInputElement, RadioInputProps>(
  ({ className, custom, ...props }: CheckboxInputProps, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={clsx(
          custom
            ? className
            : `h-4 w-4 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:bg-zinc-900 ${className}`,
        )}
        {...props}
      />
    )
  },
)

CheckboxInput.displayName = 'CheckboxInput'

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Whether this component use custom styles in `className`
   */
  custom?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, custom, ...rest }: TextAreaProps, ref) => {
    return (
      <textarea
        ref={ref}
        className={
          custom
            ? className
            : `block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-gray-500 ${className}`
        }
        {...rest}
      />
    )
  },
)

Textarea.displayName = 'Textarea'

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const FormField = ({ children, className, ...rest }: FormFieldProps) => {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}
