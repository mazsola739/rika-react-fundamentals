import { useState } from 'react'
import { MoonIcon, SunIcon } from '../common/icons.tsx'

type Theme = 'light' | 'dark'

/**
 * localStorage key of the visitor's choice; index.html reads the same key before the first paint.
 * It names this site because every project page on mazsola739.github.io shares one localStorage.
 */
export const THEME_STORAGE_KEY = 'rika-react-fundamentals:theme'

const readTheme = (): Theme =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'

/** Switches between the light (default) and the dark theme and remembers the choice. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readTheme)
  const next: Theme = theme === 'dark' ? 'light' : 'dark'

  const toggle = () => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="grid size-9 cursor-pointer place-items-center rounded-full text-lg transition-colors hover:bg-bar"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
