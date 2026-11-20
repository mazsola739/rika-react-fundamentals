import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './index.ts'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

/** The course's good practice: the useSelector callbacks live in one file. */
export const selectUser = (state: RootState) => state.user
export const selectIsAdmin = (state: RootState) => state.user.role === 'admin'
export const selectCourses = (state: RootState) => state.courses.items
export const selectCoursesState = (state: RootState) => state.courses
export const selectAuthors = (state: RootState) => state.authors.items
