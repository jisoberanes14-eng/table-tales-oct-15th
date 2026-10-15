import type { Neighborhood } from '@/types'
import type { PlacesRepository } from '../repositories'
import type { TableTalesClient } from './client'
import { toPlace, toPlaceSummary } from './mappers'

/** `!inner` makes signed-out callers get NO row, because they cannot read the joined tables. */
const FULL_SELECT = '*, place_details!inner(*), place_sections(*), place_sources(*)'

/** Escape LIKE wildcards so a typed "%" or "_" is matched literally. */
function escapeLike(token: string): string {
  return token.replace(/[\\%_]/g, '\\$&')
}

export function createSupabasePlacesRepository(db: TableTalesClient): PlacesRepository {
  return {
    async listPlaces() {
      const { data, error } = await db.from('places').select('*').order('name')
      if (error) throw new Error(error.message)
      return data.map(toPlaceSummary)
    },

    async getPlaceSummary(placeId) {
      const { data, error } = await db.from('places').select('*').eq('id', placeId).maybeSingle()
      if (error) throw new Error(error.message)
      return data ? toPlaceSummary(data) : null
    },

    async getPlace(placeId) {
      const { data, error } = await db
        .from('places')
        .select(FULL_SELECT)
        .eq('id', placeId)
        .maybeSingle()
      if (error) throw new Error(error.message)
      return data ? toPlace(data) : null
    },

    async searchPlaces(query) {
      // The database does the matching: every word must appear in places.search_text,
      // which only ever contains public card fields.
      const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
      let request = db.from('places').select('*').order('name')
      for (const token of tokens) {
        request = request.ilike('search_text', `%${escapeLike(token)}%`)
      }
      const { data, error } = await request
      if (error) throw new Error(error.message)
      return data.map(toPlaceSummary)
    },

    async listNeighborhoods() {
      const { data, error } = await db
        .from('neighborhoods')
        .select('name, place_count')
        .order('name')
      if (error) throw new Error(error.message)
      return data.flatMap((row): Neighborhood[] =>
        row.name !== null && row.place_count !== null
          ? [{ name: row.name, placeCount: row.place_count }]
          : [],
      )
    },
  }
}
