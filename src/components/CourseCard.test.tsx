import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { services } from '../api/services.ts'
import { authors, courses, loadedState, renderWithStore, student } from '../test/render.tsx'
import { CourseCard } from './CourseCard.tsx'

const [zombie] = courses as [(typeof courses)[number]]

describe('CourseCard', () => {
  it('shows the title, the description, the duration, the authors and the date', () => {
    renderWithStore(<CourseCard course={zombie} authors={authors} isAdmin={false} />)
    expect(screen.getByRole('heading', { name: 'Zombie ipsum' })).toBeInTheDocument()
    expect(screen.getByText(/Zombie ipsum reversus ab viral inferno/)).toBeInTheDocument()
    expect(screen.getByText('02:00 hours')).toBeInTheDocument()
    expect(screen.getByText('Natasha Romanova, Diana Prince')).toBeInTheDocument()
    expect(screen.getByText('31.10.2010')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Show course' })).toHaveAttribute('href', '/courses/c1')
  })

  it('has Delete and Update only for admins', () => {
    const { unmount } = renderWithStore(
      <CourseCard course={zombie} authors={authors} isAdmin={false} />,
      { state: loadedState(student) },
    )
    expect(screen.queryByRole('button', { name: 'Delete Zombie ipsum' })).not.toBeInTheDocument()
    unmount()

    renderWithStore(<CourseCard course={zombie} authors={authors} isAdmin />)
    expect(screen.getByRole('button', { name: 'Delete Zombie ipsum' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Update Zombie ipsum' })).toHaveAttribute(
      'href',
      '/courses/update/c1',
    )
  })

  it('deletes the course on the backend, then from the store', async () => {
    const deleteCourse = vi
      .spyOn(services, 'deleteCourse')
      .mockResolvedValue({ successful: true, result: 'Course was deleted.' })
    const { store, user } = renderWithStore(
      <CourseCard course={zombie} authors={authors} isAdmin />,
    )
    await user.click(screen.getByRole('button', { name: 'Delete Zombie ipsum' }))
    expect(deleteCourse).toHaveBeenCalledWith('c1', 'Bearer test-token')
    await waitFor(() =>
      expect(store.getState().courses.items.map((course) => course.id)).toEqual(['c2']),
    )
  })

  it('tells when the delete failed', async () => {
    // The test token is unknown to the backend, so it answers 401.
    const { user } = renderWithStore(<CourseCard course={zombie} authors={authors} isAdmin />)
    await user.click(screen.getByRole('button', { name: 'Delete Zombie ipsum' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Please log in first.')
  })
})
