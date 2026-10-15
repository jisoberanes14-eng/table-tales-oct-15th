/**
 * Tiny localStorage wrapper. Storage can be unavailable (private mode, blocked cookies,
 * quota errors), so every call is guarded and falls back to an in-memory map.
 */
const memory = new Map<string, string>()

export function readJson<T>(key: string, isValid: (value: unknown) => value is T, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key) ?? memory.get(key)
    if (raw == null) return fallback
    const parsed: unknown = JSON.parse(raw)
    return isValid(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export function writeJson(key: string, value: unknown): void {
  const raw = JSON.stringify(value)
  try {
    window.localStorage.setItem(key, raw)
    memory.delete(key)
  } catch {
    memory.set(key, raw)
  }
}
