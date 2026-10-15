import type { ReportsRepository } from '../repositories'
import type { TableTalesClient } from './client'

/**
 * Closure reports. Which rows a person can see or change is decided by Row Level Security
 * (user_id = the signed-in user); one report per person per place is the table's primary key.
 * Reporting never changes places.is_closed: only an admin can do that.
 */
export function createSupabaseReportsRepository(db: TableTalesClient): ReportsRepository {
  return {
    async hasReportedClosed(placeId) {
      const { data, error } = await db
        .from('place_closure_reports')
        .select('place_id')
        .eq('place_id', placeId)
        .maybeSingle()
      if (error) throw new Error(error.message)
      return data !== null
    },

    async reportClosed(placeId) {
      const { error } = await db
        .from('place_closure_reports')
        .upsert({ place_id: placeId }, { onConflict: 'user_id,place_id', ignoreDuplicates: true })
      if (error) throw new Error(error.message)
    },

    async withdrawClosedReport(placeId) {
      const { error } = await db.from('place_closure_reports').delete().eq('place_id', placeId)
      if (error) throw new Error(error.message)
    },
  }
}
