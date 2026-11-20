import { screen, waitFor, within } from '@testing-library/react'
import type userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { services } from './api/services.ts'
import { TOKEN_KEY } from './store/userSlice.ts'
import { renderApp } from './test/render.tsx'

/** The whole app against the backend that runs in the browser, with the seed data of 2021. */

// pdf.js needs a real canvas; the task sheet pages are tested without it.
vi.mock('./components/PdfPages.tsx', () => ({
  default: ({ title }: { title: string }) => <p>The pages of {title}</p>,
}))

type User = ReturnType<typeof userEvent.setup>

async function logIn(user: User, email: string, password: string) {
  await user.type(await screen.findByRole('textbox', { name: 'Email' }), email)
  await user.type(screen.getByLabelText('Password'), password)
  await user.click(screen.getByRole('button', { name: 'Login' }))
}

describe('the courses app', () => {
  it('opens on the login page, and an admin lands on the courses', async () => {
    const { user, router } = renderApp('/')
    expect(await screen.findByRole('heading', { name: 'Login' })).toBeInTheDocument()

    await logIn(user, 'admin@email.com', 'admin123')
    expect(await screen.findByRole('heading', { name: 'Zombie ipsum' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/courses')
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(6)
    expect(screen.getByRole('link', { name: 'Add new course' })).toBeInTheDocument()
    expect(localStorage.getItem(TOKEN_KEY)).toMatch(/^Bearer /)
  })

  it('fills in a demo account', async () => {
    const { user } = renderApp('/login')
    await user.click(await screen.findByRole('button', { name: 'Fill in the Student account' }))
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveValue('user@email.com')
    await user.click(screen.getByRole('button', { name: 'Login' }))
    expect(await screen.findByText('Student')).toBeInTheDocument()
  })

  it('says so when the password is wrong', async () => {
    const { user } = renderApp('/login')
    await logIn(user, 'admin@email.com', 'admin12')
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid email or password.')
  })

  it('keeps a student away from the admin pages', async () => {
    const { user, router } = renderApp('/courses/add')
    await logIn(user, 'user@email.com', 'user123')
    await screen.findByRole('heading', { name: 'Zombie ipsum' })
    expect(router.state.location.pathname).toBe('/courses')
    expect(screen.queryByRole('link', { name: 'Add new course' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /^Delete / })).not.toBeInTheDocument()
  })

  it('lets an admin create an author and a course, then delete the course', async () => {
    const { user } = renderApp('/login')
    await logIn(user, 'admin@email.com', 'admin123')
    await user.click(await screen.findByRole('link', { name: 'Add new course' }))

    await user.type(await screen.findByRole('textbox', { name: 'Title' }), 'Unicorn ipsum')
    await user.type(screen.getByRole('textbox', { name: 'Description' }), 'Glitter and rainbows.')
    await user.type(screen.getByRole('spinbutton', { name: 'Duration' }), '75')
    await user.type(screen.getByRole('textbox', { name: 'Author name' }), 'Rika{Enter}')
    await user.click(await screen.findByRole('button', { name: 'Add author Rika' }))
    await user.click(screen.getByRole('button', { name: 'Create course' }))

    const card = (await screen.findByRole('heading', { name: 'Unicorn ipsum' })).closest('article')
    expect(card).not.toBeNull()
    const inCard = within(card as HTMLElement)
    expect(inCard.getByText('01:15 hours')).toBeInTheDocument()
    expect(inCard.getByText('Rika')).toBeInTheDocument()

    await user.click(inCard.getByRole('button', { name: 'Delete Unicorn ipsum' }))
    await waitFor(() =>
      expect(screen.queryByRole('heading', { name: 'Unicorn ipsum' })).not.toBeInTheDocument(),
    )
    expect((await services.getCourses()).map((course) => course.title)).not.toContain(
      'Unicorn ipsum',
    )
  })

  it('registers a new user, who can then log in', async () => {
    const { user } = renderApp('/login')
    await user.click(await screen.findByRole('link', { name: 'register' }))
    await user.type(await screen.findByRole('textbox', { name: 'Name' }), 'Rika')
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'rika@email.com')
    await user.type(screen.getByLabelText('Password'), 'rika123')
    await user.click(screen.getByRole('button', { name: 'Registration' }))

    expect(await screen.findByText(/Registration successful/)).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveValue('rika@email.com')
    await user.type(screen.getByLabelText('Password'), 'rika123')
    await user.click(screen.getByRole('button', { name: 'Login' }))
    expect(await screen.findByText('Rika')).toBeInTheDocument()
  })

  it('lists the problems of a registration', async () => {
    const { user } = renderApp('/registration')
    await user.type(await screen.findByRole('textbox', { name: 'Name' }), 'Twin')
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'admin@email.com')
    await user.type(screen.getByLabelText('Password'), 'secret1')
    await user.click(screen.getByRole('button', { name: 'Registration' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('This email is already registered.')
  })

  it('logs out: back to the login page, the token forgotten', async () => {
    const { user, router } = renderApp('/login')
    await logIn(user, 'admin@email.com', 'admin123')
    await user.click(await screen.findByRole('button', { name: 'Logout' }))
    expect(await screen.findByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/login')
    expect(localStorage.getItem(TOKEN_KEY)).toBeNull()
  })

  it('remembers the login after a reload', async () => {
    const { result: token } = await services.login({
      email: 'admin@email.com',
      password: 'admin123',
    })
    localStorage.setItem(TOKEN_KEY, token)
    const [zombie] = await services.getCourses()

    renderApp(`/courses/${zombie?.id}`)
    expect(screen.getByText('Checking your login…')).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Zombie ipsum' })).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  it('forgets a token the backend no longer knows', async () => {
    localStorage.setItem(TOKEN_KEY, 'Bearer expired')
    const { router } = renderApp('/courses')
    expect(await screen.findByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/login')
    expect(localStorage.getItem(TOKEN_KEY)).toBeNull()
  })

  it('shows the About page and the task sheets without a login', async () => {
    const { router, user } = renderApp('/about')
    expect(await screen.findByRole('heading', { name: 'About this app' })).toBeInTheDocument()

    // GitHub, the Angular version and the portfolio open a new tab: 4 links under the table and
    // 3 in the footer.
    const external = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('http'))
    expect(external).toHaveLength(7)
    for (const link of external) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
    expect(screen.getByRole('link', { name: 'Code (opens in a new tab)' })).toBeInTheDocument()

    // The task sheets open inside the app.
    await user.click(screen.getByRole('link', { name: 'Week 4 Task' }))
    expect(router.state.location.pathname).toBe('/tasks/week-4-task')
    expect(
      await screen.findByRole('heading', { name: 'Week 4: Async Redux – Task' }),
    ).toBeInTheDocument()
    expect(await screen.findByText('The pages of Week 4: Async Redux – Task')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Open the PDF (opens in a new tab)' })).toHaveAttribute(
      'href',
      expect.stringContaining('week-4-task'),
    )

    await user.click(screen.getByRole('link', { name: 'Components' }))
    expect(
      await screen.findByRole('heading', { name: 'Week 4: Async Redux – Components' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Components' })).toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByRole('link', { name: '← Back to About' }))
    expect(await screen.findByRole('heading', { name: 'About this app' })).toBeInTheDocument()
  })

  it('shows a 404 page for unknown addresses and task sheets', async () => {
    const { router } = renderApp('/nowhere')
    expect(await screen.findByText('This page does not exist.')).toBeInTheDocument()
    await router.navigate('/tasks/week-9-task')
    expect(await screen.findByText('There is no task sheet with this name.')).toBeInTheDocument()
  })
})
