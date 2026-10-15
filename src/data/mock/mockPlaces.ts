import type { Neighborhood, Place, PlaceSummary } from '@/types'
import type { PlacesRepository } from '../repositories'
import { delay, failIfRequested } from './delay'
import { placesSeed } from './places.seed'

/** Drops the story-only fields, leaving the public card. */
export function toSummary(place: Place): PlaceSummary {
  return {
    id: place.id,
    name: place.name,
    neighborhood: place.neighborhood,
    cuisine: place.cuisine,
    priceTier: place.priceTier,
    tags: place.tags,
    summary: place.summary,
    sourceLabel: place.sourceLabel,
    mockDistanceMiles: place.mockDistanceMiles,
    isPlaceholder: place.isPlaceholder,
    isClosed: place.isClosed,
  }
}

function matchesQuery(place: Place, tokens: string[]): boolean {
  const haystack = [
    place.name,
    place.neighborhood,
    place.cuisine,
    place.summary,
    ...place.tags.map((tag) => tag.replace(/-/g, ' ')),
  ]
    .join(' ')
    .toLowerCase()
  return tokens.every((token) => haystack.includes(token))
}

/** NOTE: the mock does not enforce sign-in rules; only the Supabase database does. */
export const mockPlacesRepository: PlacesRepository = {
  async listPlaces() {
    await delay()
    failIfRequested()
    return placesSeed.map(toSummary)
  },

  async getPlaceSummary(placeId) {
    await delay(100, 250)
    failIfRequested()
    const place = placesSeed.find((candidate) => candidate.id === placeId)
    return place ? toSummary(place) : null
  },

  async getPlace(placeId) {
    await delay()
    failIfRequested()
    return placesSeed.find((place) => place.id === placeId) ?? null
  },

  async searchPlaces(query) {
    await delay(150, 350)
    failIfRequested()
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
    const matches =
      tokens.length === 0 ? placesSeed : placesSeed.filter((place) => matchesQuery(place, tokens))
    return matches.map(toSummary)
  },

  async listNeighborhoods() {
    await delay(150, 350)
    failIfRequested()
    const counts = new Map<string, number>()
    for (const place of placesSeed) {
      counts.set(place.neighborhood, (counts.get(place.neighborhood) ?? 0) + 1)
    }
    const neighborhoods: Neighborhood[] = [...counts.entries()].map(([name, placeCount]) => ({
      name,
      placeCount,
    }))
    return neighborhoods.sort((a, b) => a.name.localeCompare(b.name))
  },
}
