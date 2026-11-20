import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Course, CourseInput } from '../../server/types.ts'
import { services } from '../api/services.ts'
import type { RootState } from './index.ts'

export type LoadStatus = 'idle' | 'loading' | 'ready' | 'failed'

export type CoursesState = {
  items: Course[]
  status: LoadStatus
  error: string | null
}

const initialState: CoursesState = { items: [], status: 'idle', error: null }

type WithState = { state: RootState }

export const fetchCourses = createAsyncThunk('courses/fetchCourses', () => services.getCourses())

export const addCourse = createAsyncThunk<Course, CourseInput, WithState>(
  'courses/addCourse',
  (course, { getState }) => services.addCourse(course, getState().user.token),
)

export const updateCourse = createAsyncThunk<
  Course,
  { id: string; course: CourseInput },
  WithState
>('courses/updateCourse', ({ id, course }, { getState }) =>
  services.updateCourse(id, course, getState().user.token),
)

export const deleteCourse = createAsyncThunk<string, string, WithState>(
  'courses/deleteCourse',
  async (id, { getState }) => {
    await services.deleteCourse(id, getState().user.token)
    return id
  },
)

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCourses.fulfilled, (state, { payload }) => {
        state.items = payload
        state.status = 'ready'
      })
      .addCase(fetchCourses.rejected, (state, { error }) => {
        state.status = 'failed'
        state.error = error.message ?? 'The courses could not be loaded.'
      })
      .addCase(addCourse.fulfilled, (state, { payload }) => {
        state.items.push(payload)
      })
      .addCase(updateCourse.fulfilled, (state, { payload }) => {
        state.items = state.items.map((course) => (course.id === payload.id ? payload : course))
      })
      .addCase(deleteCourse.fulfilled, (state, { payload: id }) => {
        state.items = state.items.filter((course) => course.id !== id)
      })
  },
})

export const coursesReducer = coursesSlice.reducer
