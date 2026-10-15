import type { PlaceSummary } from './place'

export interface TrailStop {
  /** 1-based position in the trail. */
  order: number
  placeId: string
  /** Short blurb about why this stop is on the trail. */
  blurb: string
  /** How to get here from the previous stop, e.g. "4 min walk". Absent on the first stop. */
  fromPrevious?: string
}

/** The public trail "card". Its stops are only readable when signed in. */
export interface Trail {
  id: string
  title: string
  kind: 'neighborhood' | 'theme'
  /** Neighborhood name, or a phrase like "Across the city" for theme trails. */
  area: string
  description: string
  estimatedMinutes: number
  stopCount: number
  isPlaceholder: boolean
}

export interface ResolvedTrailStop extends TrailStop {
  place: PlaceSummary
}

/** A trail with each stop's place already looked up. Signed-in users only. */
export interface TrailDetail extends Trail {
  stops: ResolvedTrailStop[]
}
