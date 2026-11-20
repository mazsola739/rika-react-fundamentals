import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { UserState } from '../store/userSlice.ts'
import { admin, loadedState, renderWithStore } from '../test/render.tsx'
import { Header } from './Header.tsx'

describe('Header', () => {
  it("has the logo and the user's name", () => {
    renderWithStore(<Header />)
    expect(screen.getByRole('link', { name: 'Courses' })).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument()
  })

  it('shows no name and no Logout before login', () => {
    const loggedOutUser = { ...admin, isAuth: false, name: '', email: '', token: '', role: '' }
    renderWithStore(<Header />, { state: loadedState(loggedOutUser as UserState) })
    expect(screen.queryByText('Admin')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Logout' })).not.toBeInTheDocument()
  })
})
