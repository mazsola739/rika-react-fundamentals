import { type FormEvent, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Button } from '../common/Button.tsx'
import { Input } from '../common/Input.tsx'
import { ErrorMessage, messageOf, Panel } from '../common/ui.tsx'
import { DEMO_ACCOUNTS } from '../site.ts'
import { useAppDispatch } from '../store/hooks.ts'
import { login } from '../store/userSlice.ts'

export function Login() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const registered = (location.state as { registered?: string } | null)?.registered
  const [email, setEmail] = useState(registered ?? '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  // After a successful login GuestOnly sends the user on, so only a failure needs handling here.
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      await dispatch(login({ email, password })).unwrap()
    } catch (failure) {
      setError(messageOf(failure))
      setBusy(false)
    }
  }

  return (
    <Panel className="flex justify-center">
      <div className="w-full max-w-sm">
        <h1 className="mb-4 text-center text-2xl font-medium">Login</h1>
        {registered && (
          <p role="status" className="mb-4 rounded-sm bg-tint px-3 py-2 text-accent">
            Registration successful, you can log in now.
          </p>
        )}
        <form onSubmit={submit} className="flex flex-col gap-3">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="Enter email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit" disabled={busy} className="mx-auto w-40">
            Login
          </Button>
        </form>
        <p className="mt-4 rounded-sm bg-bar px-3 py-2 text-center">
          If you don't have an account, you can{' '}
          <Link to="/registration" className="font-medium text-accent underline">
            register
          </Link>
          .
        </p>

        <section aria-labelledby="demo-title" className="mt-6 border-t border-line/30 pt-4">
          <h2 id="demo-title" className="mb-2 font-medium">
            Try it with a demo account
          </h2>
          <ul className="flex flex-col gap-2 text-sm">
            {DEMO_ACCOUNTS.map((account) => (
              <li key={account.email} className="flex items-center gap-3">
                <span className="flex-1">
                  <b>{account.label}</b> ({account.can}):
                  <br />
                  <code>{account.email}</code> / <code>{account.password}</code>
                </span>
                <Button
                  onClick={() => {
                    setEmail(account.email)
                    setPassword(account.password)
                  }}
                  aria-label={`Fill in the ${account.label} account`}
                >
                  Fill in
                </Button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Panel>
  )
}
