import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ApiError } from '../api/client.ts'
import { services } from '../api/services.ts'
import { Button } from '../common/Button.tsx'
import { Input } from '../common/Input.tsx'
import { ErrorMessage, messageOf, Panel } from '../common/ui.tsx'

export function Registration() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [busy, setBusy] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setErrors([])
    try {
      await services.register({ name, email, password })
      navigate('/login', { state: { registered: email.trim() } })
    } catch (failure) {
      setErrors(
        failure instanceof ApiError && failure.errors.length
          ? failure.errors
          : [messageOf(failure)],
      )
      setBusy(false)
    }
  }

  return (
    <Panel className="flex justify-center">
      <div className="w-full max-w-sm">
        <h1 className="mb-4 text-center text-2xl font-medium">Registration</h1>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <Input
            label="Name"
            name="name"
            autoComplete="name"
            placeholder="Enter name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 6 characters"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {errors.length > 0 && (
            <ErrorMessage>
              <ul>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </ErrorMessage>
          )}
          <Button type="submit" disabled={busy} className="mx-auto w-40">
            Registration
          </Button>
        </form>
        <p className="mt-4 rounded-sm bg-bar px-3 py-2 text-center">
          If you have an account, you can{' '}
          <Link to="/login" className="font-medium text-accent underline">
            log in
          </Link>
          .
        </p>
      </div>
    </Panel>
  )
}
