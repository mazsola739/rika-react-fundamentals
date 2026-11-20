import type { AnchorHTMLAttributes } from 'react'

const NEW_TAB = 'opens in a new tab'

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/** A link that leaves the app: it opens in a new tab, and tells screen readers so. */
export function ExternalLink({ href, children, 'aria-label': label, ...props }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ? `${label}, ${NEW_TAB}` : undefined}
      {...props}
    >
      {children}
      {!label && <span className="sr-only"> ({NEW_TAB})</span>}
    </a>
  )
}
