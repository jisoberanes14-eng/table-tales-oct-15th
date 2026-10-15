import { useParams } from 'react-router-dom'
import { SignInPanel } from '@/components/auth/SignInPanel'
import { BackLink } from '@/components/layout/BackLink'
import { NotFoundView } from '@/components/layout/NotFoundView'
import { TrailStopItem } from '@/components/trail/TrailStopItem'
import { ErrorState } from '@/components/ui/ErrorState'
import { Icon } from '@/components/ui/Icon'
import { LoadingRegion, Skeleton } from '@/components/ui/Skeleton'
import { SampleBadge } from '@/components/ui/SampleBadge'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useTrail, useTrailSummary } from '@/hooks/useTrails'
import { formatMinutes, pluralize } from '@/lib/format'
import { routes } from '@/lib/routes'
import type { Trail } from '@/types'

/**
 * Signed out: the public trail card plus a sign-in prompt (the stops are never requested; the
 * database would refuse them anyway). Signed in: the full ordered trail.
 */
export function TrailDetailPage() {
  const { trailId } = useParams()
  const { user, isLoading: authLoading } = useAuth()
  const summary = useTrailSummary(trailId)
  const full = useTrail(trailId)

  useDocumentTitle(full.data?.title ?? summary.data?.title)

  if (authLoading) return <TrailSkeleton />

  if (user === null) {
    if (summary.isPending) return <TrailSkeleton />
    if (summary.isError) return <TrailError onRetry={() => void summary.refetch()} />
    if (!summary.data) return <TrailNotFound />
    return (
      <>
        <BackLink fallbackTo={routes.trails} label="Trails" />
        <div className="max-w-2xl">
          <TrailHeader trail={summary.data} />
          <div className="mt-10">
            <SignInPanel
              title="Sign in to follow this trail"
              description="See every stop in order, with a note on each and a link to its full story. Free: we just email you a link, no password."
            />
          </div>
        </div>
      </>
    )
  }

  if (full.isPending) return <TrailSkeleton />
  if (full.isError) return <TrailError onRetry={() => void full.refetch()} />
  if (!full.data) return <TrailNotFound />

  const trail = full.data
  return (
    <>
      <BackLink fallbackTo={routes.trails} label="Trails" />
      <TrailHeader trail={trail} />
      <ol aria-label={`Stops on ${trail.title}`} className="max-w-2xl">
        {trail.stops.map((stop, index) => (
          <TrailStopItem key={stop.placeId} stop={stop} isLast={index === trail.stops.length - 1} />
        ))}
      </ol>
    </>
  )
}

function TrailHeader({ trail }: { trail: Trail }) {
  return (
    <header className="mb-10 max-w-2xl">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 font-sans text-xs font-semibold text-accent-strong">
          {trail.kind === 'neighborhood' ? 'Neighborhood walk' : 'Theme trail'}
        </span>
        {trail.isPlaceholder && <SampleBadge />}
      </div>
      <h1 className="text-4xl font-semibold md:text-5xl">{trail.title}</h1>
      <p className="mt-2 font-sans text-sm text-muted">{trail.area}</p>
      <p className="mt-4 text-[1.0625rem] leading-relaxed">{trail.description}</p>
      <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 font-sans text-sm font-semibold text-muted">
        <span className="flex items-center gap-1.5">
          <Icon name="route" className="size-4" />
          {pluralize(trail.stopCount, 'stop')}
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="clock" className="size-4" />
          About {formatMinutes(trail.estimatedMinutes)}
        </span>
      </p>
    </header>
  )
}

function TrailError({ onRetry }: { onRetry: () => void }) {
  return (
    <>
      <BackLink fallbackTo={routes.trails} label="Trails" />
      <ErrorState title="We could not load this trail" onRetry={onRetry} />
    </>
  )
}

function TrailNotFound() {
  return (
    <>
      <BackLink fallbackTo={routes.trails} label="Trails" />
      <NotFoundView
        title="We could not find that trail"
        description="The link may be old, or the trail may have been removed."
      />
    </>
  )
}

function TrailSkeleton() {
  return (
    <LoadingRegion label="Loading trail">
      <Skeleton className="mb-6 h-10 w-24" />
      <Skeleton className="h-12 w-4/5" />
      <Skeleton className="mt-4 h-5 w-full" />
      <Skeleton className="mt-10 h-32 w-full" />
      <Skeleton className="mt-6 h-32 w-full" />
    </LoadingRegion>
  )
}
