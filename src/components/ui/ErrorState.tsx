import { Button } from './Button'
import { Icon } from './Icon'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We could not load this just now. Check your connection and try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center rounded-2xl border border-accent/40 bg-accent-soft px-6 py-12 text-center"
    >
      <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-raised text-accent-strong">
        <Icon name="alert" className="size-7" />
      </span>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-sm text-muted">{description}</p>
      {onRetry && (
        <Button variant="primary" className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
