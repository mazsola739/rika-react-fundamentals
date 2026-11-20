import { lazy, Suspense } from 'react'
import { Link, useParams } from 'react-router'
import { ButtonLink } from '../common/Button.tsx'
import { ExternalLink } from '../common/ExternalLink.tsx'
import { Loading, Panel } from '../common/ui.tsx'
import { findTaskSheet, WEEKS } from '../taskSheets.ts'
import { NotFound } from './NotFound.tsx'

// pdf.js is big, so it is loaded only when a task sheet is opened.
const PdfPages = lazy(() => import('./PdfPages.tsx'))

/** /tasks/:sheet: one of EPAM's task sheets, inside the app. */
export function TaskSheetPage() {
  const { sheet: slug = '' } = useParams()
  const sheet = findTaskSheet(slug)
  if (!sheet) return <NotFound message="There is no task sheet with this name." />

  const title = `Week ${sheet.week}: ${sheet.topic} – ${sheet.label}`
  const sameWeek = WEEKS.find((item) => item.week === sheet.week)?.sheets ?? []

  return (
    <Panel aria-labelledby="sheet-title" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ButtonLink to="/about">← Back to About</ButtonLink>
        <ExternalLink
          href={sheet.url}
          className="font-medium text-accent underline underline-offset-2"
        >
          Open the PDF
        </ExternalLink>
      </div>

      <h1 id="sheet-title" className="text-2xl font-medium">
        {title}
      </h1>

      <nav aria-label={`Task sheets of week ${sheet.week}`}>
        <ul className="flex flex-wrap gap-2">
          {sameWeek.map((item) => (
            <li key={item.slug}>
              <Link
                to={`/tasks/${item.slug}`}
                aria-current={item.slug === sheet.slug ? 'page' : undefined}
                className="block rounded-sm border border-button-hover px-3 py-1 hover:bg-bar aria-[current=page]:bg-button aria-[current=page]:font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="text-sm text-muted">
        EPAM's material from the React Fundamentals course, October 2021.
      </p>

      <Suspense fallback={<Loading>Loading the task sheet…</Loading>}>
        <PdfPages key={sheet.slug} url={sheet.url} title={title} />
      </Suspense>
    </Panel>
  )
}
