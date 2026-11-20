import { screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { services } from '../api/services.ts'
import { renderWithStore } from '../test/render.tsx'
import { CourseFormPage } from './CourseForm.tsx'

const renderNewCourse = () =>
  renderWithStore(<CourseFormPage />, { route: '/courses/add', path: '/courses/add' })

const authorsList = () => screen.getByRole('list', { name: 'Authors' })
const courseAuthors = () => screen.getByRole('region', { name: 'Course authors' })

describe('CourseForm', () => {
  it('shows both author lists', () => {
    renderNewCourse()
    expect(within(authorsList()).getAllByRole('listitem')).toHaveLength(3)
    expect(within(courseAuthors()).getByText('Author list is empty')).toBeInTheDocument()
  })

  it('creates an author through the store with Create author', async () => {
    const addAuthor = vi.spyOn(services, 'addAuthor').mockResolvedValue({ id: 'a4', name: 'Hodor' })
    const { store, user } = renderNewCourse()
    await user.type(screen.getByRole('textbox', { name: 'Author name' }), 'Hodor')
    await user.click(screen.getByRole('button', { name: 'Create author' }))

    expect(addAuthor).toHaveBeenCalledWith('Hodor', 'Bearer test-token')
    expect(await within(authorsList()).findByText('Hodor')).toBeInTheDocument()
    expect(store.getState().authors.items).toContainEqual({ id: 'a4', name: 'Hodor' })
    expect(screen.getByRole('textbox', { name: 'Author name' })).toHaveValue('')
  })

  it('refuses an author name that is too short', async () => {
    const addAuthor = vi.spyOn(services, 'addAuthor')
    const { user } = renderNewCourse()
    await user.type(screen.getByRole('textbox', { name: 'Author name' }), 'H{Enter}')
    expect(screen.getByRole('alert')).toHaveTextContent('at least 2 characters')
    expect(addAuthor).not.toHaveBeenCalled()
  })

  it('moves an author to the course with Add author', async () => {
    const { user } = renderNewCourse()
    await user.click(screen.getByRole('button', { name: 'Add author Diana Prince' }))
    expect(within(courseAuthors()).getByText('Diana Prince')).toBeInTheDocument()
    expect(within(authorsList()).queryByText('Diana Prince')).not.toBeInTheDocument()
  })

  it('takes an author off the course with Delete author', async () => {
    const { user } = renderNewCourse()
    await user.click(screen.getByRole('button', { name: 'Add author Diana Prince' }))
    await user.click(screen.getByRole('button', { name: 'Delete author Diana Prince' }))
    expect(within(courseAuthors()).getByText('Author list is empty')).toBeInTheDocument()
    expect(within(authorsList()).getByText('Diana Prince')).toBeInTheDocument()
  })

  it('shows the duration as hours while typing', async () => {
    const { user } = renderNewCourse()
    await user.type(screen.getByRole('spinbutton', { name: 'Duration' }), '150')
    expect(screen.getByText('02:30 hours')).toBeInTheDocument()
  })

  it('lists what is missing instead of saving', async () => {
    const addCourse = vi.spyOn(services, 'addCourse')
    const { user } = renderNewCourse()
    await user.click(screen.getByRole('button', { name: 'Create course' }))
    const alert = screen.getByRole('alert')
    expect(within(alert).getAllByRole('listitem')).toHaveLength(4)
    expect(addCourse).not.toHaveBeenCalled()
  })

  it('saves a new course, then goes back to the courses', async () => {
    const addCourse = vi.spyOn(services, 'addCourse').mockImplementation(async (course) => ({
      ...course,
      id: 'c3',
      creationDate: '2026-11-20',
    }))
    const { store, router, user } = renderNewCourse()
    await user.type(screen.getByRole('textbox', { name: 'Title' }), 'Unicorn ipsum')
    await user.type(screen.getByRole('textbox', { name: 'Description' }), 'Glitter and rainbows.')
    await user.type(screen.getByRole('spinbutton', { name: 'Duration' }), '45')
    await user.click(screen.getByRole('button', { name: 'Add author Tony Stark' }))
    await user.click(screen.getByRole('button', { name: 'Create course' }))

    expect(addCourse).toHaveBeenCalledWith(
      {
        title: 'Unicorn ipsum',
        description: 'Glitter and rainbows.',
        duration: 45,
        authors: ['a3'],
      },
      'Bearer test-token',
    )
    await waitFor(() => expect(router.state.location.pathname).toBe('/courses'))
    expect(store.getState().courses.items.at(-1)?.title).toBe('Unicorn ipsum')
  })

  it('fills in the course to update, and saves the changes', async () => {
    const updateCourse = vi
      .spyOn(services, 'updateCourse')
      .mockImplementation(async (id, course) => ({ ...course, id, creationDate: '2010-10-31' }))
    const { store, user } = renderWithStore(<CourseFormPage />, {
      route: '/courses/update/c1',
      path: '/courses/update/:courseId',
    })
    const title = screen.getByRole('textbox', { name: 'Title' })
    expect(title).toHaveValue('Zombie ipsum')
    expect(screen.getByRole('spinbutton', { name: 'Duration' })).toHaveValue(120)
    expect(within(courseAuthors()).getByText('Natasha Romanova')).toBeInTheDocument()

    await user.clear(title)
    await user.type(title, 'Zombie ipsum 2')
    await user.click(screen.getByRole('button', { name: 'Update course' }))

    expect(updateCourse).toHaveBeenCalledWith(
      'c1',
      expect.objectContaining({ title: 'Zombie ipsum 2', authors: ['a1', 'a2'] }),
      'Bearer test-token',
    )
    await waitFor(() => expect(store.getState().courses.items[0]?.title).toBe('Zombie ipsum 2'))
  })

  it('says so when the course to update does not exist', () => {
    renderWithStore(<CourseFormPage />, {
      route: '/courses/update/nope',
      path: '/courses/update/:courseId',
    })
    expect(screen.getByText('There is no course with this id.')).toBeInTheDocument()
  })
})
