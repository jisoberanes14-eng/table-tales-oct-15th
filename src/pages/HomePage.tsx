import { useSearchParams } from 'react-router-dom'
import { NeighborhoodChips } from '@/components/discover/NeighborhoodChips'
import { SearchField } from '@/components/discover/SearchField'
import { PlaceCard, PlaceCardSkeletonList } from '@/components/place/PlaceCard'
import { TrailCard } from '@/components/trail/TrailCard'
import { Button, ButtonLink } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingRegion, Skeleton } from '@/components/ui/Skeleton'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useNeighborhoods, useSearchPlaces } from '@/hooks/usePlaces'
import { useTrails } from '@/hooks/useTrails'
import { APP_NAME, APP_TAGLINE } from '@/lib/constants'
import { pluralize } from '@/lib/format'
import { routes } from '@/lib/routes'

export function HomePage() {
  useDocumentTitle()

  // Search and neighborhood live in the URL so the Back button restores them.
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const neighborhood = params.get('hood')

  function updateParam(key: 'q' | 'hood', value: string | null) {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true },
    )
  }

  const placesQuery = useSearchPlaces(query)
  const neighborhoodsQuery = useNeighborhoods()
  const trailsQuery = useTrails()

  const isSearching = query.trim().length > 0
  const places = (placesQuery.data ?? [])
    .filter((place) => neighborhood === null || place.neighborhood === neighborhood)
    .sort((a, b) => a.mockDistanceMiles - b.mockDistanceMiles)

  return (
    <>
      <header className="mb-8">
        <p className="font-display text-3xl font-semibold text-accent-strong md:hidden">
          {APP_NAME}
        </p>
        <h1 className="mt-1 text-3xl font-semibold md:mt-0 md:text-4xl">{APP_TAGLINE}</h1>
        <p className="mt-2 max-w-prose text-muted">
          Short stories about the families, dishes, and buildings behind Chicago&rsquo;s tables.
        </p>
        <div className="mt-5 max-w-xl">
          <SearchField value={query} onChange={(value) => updateParam('q', value || null)} />
        </div>
      </header>

      <section aria-labelledby="hoods-heading" className="mb-10">
        <h2 id="hoods-heading" className="mb-3 text-xl font-semibold">
          Browse by neighborhood
        </h2>
        {neighborhoodsQuery.isPending ? (
          <LoadingRegion label="Loading neighborhoods">
            <div className="flex gap-2 overflow-hidden">
              {Array.from({ length: 5 }, (_, i) => (
                <Skeleton key={i} className="h-11 w-28 shrink-0 rounded-full" />
              ))}
            </div>
          </LoadingRegion>
        ) : neighborhoodsQuery.isError ? (
          <ErrorState
            title="Could not load neighborhoods"
            onRetry={() => void neighborhoodsQuery.refetch()}
          />
        ) : (
          <NeighborhoodChips
            neighborhoods={neighborhoodsQuery.data}
            selected={neighborhood}
            onSelect={(name) => updateParam('hood', name)}
          />
        )}
      </section>

      <section aria-labelledby="places-heading" className="mb-12">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4">
          <h2 id="places-heading" className="text-xl font-semibold">
            {isSearching ? 'Search results' : 'Stories near you'}
          </h2>
          {!placesQuery.isPending && !placesQuery.isError && (
            <p role="status" className="font-sans text-sm text-muted">
              {pluralize(places.length, 'story', 'stories')}
              {neighborhood ? ` in ${neighborhood}` : ''}
            </p>
          )}
        </div>
        {!isSearching && (
          <p className="mb-4 font-sans text-xs text-muted">
            Distances are sample values until location is added.
          </p>
        )}

        {placesQuery.isPending ? (
          <LoadingRegion label="Loading stories">
            <PlaceCardSkeletonList />
          </LoadingRegion>
        ) : placesQuery.isError ? (
          <ErrorState onRetry={() => void placesQuery.refetch()} />
        ) : places.length === 0 ? (
          <EmptyState
            icon="search"
            title="No stories match that"
            description="Try a different word, or clear your filters to see everything."
            action={
              <Button
                variant="primary"
                onClick={() => {
                  setParams({}, { replace: true })
                }}
              >
                Clear search and filters
              </Button>
            }
          />
        ) : (
          <ul className="grid gap-4 lg:grid-cols-2">
            {places.map((place) => (
              <li key={place.id}>
                <PlaceCard place={place} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {!isSearching && (
        <section aria-labelledby="trails-heading">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 id="trails-heading" className="text-xl font-semibold">
              Featured trails
            </h2>
            <ButtonLink to={routes.trails} variant="ghost" className="-mr-3">
              All trails
            </ButtonLink>
          </div>
          {trailsQuery.isPending ? (
            <LoadingRegion label="Loading trails">
              <div className="grid gap-4 lg:grid-cols-2">
                <Skeleton className="h-48 rounded-2xl" />
                <Skeleton className="h-48 rounded-2xl" />
              </div>
            </LoadingRegion>
          ) : trailsQuery.isError ? (
            <ErrorState title="Could not load trails" onRetry={() => void trailsQuery.refetch()} />
          ) : (
            <ul className="grid gap-4 lg:grid-cols-2">
              {trailsQuery.data.map((trail) => (
                <li key={trail.id}>
                  <TrailCard trail={trail} />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  )
}
