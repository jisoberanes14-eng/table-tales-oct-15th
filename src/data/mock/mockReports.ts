import { readJson, writeJson } from '@/lib/storage'
import type { ReportsRepository } from '../repositories'
import { delay } from './delay'

const STORAGE_KEY = 'table-tales:closure-reports:v1'

const isIdList = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

const load = (): string[] => readJson<string[]>(STORAGE_KEY, isIdList, [])

/** Development stand-in: reports are kept in this browser only. */
export const mockReportsRepository: ReportsRepository = {
  async hasReportedClosed(placeId) {
    await delay(100, 250)
    return load().includes(placeId)
  },

  async reportClosed(placeId) {
    await delay(100, 250)
    const ids = load()
    if (!ids.includes(placeId)) writeJson(STORAGE_KEY, [...ids, placeId])
  },

  async withdrawClosedReport(placeId) {
    await delay(100, 250)
    writeJson(
      STORAGE_KEY,
      load().filter((id) => id !== placeId),
    )
  },
}
