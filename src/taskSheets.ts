/**
 * The five weeks of the course and EPAM's task sheets in course-tasks/. The build includes the
 * PDFs, and every sheet has a page of its own in the app: /tasks/week-4-task.
 */

const files = import.meta.glob<string>('/course-tasks/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
})

export type TaskSheet = {
  /** File name without .pdf, also the address of its page: week-4-task. */
  slug: string
  week: number
  topic: string
  label: string
  /** Where the build put the PDF. */
  url: string
}

export type Week = {
  week: number
  topic: string
  got: string
  sheets: TaskSheet[]
}

const week = (
  number: number,
  topic: string,
  got: string,
  sheets: [label: string, slug: string][],
): Week => ({
  week: number,
  topic,
  got,
  sheets: sheets.map(([label, slug]) => ({
    slug,
    week: number,
    topic,
    label,
    url: files[`/course-tasks/${slug}.pdf`] ?? '',
  })),
})

export const WEEKS: Week[] = [
  week(
    1,
    'Components, state and props',
    'Header, course cards, search bar and the new course form, with mocked data',
    [
      ['Task', 'week-1-task'],
      ['Components', 'week-1-components'],
      ['ESLint', 'week-1-eslint'],
      ['Pre-commit', 'week-1-pre-commit'],
    ],
  ),
  week(
    2,
    'React Router',
    'Login, registration and the course page, the first calls to the backend',
    [
      ['Task', 'week-2-task'],
      ['Components', 'week-2-components'],
    ],
  ),
  week(3, 'Redux', 'A store with user, courses and authors, filled from the backend', [
    ['Task', 'week-3-task'],
    ['Components', 'week-3-components'],
  ]),
  week(4, 'Async Redux', 'Thunks, the admin role, private routes, updating and deleting courses', [
    ['Task', 'week-4-task'],
    ['Components', 'week-4-components'],
  ]),
  week(5, 'Tests', 'Tests for the header, the cards, the course list, the form and a reducer', [
    ['Task', 'week-5-task'],
    ['Instructions', 'week-5-instructions'],
  ]),
]

export const findTaskSheet = (slug: string) =>
  WEEKS.flatMap((item) => item.sheets).find((sheet) => sheet.slug === slug && sheet.url)
