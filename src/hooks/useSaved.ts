import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { savedRepo } from '@/data'
import { queryKeys } from '@/lib/queryKeys'
import { useAuth } from './useAuth'
import { usePlaces } from './usePlaces'

/** Saved stories belong to the signed-in person, so nothing is fetched while signed out. */
export function useSaved() {
  const { user } = useAuth()
  return useQuery({
    queryKey: queryKeys.saved.list(),
    queryFn: () => savedRepo.listSaved(),
    enabled: user !== null,
  })
}

/** The saved record (with notes) for one place, or null if it is not saved. */
export function useSavedStory(placeId: string) {
  const { user } = useAuth()
  return useQuery({
    queryKey: queryKeys.saved.detail(placeId),
    queryFn: () => savedRepo.getSaved(placeId),
    enabled: user !== null,
  })
}

/** Saved stories joined with their place cards, ready for the Saved screen. */
export function useSavedStories() {
  const saved = useSaved()
  const places = usePlaces()

  const items =
    saved.data && places.data
      ? saved.data.flatMap((story) => {
          const place = places.data.find((candidate) => candidate.id === story.placeId)
          return place ? [{ saved: story, place }] : []
        })
      : undefined

  return {
    items,
    isPending: saved.isPending || places.isPending,
    isError: saved.isError || places.isError,
    refetch: () => {
      void saved.refetch()
      void places.refetch()
    },
  }
}

function useInvalidateSaved() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: queryKeys.saved.all })
}

export function useSaveStory() {
  const invalidate = useInvalidateSaved()
  return useMutation({
    mutationFn: (placeId: string) => savedRepo.saveStory(placeId),
    onSuccess: invalidate,
  })
}

export function useUnsaveStory() {
  const invalidate = useInvalidateSaved()
  return useMutation({
    mutationFn: (placeId: string) => savedRepo.unsaveStory(placeId),
    onSuccess: invalidate,
  })
}

export function useAddNote() {
  const invalidate = useInvalidateSaved()
  return useMutation({
    mutationFn: ({ placeId, text }: { placeId: string; text: string }) =>
      savedRepo.addNote(placeId, text),
    onSuccess: invalidate,
  })
}

export function useDeleteNote() {
  const invalidate = useInvalidateSaved()
  return useMutation({
    mutationFn: ({ placeId, noteId }: { placeId: string; noteId: string }) =>
      savedRepo.deleteNote(placeId, noteId),
    onSuccess: invalidate,
  })
}
