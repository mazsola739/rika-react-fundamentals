import type { HTMLAttributes, ReactNode } from 'react'

/** The bordered box every page of 2021 sat in. */
export function Panel({ className = '', ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section className={`my-4 rounded-sm border border-line p-4 sm:p-6 ${className}`} {...props} />
  )
}

/** The cyan heading strip of the cards and the form. */
export function TitleBar({ className = '', ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={`rounded-sm bg-bar px-3 py-1.5 text-center font-medium ${className}`}
      {...props}
    />
  )
}

export function Loading({ children = 'Loading…' }: { children?: ReactNode }) {
  return (
    <p role="status" className="py-10 text-center text-muted">
      {children}
    </p>
  )
}

export function ErrorMessage({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      role="alert"
      className={`rounded-sm border border-danger px-3 py-2 text-danger ${className}`}
    >
      {children}
    </div>
  )
}

/** The message of an error from a thunk's unwrap() or a service call. */
export const messageOf = (error: unknown) =>
  error instanceof Error || (typeof error === 'object' && error !== null && 'message' in error)
    ? String((error as { message: unknown }).message)
    : 'Something went wrong.'
