import { useEffect } from 'react'
import { APP_NAME } from '@/lib/constants'

/** Sets the browser tab title; pass undefined to show just the app name. */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${APP_NAME}` : APP_NAME
  }, [title])
}
