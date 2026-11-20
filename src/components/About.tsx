import { Link } from 'react-router'
import { Panel } from '../common/ui.tsx'
import { DEMO_ACCOUNTS, PORTFOLIO_URL, REPO_URL, taskSheetUrl } from '../site.ts'

/** The five weeks of the course, with EPAM's task sheets in course-tasks/. */
const WEEKS = [
  {
    week: 1,
    topic: 'Components, state and props',
    got: 'Header, course cards, search bar and the new course form, with mocked data',
    sheets: [
      ['Task', 'week-1-task.pdf'],
      ['Components', 'week-1-components.pdf'],
      ['ESLint', 'week-1-eslint.pdf'],
      ['Pre-commit', 'week-1-pre-commit.pdf'],
    ],
  },
  {
    week: 2,
    topic: 'React Router',
    got: 'Login, registration and the course page, the first calls to the backend',
    sheets: [
      ['Task', 'week-2-task.pdf'],
      ['Components', 'week-2-components.pdf'],
    ],
  },
  {
    week: 3,
    topic: 'Redux',
    got: 'A store with user, courses and authors, filled from the backend',
    sheets: [
      ['Task', 'week-3-task.pdf'],
      ['Components', 'week-3-components.pdf'],
    ],
  },
  {
    week: 4,
    topic: 'Async Redux',
    got: 'Thunks, the admin role, private routes, updating and deleting courses',
    sheets: [
      ['Task', 'week-4-task.pdf'],
      ['Components', 'week-4-components.pdf'],
    ],
  },
  {
    week: 5,
    topic: 'Tests',
    got: 'Tests for the header, the cards, the course list, the form and a reducer',
    sheets: [
      ['Task', 'week-5-task.pdf'],
      ['Instructions', 'week-5-instructions.pdf'],
    ],
  },
] as const

const linkClass = 'font-medium text-accent underline underline-offset-2'

export function About() {
  return (
    <Panel aria-labelledby="about-title" className="flex flex-col gap-4 leading-relaxed">
      <h1 id="about-title" className="text-2xl font-medium">
        About this app
      </h1>
      <p>
        This courses app is my homework from the <b>React Fundamentals</b> course of EPAM's junior
        program, in autumn 2021. The course had five modules, one a week, and every week the same
        app grew: components first, then routing, Redux, async Redux and tests. EPAM gave the task
        sheets and a NestJS backend to run on localhost; the solutions were mine.
      </p>
      <p>
        In 2026 I renovated it with React 19, TypeScript and Redux Toolkit, and wrote the backend
        myself: a small API without a framework that runs as a Bun server on my machine and, on this
        site, inside your browser. It keeps its data in your browser's localStorage, so feel free to
        add, edit and delete; <i>Reset demo data</i> at the bottom brings the courses of 2021 back.
      </p>

      <h2 className="mt-2 text-xl font-medium">The five weeks</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-bar">
              <th scope="col" className="px-3 py-2 font-medium">
                Week
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                Topic
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                What the app got
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                Task sheets
              </th>
            </tr>
          </thead>
          <tbody>
            {WEEKS.map(({ week, topic, got, sheets }) => (
              <tr key={week} className="border-b border-line/30 align-top">
                <td className="px-3 py-2">{week}</td>
                <td className="px-3 py-2 font-medium">{topic}</td>
                <td className="px-3 py-2">{got}</td>
                <td className="px-3 py-2">
                  <ul className="flex flex-wrap gap-x-3">
                    {sheets.map(([label, file]) => (
                      <li key={file}>
                        <a
                          href={taskSheetUrl(file)}
                          className={linkClass}
                          aria-label={`Week ${week} ${label} (PDF)`}
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-2 text-xl font-medium">Try it</h2>
      <ul className="list-disc pl-6">
        {DEMO_ACCOUNTS.map((account) => (
          <li key={account.email}>
            <b>{account.label}</b> ({account.can}): <code>{account.email}</code> /{' '}
            <code>{account.password}</code>
          </li>
        ))}
        <li>
          Or{' '}
          <Link to="/registration" className={linkClass}>
            register
          </Link>{' '}
          a student account of your own.
        </li>
      </ul>

      <p className="flex flex-wrap gap-x-6 gap-y-1">
        <a href={REPO_URL} className={linkClass}>
          Code on GitHub
        </a>
        <a href={`${REPO_URL}/tree/v2021`} className={linkClass}>
          The code as I handed it in (2021)
        </a>
        <a href={PORTFOLIO_URL} className={linkClass}>
          My portfolio
        </a>
      </p>
    </Panel>
  )
}
