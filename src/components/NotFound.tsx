import { ButtonLink } from '../common/Button.tsx'
import { Panel } from '../common/ui.tsx'

export function NotFound({ message = 'This page does not exist.' }: { message?: string }) {
  return (
    <Panel className="flex flex-col items-center gap-4 py-10 text-center">
      <h1 className="text-3xl font-medium">404</h1>
      <p>{message}</p>
      <ButtonLink to="/">Back to the courses</ButtonLink>
    </Panel>
  )
}
