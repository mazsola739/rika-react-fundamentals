import { useState } from 'react'
import { Link } from 'react-router'
import type { Author, Course } from '../../server/types.ts'
import { ButtonLink, iconButtonClass } from '../common/Button.tsx'
import { EditIcon, TrashIcon } from '../common/icons.tsx'
import { ErrorMessage, messageOf } from '../common/ui.tsx'
import { authorNames, formatDate, pipeDuration } from '../helpers/format.ts'
import { deleteCourse } from '../store/coursesSlice.ts'
import { useAppDispatch } from '../store/hooks.ts'

type CourseCardProps = { course: Course; authors: Author[]; isAdmin: boolean }

/** Title and description on the left, the facts and the buttons on the right. */
export function CourseCard({ course, authors, isAdmin }: CourseCardProps) {
  const dispatch = useAppDispatch()
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const names = authorNames(course.authors, authors)
  const titleId = `course-${course.id}`

  const remove = async () => {
    setDeleting(true)
    setError('')
    try {
      await dispatch(deleteCourse(course.id)).unwrap()
    } catch (failure) {
      setError(messageOf(failure))
      setDeleting(false)
    }
  }

  return (
    <article
      aria-labelledby={titleId}
      className="grid gap-4 rounded-sm border border-button-hover bg-surface p-4 md:grid-cols-3"
    >
      <div className="min-w-0 rounded-sm border border-tint-line bg-tint p-3 md:col-span-2">
        <h2 id={titleId} className="mb-2 rounded-sm bg-bar px-2 py-1 text-xl font-medium">
          {course.title}
        </h2>
        <p className="line-clamp-3" title={course.description}>
          {course.description}
        </p>
      </div>

      <div className="flex min-w-0 flex-col gap-1.5">
        <p className="truncate" title={names}>
          <b>Authors:</b> {names}
        </p>
        <p>
          <b>Duration:</b> {pipeDuration(course.duration)}
        </p>
        <p>
          <b>Created:</b> {formatDate(course.creationDate)}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <ButtonLink to={`/courses/${course.id}`}>Show course</ButtonLink>
          {isAdmin && (
            <>
              <button
                type="button"
                onClick={remove}
                disabled={deleting}
                className={iconButtonClass}
                aria-label={`Delete ${course.title}`}
                title="Delete course"
              >
                <TrashIcon />
              </button>
              <Link
                to={`/courses/update/${course.id}`}
                className={iconButtonClass}
                aria-label={`Update ${course.title}`}
                title="Update course"
              >
                <EditIcon />
              </Link>
            </>
          )}
        </div>
        {error && <ErrorMessage className="mt-2 text-sm">{error}</ErrorMessage>}
      </div>
    </article>
  )
}
