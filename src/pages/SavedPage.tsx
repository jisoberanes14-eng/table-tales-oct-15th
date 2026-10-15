import { Link } from 'react-router-dom'
import { AccountBar } from '@/components/auth/AccountBar'
import { SignInPanel } from '@/components/auth/SignInPanel'
import { PageHeader } from '@/components/layout/PageHeader'
import { NoteList } from '@/components/place/NoteList'
import { PriceTier } from '@/components/place/PriceTier'
import { ButtonLink } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { LoadingRegion, Skeleton } from '@/components/ui/Skeleton'
import { ClosedBadge } from '@/components/ui/ClosedBadge'
import { SampleBadge } from '@/components/ui/SampleBadge'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useDeleteNote, useSavedStories, useUnsaveStory } from '@/hooks/useSaved'
import { pluralize } from '@/lib/format'
import { routes } from '@/lib/routes'

/** Saved stories and notes belong to a person, so signed-out visitors are asked to sign in. */
export function SavedPage() {
  useDocumentTitle('Saved')
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <LoadingRegion label="Loading">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="mt-6 h-48 rounded-2xl" />
      </LoadingRegion>
    )
  }

  if (user === null) {
    return (
      <>
        <PageHeader
          eyebrow="Saved"
          title="Your stories"
          description="Save the stories that stay with you and keep your own notes."
        />
        <div className="max-w-2xl">
          <SignInPanel
            title="Sign in to see your saved stories"
            description="Your saved stories and notes follow you to any device. Free: we just email you a link, no password."
          />
        </div>
      </>
    )
  }

  return <SavedList />
}

function SavedList() {
  const { items, isPending, isError, refetch } = useSavedStories()
  const unsaveStory = useUnsaveStory()
  const deleteNote = useDeleteNote()

  return (
    <>
      <PageHeader
        eyebrow="Saved"
        title="Your stories"
        description="Stories you have saved, with your own notes. Private to your account."
      >
        <AccountBar className="mt-4 max-w-xs md:hidden" />
      </PageHeader>

      {isPending ? (
        <LoadingRegion label="Loading saved stories">
          <div className="grid gap-4 lg:grid-cols-2">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        </LoadingRegion>
      ) : isError || !items ? (
        <ErrorState title="We could not load your saved stories" onRetry={refetch} />
      ) : items.length === 0 ? (
        <EmptyState
          icon="bookmark"
          title="Nothing saved yet"
          description="When a story stays with you, tap Save story and it will wait here, along with any notes you add."
          action={
            <ButtonLink to={routes.home} variant="primary">
              Explore stories
            </ButtonLink>
          }
        />
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2">
          {items.map(({ saved, place }) => (
            <li key={saved.placeId}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-raised p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap gap-2 empty:hidden">
                      {place.isPlaceholder && <SampleBadge />}
                      {place.isClosed && <ClosedBadge />}
                    </div>
                    <h2 className="text-xl font-semibold">
                      <Link to={routes.place(place.id)} className="hover:underline">
                        {place.name}
                      </Link>
                    </h2>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 font-sans text-sm text-muted">
                      <span>{place.neighborhood}</span>
                      <span aria-hidden="true">·</span>
                      <PriceTier tier={place.priceTier} />
                    </p>
                  </div>
                  <IconButton
                    icon="trash"
                    label={`Remove ${place.name} from saved`}
                    onClick={() => unsaveStory.mutate(place.id)}
                    disabled={unsaveStory.isPending}
                    className="-mr-2 -mt-1"
                  />
                </div>

                {saved.notes.length > 0 ? (
                  <div className="mt-4">
                    <h3 className="mb-2 font-sans text-xs font-semibold tracking-widest text-muted uppercase">
                      {pluralize(saved.notes.length, 'note')}
                    </h3>
                    <NoteList
                      notes={saved.notes}
                      onDelete={(noteId) => deleteNote.mutate({ placeId: place.id, noteId })}
                    />
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-muted">No notes yet.</p>
                )}

                <Link
                  to={routes.place(place.id)}
                  className="mt-auto inline-flex min-h-11 items-center gap-1 pt-4 font-sans text-[0.9375rem] font-semibold text-accent-strong underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                >
                  {saved.notes.length > 0 ? 'Open story' : 'Open story to add a note'}
                  <span className="sr-only"> for {place.name}</span>
                  <Icon name="chevron-right" className="size-4" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
