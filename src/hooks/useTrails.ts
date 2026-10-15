import { useQuery } from '@tanstack/react-query'
import { trailsRepo } from '@/data'
import { queryKeys } from '@/lib/queryKeys'
import { useAuth } from './useAuth'

/** Public trail cards. */
export function useTrails() {
  return useQuery({
    queryKey: queryKeys.trails.list(),
    queryFn: () => trailsRepo.listTrails(),
  })
}

/** One public trail card, picked out of the same cached list the Trails screen uses. */
export function useTrailSummary(trailId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.trails.list(),
    queryFn: () => trailsRepo.listTrails(),
    select: (trails) => trails.find((trail) => trail.id === trailId) ?? null,
  })
}

/**
 * The trail with its stops. Only fetched when someone is signed in; the database refuses it
 * otherwise. While disabled, `isPending` stays true, so check `useAuth()` first.
 */
export function useTrail(trailId: string | undefined) {
  const { user } = useAuth()
  return useQuery({
    queryKey: queryKeys.trails.detail(trailId ?? ''),
    queryFn: () => trailsRepo.getTrail(trailId ?? ''),
    enabled: trailId !== undefined && user !== null,
  })
}
