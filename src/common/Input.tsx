import { type InputHTMLAttributes, useId } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string }

/**
 * The reusable Input: a label and a field in one group, like Bootstrap's input-group of 2021.
 * The label is a real <label>, so a click on it focuses the field and screen readers read it.
 */
export function Input({ label, id, className = '', ...props }: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <div className={`flex min-w-0 ${className}`}>
      <label
        htmlFor={inputId}
        className="flex shrink-0 items-center rounded-l-sm border border-r-0 border-line bg-bar px-3 text-sm"
      >
        {label}
      </label>
      <input
        id={inputId}
        className="min-h-9 w-full min-w-0 rounded-r-sm border border-line bg-surface px-3 py-1.5 placeholder:text-muted"
        {...props}
      />
    </div>
  )
}
