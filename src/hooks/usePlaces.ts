import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { placesRepo } from '@/data'
import { queryKeys } from '@/lib/queryKeys'
import { useAuth } from './useAuth'

/** Public cards. */
export function usePlaces() {
  return useQuery({
    queryKey: queryKeys.places.list(),
    queryFn: () => placesRepo.listPlaces(),
  })
}

/** One public card. Pass `enabled: false` to skip fetching when the full story is being loaded instead. */
export function usePlaceSummary(placeId: string | undefined, enabled = true) {
  return useQuery({
    queryKey: queryKeys.places.summary(placeId ?? ''),
    queryFn: () => placesRepo.getPlaceSummary(placeId ?? ''),
    enabled: enabled && placeId !== undefined,
  })
}

/**
 * The full story. Only fetched when someone is signed in; the database refuses it otherwise.
 * While disabled, `isPending` stays true, so check `useAuth()` before relying on it.
 */
export function usePlace(placeId: string | undefined) {
  const { user } = useAuth()
  return useQuery({
    queryKey: queryKeys.places.detail(placeId ?? ''),
    queryFn: () => placesRepo.getPlace(placeId ?? ''),
    enabled: placeId !== undefined && user !== null,
  })
}

/** Keeps showing the previous results while a new search is loading, so the list does not flash. */
export function useSearchPlaces(query: string) {
  const normalized = query.trim().toLowerCase()
  return useQuery({
    queryKey: queryKeys.places.search(normalized),
    queryFn: () => placesRepo.searchPlaces(normalized),
    placeholderData: keepPreviousData,
  })
}

export function useNeighborhoods() {
  return useQuery({
    queryKey: queryKeys.places.neighborhoods(),
    queryFn: () => placesRepo.listNeighborhoods(),
  })
}
