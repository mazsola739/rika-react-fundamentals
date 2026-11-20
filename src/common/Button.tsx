import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'

/** The 2021 button: Bootstrap's info cyan at half strength, with a thin cyan border. */
export const buttonClass =
  'inline-flex min-h-9 cursor-pointer items-center justify-center gap-2 rounded-sm border border-button-hover bg-button px-4 py-1.5 text-center text-ink transition-colors hover:bg-button-hover disabled:cursor-not-allowed disabled:opacity-60'

/** Square button for an icon only: Delete and Update on the course card. */
export const iconButtonClass = `${buttonClass} w-12 px-0 text-lg`

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }

/** The reusable Button the course asked for: one look everywhere, `type="button"` unless told. */
export function Button({ className = '', type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={`${buttonClass} ${className}`} {...props} />
}

/** A link that looks like the Button: Show course, Add new course, Back to courses. */
export function ButtonLink({ className = '', ...props }: LinkProps) {
  return <Link className={`${buttonClass} ${className}`} {...props} />
}
