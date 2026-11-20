import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { loadedState, renderApp, renderWithStore, student } from '../test/render.tsx'
import { Courses } from './Courses.tsx'

describe('Courses', () => {
  it('shows one CourseCard for every course', () => {
    renderWithStore(<Courses />)
    const list = screen.getByRole('list', { name: 'Courses' })
    expect(within(list).getAllByRole('article')).toHaveLength(2)
  })

  it('shows an empty box when there are no courses', () => {
    renderWithStore(<Courses />, { state: loadedState(undefined, []) })
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
    expect(screen.getByText(/There are no courses yet/)).toBeInTheDocument()
  })

  it('opens the CourseForm with the Add new course button', async () => {
    const { user } = renderApp('/courses', loadedState())
    await user.click(await screen.findByRole('link', { name: 'Add new course' }))
    expect(await screen.findByRole('heading', { name: 'New course' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create course' })).toBeInTheDocument()
  })

  it('has no Add new course button for a student', () => {
    renderWithStore(<Courses />, { state: loadedState(student) })
    expect(screen.queryByRole('link', { name: 'Add new course' })).not.toBeInTheDocument()
  })

  it('searches by title or id, and shows everything again when the search is cleared', async () => {
    const { user } = renderWithStore(<Courses />)
    const search = screen.getByRole('searchbox', { name: 'Search' })

    await user.type(search, 'CAT')
    await user.click(screen.getByRole('button', { name: 'Search' }))
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.getByRole('heading', { name: 'Cat Ipsum' })).toBeInTheDocument()

    await user.clear(search)
    await user.type(search, 'c1{Enter}')
    expect(screen.getByRole('heading', { name: 'Zombie ipsum' })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(1)

    await user.clear(search)
    expect(screen.getAllByRole('article')).toHaveLength(2)

    await user.type(search, 'unicorn{Enter}')
    expect(screen.getByText('No course matches “unicorn”.')).toBeInTheDocument()
  })
})
