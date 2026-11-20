import type { Author } from '../../server/types.ts'

const pad = (value: number) => String(value).padStart(2, '0')

/** Minutes as the course asked for it, hh:mm + "hours": 75 → "01:15 hours". */
export function pipeDuration(minutes: number) {
  const whole = Number.isFinite(minutes) && minutes > 0 ? Math.floor(minutes) : 0
  return `${pad(Math.floor(whole / 60))}:${pad(whole % 60)} hours`
}

/** An ISO date as dd.mm.yyyy: "2021-10-29" → "29.10.2021". */
export function formatDate(isoDate: string) {
  const [year, month, day] = isoDate.split('-')
  return year && month && day ? `${day}.${month}.${year}` : isoDate
}

/** The authors with these ids, in this order; unknown ids are left out. */
export function authorsOf(ids: string[], authors: Author[]) {
  return ids.flatMap((id) => authors.find((author) => author.id === id) ?? [])
}

/** The names of the authors with these ids, on one line. */
export function authorNames(ids: string[], authors: Author[]) {
  return authorsOf(ids, authors)
    .map((author) => author.name)
    .join(', ')
}
