import { useCallback, useEffect, useRef, useState } from 'react'
import { shareLink, type ShareInput, type ShareOutcome } from '@/lib/share'

/** Wraps shareLink and exposes a short-lived outcome for a status message. */
export function useShare() {
  const [outcome, setOutcome] = useState<ShareOutcome | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const share = useCallback(async (input: ShareInput) => {
    const result = await shareLink(input)
    setOutcome(result)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setOutcome(null), 3000)
  }, [])

  return { share, outcome }
}
