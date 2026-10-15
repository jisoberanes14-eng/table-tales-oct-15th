/** Artificial latency so loading states get exercised during development. */
export function delay(minMs = 250, maxMs = 600): Promise<void> {
  const ms = minMs + Math.random() * (maxMs - minMs)
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Dev-only switch for checking error states: load any page with `?mockError`
 * in the URL (e.g. http://localhost:5173/?mockError) and read calls will fail.
 */
export function failIfRequested(): void {
  if (import.meta.env.DEV && new URLSearchParams(window.location.search).has('mockError')) {
    throw new Error('Mock error: simulated network failure (?mockError)')
  }
}
