import { PageHeader } from '@/components/layout/PageHeader'
import { TrailCard } from '@/components/trail/TrailCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingRegion, Skeleton } from '@/components/ui/Skeleton'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useTrails } from '@/hooks/useTrails'

export function TrailsPage() {
  useDocumentTitle('Trails')
  const { data: trails, isPending, isError, refetch } = useTrails()

  return (
    <>
      <PageHeader
        eyebrow="Trails"
        title="Walk the story"
        description="Ordered routes through a neighborhood or a theme. Each stop links to its full story."
      />

      {isPending ? (
        <LoadingRegion label="Loading trails">
          <div className="grid gap-4 lg:grid-cols-2">
            <Skeleton className="h-56 rounded-2xl" />
            <Skeleton className="h-56 rounded-2xl" />
          </div>
        </LoadingRegion>
      ) : isError ? (
        <ErrorState title="We could not load trails" onRetry={() => void refetch()} />
      ) : trails.length === 0 ? (
        <EmptyState
          icon="route"
          title="No trails yet"
          description="Check back soon for new routes."
        />
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2">
          {trails.map((trail) => (
            <li key={trail.id}>
              <TrailCard trail={trail} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
