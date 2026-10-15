import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { SignInPanel } from '@/components/auth/SignInPanel'
import { BackLink } from '@/components/layout/BackLink'
import { NotFoundView } from '@/components/layout/NotFoundView'
import { AskThem } from '@/components/place/AskThem'
import { PlaceActions } from '@/components/place/PlaceActions'
import { PlaceNotes } from '@/components/place/PlaceNotes'
import { PriceTier } from '@/components/place/PriceTier'
import { SourceBadge } from '@/components/place/SourceBadge'
import { SourceList } from '@/components/place/SourceList'
import { StorySectionBlock } from '@/components/place/StorySectionBlock'
import { StoryTagList } from '@/components/place/StoryTag'
import { WhatToOrder } from '@/components/place/WhatToOrder'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingRegion, Skeleton } from '@/components/ui/Skeleton'
import { ClosedBadge } from '@/components/ui/ClosedBadge'
import { SampleBadge } from '@/components/ui/SampleBadge'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { usePlace, usePlaceSummary } from '@/hooks/usePlaces'
import { routes } from '@/lib/routes'
import type { Place, PlaceSummary } from '@/types'

/**
 * Signed out: the public card plus a sign-in prompt (the full story is never even requested;
 * the database would refuse it anyway). Signed in: the full story.
 */
export function PlacePage() {
  const { placeId } = useParams()
  const { user, isLoading: authLoading } = useAuth()
  const summary = usePlaceSummary(placeId, user === null)
  const full = usePlace(placeId)

  useDocumentTitle(full.data?.name ?? summary.data?.name)

  if (authLoading) return <PlacePageSkeleton />

  if (user === null) {
    if (summary.isPending) return <PlacePageSkeleton />
    if (summary.isError) {
      return (
        <>
          <BackLink fallbackTo={routes.home} label="Discover" />
          <ErrorState title="We could not load this story" onRetry={() => void summary.refetch()} />
        </>
      )
    }
    if (!summary.data) return <PlaceNotFound />
    return <SignedOutPlace place={summary.data} />
  }

  if (full.isPending) return <PlacePageSkeleton />
  if (full.isError) {
    return (
      <>
        <BackLink fallbackTo={routes.home} label="Discover" />
        <ErrorState title="We could not load this story" onRetry={() => void full.refetch()} />
      </>
    )
  }
  if (!full.data) return <PlaceNotFound />

  return <PlaceStory place={full.data} />
}

function PlaceNotFound() {
  return (
    <>
      <BackLink fallbackTo={routes.home} label="Discover" />
      <NotFoundView
        title="We could not find that story"
        description="The link may be old, or this place may have been removed."
      />
    </>
  )
}

function PlaceHeader({ place }: { place: PlaceSummary }) {
  return (
    <header>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {place.isPlaceholder && <SampleBadge />}
        {place.isClosed && <ClosedBadge />}
      </div>
      <h1 className="text-5xl leading-[1.2] font-semibold">{place.name}</h1>
      <p className="mt-3 flex flex-wrap items-center gap-x-2 font-sans text-[0.9375rem] text-muted">
        <span>{place.neighborhood}</span>
        <span aria-hidden="true">·</span>
        <span>{place.cuisine}</span>
        <span aria-hidden="true">·</span>
        <PriceTier tier={place.priceTier} />
      </p>
      <div className="mt-4">
        <StoryTagList tags={place.tags} />
      </div>
      <div className="mt-5">
        <SourceBadge label={place.sourceLabel} showDescription />
      </div>
    </header>
  )
}

function SignedOutPlace({ place }: { place: PlaceSummary }) {
  return (
    <>
      <BackLink fallbackTo={routes.home} label="Back" />
      <div className="max-w-2xl">
        <PlaceHeader place={place} />
        <p className="mt-8 border-l-4 border-accent pl-4 font-display text-xl leading-snug text-ink italic">
          {place.summary}
        </p>
        <div className="mt-10">
          <SignInPanel
            title="Sign in to read the full story"
            description="The family, the food, the building, the neighborhood, what to order, and what to ask. Free: we just email you a link, no password."
          />
        </div>
      </div>
    </>
  )
}

function PlaceStory({ place }: { place: Place }) {
  const [notesOpen, setNotesOpen] = useState(false)

  return (
    <>
      <BackLink fallbackTo={routes.home} label="Back" />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-12">
        <div>
          <PlaceHeader place={place} />

          <div className="mt-6">
            <PlaceActions
              place={place}
              notesOpen={notesOpen}
              onToggleNotes={() => setNotesOpen((open) => !open)}
            />
            <PlaceNotes placeId={place.id} open={notesOpen} />
          </div>

          <article aria-label={`The story of ${place.name}`} className="mt-8">
            <p className="mb-10 border-l-4 border-accent pl-4 font-display text-xl leading-snug text-ink italic md:max-w-[60ch]">
              {place.summary}
            </p>
            {place.sections.map((section) => (
              <StorySectionBlock key={section.kind} section={section} />
            ))}
            {place.sections.length === 0 && (
              <p className="text-muted">The full story for this place is still being written.</p>
            )}
            <SourceList sources={place.sources} />
          </article>
        </div>

        <aside
          aria-label="At the table"
          className="mt-10 space-y-6 lg:sticky lg:top-10 lg:mt-0 lg:self-start"
        >
          <WhatToOrder order={place.whatToOrder} />
          <AskThem questions={place.askThem} />
        </aside>
      </div>
    </>
  )
}

function PlacePageSkeleton() {
  return (
    <LoadingRegion label="Loading story">
      <Skeleton className="mb-6 h-10 w-24" />
      <Skeleton className="h-6 w-28 rounded-full" />
      <Skeleton className="mt-4 h-12 w-4/5" />
      <Skeleton className="mt-4 h-5 w-2/3" />
      <div className="mt-6 flex gap-3">
        <Skeleton className="h-11 w-32 rounded-full" />
        <Skeleton className="h-11 w-32 rounded-full" />
        <Skeleton className="h-11 w-28 rounded-full" />
      </div>
      <Skeleton className="mt-10 h-5 w-full" />
      <Skeleton className="mt-3 h-5 w-full" />
      <Skeleton className="mt-3 h-5 w-5/6" />
      <Skeleton className="mt-10 h-40 w-full" />
    </LoadingRegion>
  )
}
