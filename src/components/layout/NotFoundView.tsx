import { EmptyState } from '@/components/ui/EmptyState'
import { ButtonLink } from '@/components/ui/Button'
import { routes } from '@/lib/routes'

interface NotFoundViewProps {
  title?: string
  description?: string
}

export function NotFoundView({
  title = 'We could not find that page',
  description = 'The link may be old, or the story may have moved.',
}: NotFoundViewProps) {
  return (
    <EmptyState
      icon="compass"
      title={title}
      description={description}
      action={
        <ButtonLink to={routes.home} variant="primary">
          Back to Discover
        </ButtonLink>
      }
    />
  )
}
