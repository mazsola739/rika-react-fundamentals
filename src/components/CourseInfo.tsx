import { useParams } from 'react-router'
import { ButtonLink } from '../common/Button.tsx'
import { Loading, Panel } from '../common/ui.tsx'
import { authorsOf, formatDate, pipeDuration } from '../helpers/format.ts'
import { selectAuthors, selectCoursesState, useAppSelector } from '../store/hooks.ts'
import { NotFound } from './NotFound.tsx'

/** /courses/:courseId: everything about one course. */
export function CourseInfo() {
  const { courseId = '' } = useParams()
  const { items, status } = useAppSelector(selectCoursesState)
  const authors = useAppSelector(selectAuthors)
  const course = items.find((item) => item.id === courseId)

  if (!course) {
    return status === 'ready' || status === 'failed' ? (
      <NotFound message="There is no course with this id." />
    ) : (
      <Loading />
    )
  }

  return (
    <Panel aria-labelledby="course-title">
      <ButtonLink to="/courses">← Back to courses</ButtonLink>
      <h1
        id="course-title"
        className="my-4 rounded-sm bg-bar px-3 py-1.5 text-center text-2xl font-medium"
      >
        {course.title}
      </h1>
      <div className="grid gap-4 rounded-sm border border-button-hover bg-surface p-4 md:grid-cols-[3fr_2fr]">
        <p className="rounded-sm border border-tint-line bg-tint p-4 leading-relaxed">
          {course.description}
        </p>
        <dl className="grid h-fit grid-cols-[auto_1fr] gap-x-3 gap-y-2 rounded-sm border border-tint-line bg-tint p-4">
          <dt className="font-bold">ID:</dt>
          <dd className="break-all">{course.id}</dd>
          <dt className="font-bold">Duration:</dt>
          <dd>{pipeDuration(course.duration)}</dd>
          <dt className="font-bold">Created:</dt>
          <dd>{formatDate(course.creationDate)}</dd>
          <dt className="font-bold">Authors:</dt>
          <dd>
            <ul>
              {authorsOf(course.authors, authors).map((author) => (
                <li key={author.id}>{author.name}</li>
              ))}
            </ul>
          </dd>
        </dl>
      </div>
    </Panel>
  )
}
