import { describe, expect, it } from 'vitest'
import { authorNames, formatDate, pipeDuration } from './format.ts'

describe('pipeDuration', () => {
  it('shows minutes as hh:mm hours', () => {
    expect(pipeDuration(75)).toBe('01:15 hours')
    expect(pipeDuration(666)).toBe('11:06 hours')
    expect(pipeDuration(5)).toBe('00:05 hours')
    expect(pipeDuration(1440)).toBe('24:00 hours')
  })

  it('shows zero for an empty or broken value', () => {
    expect(pipeDuration(0)).toBe('00:00 hours')
    expect(pipeDuration(Number.NaN)).toBe('00:00 hours')
    expect(pipeDuration(-30)).toBe('00:00 hours')
  })
})

describe('formatDate', () => {
  it('turns an ISO date into dd.mm.yyyy', () => {
    expect(formatDate('2021-10-29')).toBe('29.10.2021')
  })
})

describe('authorNames', () => {
  it('lists the names in the order of the ids and skips unknown ids', () => {
    const authors = [
      { id: 'a', name: 'Batman' },
      { id: 'b', name: 'Superman' },
    ]
    expect(authorNames(['b', 'nobody', 'a'], authors)).toBe('Superman, Batman')
  })
})
