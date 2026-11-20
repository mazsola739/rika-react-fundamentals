import { type ReactNode, useState } from 'react'
import { Button, ButtonLink } from '../common/Button.tsx'
import { ErrorMessage, Loading, Panel } from '../common/ui.tsx'
import { fetchCourses } from '../store/coursesSlice.ts'
import {
  selectAuthors,
  selectCoursesState,
  selectIsAdmin,
  useAppDispatch,
  useAppSelector,
} from '../store/hooks.ts'
import { CourseCard } from './CourseCard.tsx'
import { matchesSearch, SearchBar } from './SearchBar.tsx'

const Empty = ({ children }: { children: ReactNode }) => (
  <p className="mt-4 rounded-sm border border-dashed border-line py-10 text-center text-muted">
    {children}
  </p>
)

export function Courses() {
  const dispatch = useAppDispatch()
  const { items: courses, status, error } = useAppSelector(selectCoursesState)
  const authors = useAppSelector(selectAuthors)
  const isAdmin = useAppSelector(selectIsAdmin)
  const [search, setSearch] = useState('')
  const shown = courses.filter((course) => matchesSearch(course, search))

  let content: ReactNode
  if (status === 'loading' && courses.length === 0) {
    content = <Loading>Loading the courses…</Loading>
  } else if (status === 'failed') {
    content = (
      <ErrorMessage className="mt-4 flex flex-wrap items-center gap-3">
        {error}
        <Button onClick={() => dispatch(fetchCourses())}>Try again</Button>
      </ErrorMessage>
    )
  } else if (courses.length === 0) {
    content = <Empty>There are no courses yet.{isAdmin && ' Add the first one!'}</Empty>
  } else if (shown.length === 0) {
    content = <Empty>No course matches “{search.trim()}”.</Empty>
  } else {
    content = (
      <ul aria-label="Courses" className="mt-4 flex flex-col gap-4">
        {shown.map((course) => (
          <li key={course.id}>
            <CourseCard course={course} authors={authors} isAdmin={isAdmin} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <Panel aria-labelledby="courses-title">
      <h1 id="courses-title" className="sr-only">
        Courses
      </h1>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar onSearch={setSearch} className="sm:w-2/3" />
        {isAdmin && (
          <ButtonLink to="/courses/add" className="sm:ml-auto">
            Add new course
          </ButtonLink>
        )}
      </div>
      {content}
    </Panel>
  )
}
