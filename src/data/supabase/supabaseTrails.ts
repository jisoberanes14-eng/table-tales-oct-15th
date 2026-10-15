import type { TrailsRepository } from '../repositories'
import type { TableTalesClient } from './client'
import { toTrail, toTrailDetail } from './mappers'

export function createSupabaseTrailsRepository(db: TableTalesClient): TrailsRepository {
  return {
    async listTrails() {
      const { data, error } = await db.from('trails').select('*').order('title')
      if (error) throw new Error(error.message)
      return data.map(toTrail)
    },

    async getTrail(trailId) {
      // One round trip: the trail, its stops, and each stop's place card.
      // `!inner`: signed-out callers cannot read trail_stops, so they get no row at all.
      const { data, error } = await db
        .from('trails')
        .select('*, trail_stops!inner(*, places(*))')
        .eq('id', trailId)
        .maybeSingle()
      if (error) throw new Error(error.message)
      return data ? toTrailDetail(data) : null
    },
  }
}
