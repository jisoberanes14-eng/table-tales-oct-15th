import type {
  Place,
  PlaceSummary,
  PriceTier,
  ResolvedTrailStop,
  SavedStory,
  Trail,
  TrailDetail,
  TrailStop,
} from '@/types'
import type { Database } from './database.types'

type Tables = Database['public']['Tables']
type PlaceRow = Tables['places']['Row']
type DetailRow = Tables['place_details']['Row']
type SectionRow = Tables['place_sections']['Row']
type SourceRow = Tables['place_sources']['Row']
type TrailRow = Tables['trails']['Row']
type TrailStopRow = Tables['trail_stops']['Row']

/** A full place: the public card row plus the signed-in-only rows. */
export type PlaceFullRow = PlaceRow & {
  place_details: DetailRow
  place_sections: SectionRow[]
  place_sources: SourceRow[]
}

export type TrailDetailRow = TrailRow & {
  trail_stops: (TrailStopRow & { places: PlaceRow })[]
}

export interface SavedRow {
  place_id: string
  saved_at: string
  notes: { id: string; text: string; created_at: string }[]
}

/** The database enforces 1..4 with a CHECK constraint; this narrows the type and fails loudly otherwise. */
function toPriceTier(value: number): PriceTier {
  if (value === 1 || value === 2 || value === 3 || value === 4) return value
  throw new Error(`Unexpected price_tier from database: ${value}`)
}

export function toPlaceSummary(row: PlaceRow): PlaceSummary {
  return {
    id: row.id,
    name: row.name,
    neighborhood: row.neighborhood,
    cuisine: row.cuisine,
    priceTier: toPriceTier(row.price_tier),
    tags: row.tags,
    summary: row.summary,
    sourceLabel: row.source_label,
    mockDistanceMiles: row.mock_distance_miles,
    isPlaceholder: row.is_placeholder,
    isClosed: row.is_closed,
  }
}

export function toPlace(row: PlaceFullRow): Place {
  return {
    ...toPlaceSummary(row),
    sections: [...row.place_sections]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((section) => ({ kind: section.kind, title: section.title, body: section.body })),
    sources: [...row.place_sources]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((source) => ({
        label: source.label,
        kind: source.kind,
        ...(source.note !== null && { note: source.note }),
      })),
    whatToOrder: { dish: row.place_details.order_dish, why: row.place_details.order_why },
    askThem: row.place_details.ask_them,
  }
}

export function toTrail(row: TrailRow): Trail {
  return {
    id: row.id,
    title: row.title,
    kind: row.kind,
    area: row.area,
    description: row.description,
    estimatedMinutes: row.estimated_minutes,
    stopCount: row.stop_count,
    isPlaceholder: row.is_placeholder,
  }
}

function toTrailStop(row: TrailStopRow): TrailStop {
  return {
    order: row.stop_order,
    placeId: row.place_id,
    blurb: row.blurb,
    ...(row.from_previous !== null && { fromPrevious: row.from_previous }),
  }
}

export function toTrailDetail(row: TrailDetailRow): TrailDetail {
  const stops: ResolvedTrailStop[] = [...row.trail_stops]
    .sort((a, b) => a.stop_order - b.stop_order)
    .map((stop) => ({ ...toTrailStop(stop), place: toPlaceSummary(stop.places) }))
  return { ...toTrail(row), stops }
}

export function toSavedStory(row: SavedRow): SavedStory {
  return {
    placeId: row.place_id,
    savedAt: row.saved_at,
    notes: [...row.notes]
      .sort((a, b) => a.created_at.localeCompare(b.created_at))
      .map((note) => ({ id: note.id, text: note.text, createdAt: note.created_at })),
  }
}
