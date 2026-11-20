import { type FormEvent, type KeyboardEvent, useId, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import type { Course } from '../../server/types.ts'
import { Button, ButtonLink } from '../common/Button.tsx'
import { Input } from '../common/Input.tsx'
import { ErrorMessage, Loading, messageOf, Panel, TitleBar } from '../common/ui.tsx'
import { authorsOf, pipeDuration } from '../helpers/format.ts'
import { addAuthor } from '../store/authorsSlice.ts'
import { addCourse, updateCourse } from '../store/coursesSlice.ts'
import {
  selectAuthors,
  selectCoursesState,
  useAppDispatch,
  useAppSelector,
} from '../store/hooks.ts'
import { NotFound } from './NotFound.tsx'

/** /courses/add and /courses/update/:courseId: the update waits for the course to load. */
export function CourseFormPage() {
  const { courseId } = useParams()
  const { items, status } = useAppSelector(selectCoursesState)
  if (!courseId) return <CourseForm />

  const course = items.find((item) => item.id === courseId)
  if (course) return <CourseForm key={course.id} course={course} />
  return status === 'ready' || status === 'failed' ? (
    <NotFound message="There is no course with this id." />
  ) : (
    <Loading />
  )
}

const rowClass = 'flex items-center justify-between gap-3 py-1'

/** Creates a course, or updates one when it gets `course`. */
export function CourseForm({ course }: { course?: Course }) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const authors = useAppSelector(selectAuthors)
  const descriptionId = useId()

  const [title, setTitle] = useState(course?.title ?? '')
  const [description, setDescription] = useState(course?.description ?? '')
  const [duration, setDuration] = useState(course ? String(course.duration) : '')
  const [courseAuthorIds, setCourseAuthorIds] = useState<string[]>(course?.authors ?? [])
  const [authorName, setAuthorName] = useState('')
  const [authorError, setAuthorError] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  const minutes = Number(duration)
  const courseAuthors = authorsOf(courseAuthorIds, authors)
  const otherAuthors = authors.filter((author) => !courseAuthorIds.includes(author.id))

  const createAuthor = async () => {
    const name = authorName.trim()
    if (name.length < 2) {
      setAuthorError('The name should be at least 2 characters long.')
      return
    }
    try {
      await dispatch(addAuthor(name)).unwrap()
      setAuthorName('')
      setAuthorError('')
    } catch (failure) {
      setAuthorError(messageOf(failure))
    }
  }

  // Enter in the author field creates the author instead of submitting the whole course.
  const onAuthorKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    event.preventDefault()
    void createAuthor()
  }

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const problems: string[] = []
    if (!title.trim()) problems.push('Give the course a title.')
    if (description.trim().length < 2) {
      problems.push('The description should be at least 2 characters long.')
    }
    if (!Number.isInteger(minutes) || minutes < 1) {
      problems.push('The duration should be a whole number of minutes, at least 1.')
    }
    if (courseAuthorIds.length === 0) problems.push('Add at least one author to the course.')
    setErrors(problems)
    if (problems.length) return

    const input = {
      title: title.trim(),
      description: description.trim(),
      duration: minutes,
      authors: courseAuthorIds,
    }
    setSaving(true)
    try {
      if (course) await dispatch(updateCourse({ id: course.id, course: input })).unwrap()
      else await dispatch(addCourse(input)).unwrap()
      navigate('/courses')
    } catch (failure) {
      setErrors([messageOf(failure)])
      setSaving(false)
    }
  }

  return (
    <Panel className="bg-tint/60">
      <form onSubmit={save} aria-labelledby="form-title" noValidate>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <ButtonLink to="/courses">← Back to courses</ButtonLink>
          <h1 id="form-title" className="text-2xl font-medium">
            {course ? 'Update course' : 'New course'}
          </h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            label="Title"
            placeholder="Enter title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={saving} className="sm:w-44">
            {course ? 'Update course' : 'Create course'}
          </Button>
        </div>

        <div className="my-4 rounded-sm bg-surface p-3">
          <label htmlFor={descriptionId} className="mb-1 block">
            Description
          </label>
          <textarea
            id={descriptionId}
            rows={4}
            placeholder="Enter description..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="w-full rounded-sm border border-line bg-surface px-3 py-2 placeholder:text-muted"
          />
        </div>

        {errors.length > 0 && (
          <ErrorMessage className="mb-4 bg-surface">
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </ErrorMessage>
        )}

        <div className="grid gap-x-8 gap-y-6 rounded-sm border border-line bg-surface p-4 md:grid-cols-2">
          <section aria-labelledby="add-author-title" className="flex flex-col gap-3">
            <TitleBar id="add-author-title">Add author</TitleBar>
            <Input
              label="Author name"
              placeholder="Enter author name..."
              value={authorName}
              onChange={(event) => setAuthorName(event.target.value)}
              onKeyDown={onAuthorKeyDown}
            />
            {authorError && <ErrorMessage className="text-sm">{authorError}</ErrorMessage>}
            <Button onClick={createAuthor} className="self-center">
              Create author
            </Button>
          </section>

          <section aria-labelledby="authors-title" className="flex flex-col gap-3">
            <TitleBar id="authors-title">Authors</TitleBar>
            <ul aria-labelledby="authors-title" className="max-h-64 overflow-y-auto pr-1">
              {otherAuthors.map((author) => (
                <li key={author.id} className={rowClass}>
                  <span>{author.name}</span>
                  <Button
                    onClick={() => setCourseAuthorIds((ids) => [...ids, author.id])}
                    aria-label={`Add author ${author.name}`}
                    className="shrink-0"
                  >
                    Add author
                  </Button>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="duration-title" className="flex flex-col gap-3">
            <TitleBar id="duration-title">Duration</TitleBar>
            <Input
              label="Duration"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              placeholder="Enter duration in minutes..."
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
            />
            <p className="text-center text-xl">
              Duration: <b>{pipeDuration(minutes)}</b>
            </p>
          </section>

          <section aria-labelledby="course-authors-title" className="flex flex-col gap-3">
            <TitleBar id="course-authors-title">Course authors</TitleBar>
            {courseAuthors.length ? (
              <ul aria-labelledby="course-authors-title">
                {courseAuthors.map((author) => (
                  <li key={author.id} className={rowClass}>
                    <span>{author.name}</span>
                    <Button
                      onClick={() =>
                        setCourseAuthorIds((ids) => ids.filter((id) => id !== author.id))
                      }
                      aria-label={`Delete author ${author.name}`}
                      className="shrink-0"
                    >
                      Delete author
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-sm text-muted italic">Author list is empty</p>
            )}
          </section>
        </div>
      </form>
    </Panel>
  )
}
