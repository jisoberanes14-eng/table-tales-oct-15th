import type { ResolvedTrailStop, Trail } from '@/types'
import type { TrailsRepository } from '../repositories'
import { delay, failIfRequested } from './delay'
import { toSummary } from './mockPlaces'
import { placesSeed } from './places.seed'
import { trailsSeed, type TrailSeed } from './trails.seed'

function toTrailCard({ stops, ...card }: TrailSeed): Trail {
  return { ...card, stopCount: stops.length }
}

/** NOTE: the mock does not enforce sign-in rules; only the Supabase database does. */
export const mockTrailsRepository: TrailsRepository = {
  async listTrails() {
    await delay()
    failIfRequested()
    return trailsSeed.map(toTrailCard)
  },

  async getTrail(trailId) {
    await delay()
    failIfRequested()
    const trail = trailsSeed.find((candidate) => candidate.id === trailId)
    if (!trail) return null

    const stops: ResolvedTrailStop[] = [...trail.stops]
      .sort((a, b) => a.order - b.order)
      .map((stop) => {
        const place = placesSeed.find((candidate) => candidate.id === stop.placeId)
        if (!place)
          throw new Error(`Trail "${trail.id}" references unknown place "${stop.placeId}"`)
        return { ...stop, place: toSummary(place) }
      })

    return { ...toTrailCard(trail), stops }
  },
}
