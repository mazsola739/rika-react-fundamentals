import { describe, expect, it } from 'vitest'
import { courses } from '../test/render.tsx'
import {
  addCourse,
  coursesReducer,
  deleteCourse,
  fetchCourses,
  updateCourse,
} from './coursesSlice.ts'

const [zombie, cat] = courses as [(typeof courses)[number], (typeof courses)[number]]
const loaded = { items: courses, status: 'ready' as const, error: null }

describe('coursesReducer', () => {
  it('returns the initial state', () => {
    expect(coursesReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
      status: 'idle',
      error: null,
    })
  })

  it('saves the courses it got (GET_COURSES)', () => {
    const loading = coursesReducer(undefined, fetchCourses.pending('request'))
    expect(loading.status).toBe('loading')
    expect(coursesReducer(loading, fetchCourses.fulfilled(courses, 'request'))).toEqual(loaded)
  })

  it('keeps the error when the courses could not be loaded', () => {
    const state = coursesReducer(
      undefined,
      fetchCourses.rejected(new Error('The server cannot be reached.'), 'request'),
    )
    expect(state).toMatchObject({ status: 'failed', error: 'The server cannot be reached.' })
  })

  it('adds a new course (SAVE_COURSE)', () => {
    const { id, creationDate, ...input } = cat
    const state = coursesReducer(
      { ...loaded, items: [zombie] },
      addCourse.fulfilled(cat, 'request', input),
    )
    expect(state.items).toEqual([zombie, cat])
    expect(id && creationDate).toBeTruthy()
  })

  it('replaces an updated course', () => {
    const changed = { ...zombie, title: 'Zombie ipsum 2' }
    const state = coursesReducer(
      loaded,
      updateCourse.fulfilled(changed, 'request', { id: 'c1', course: changed }),
    )
    expect(state.items).toEqual([changed, cat])
  })

  it('removes a deleted course', () => {
    const state = coursesReducer(loaded, deleteCourse.fulfilled('c1', 'request', 'c1'))
    expect(state.items).toEqual([cat])
  })
})
