import { describe, expect, it } from 'vitest'
import { findTaskSheet, WEEKS } from './taskSheets.ts'

describe('the task sheets', () => {
  it('has a PDF in course-tasks/ for every sheet of the five weeks', () => {
    const sheets = WEEKS.flatMap((week) => week.sheets)
    expect(sheets).toHaveLength(12)
    for (const sheet of sheets) expect(sheet.url).toMatch(new RegExp(`${sheet.slug}.*.pdf`))
  })

  it('finds a sheet by its address and nothing for an unknown one', () => {
    expect(findTaskSheet('week-2-components')).toMatchObject({ week: 2, label: 'Components' })
    expect(findTaskSheet('week-9-task')).toBeUndefined()
  })
})
