export type ShareOutcome = 'shared' | 'copied' | 'cancelled' | 'failed'

export interface ShareInput {
  title: string
  text: string
  /** Path within the app, e.g. "/places/some-id". Turned into a full URL here. */
  path: string
}

/** Full, shareable URL for an in-app path. */
export function buildShareUrl(path: string): string {
  return new URL(path, window.location.origin).toString()
}

/**
 * Opens the native share sheet when the Web Share API exists (most phones),
 * otherwise copies the link to the clipboard. The Web Share API needs HTTPS
 * (localhost counts as secure).
 */
export async function shareLink({ title, text, path }: ShareInput): Promise<ShareOutcome> {
  const url = buildShareUrl(path)

  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title, text, url })
      return 'shared'
    } catch (error) {
      // Dismissing the share sheet rejects with AbortError; that is not a failure.
      if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled'
      // Any other error: fall through to copy.
    }
  }

  return (await copyToClipboard(url)) ? 'copied' : 'failed'
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return legacyCopy(text)
  }
}

/** Last resort for browsers/contexts without the async Clipboard API. */
function legacyCopy(text: string): boolean {
  const field = document.createElement('textarea')
  field.value = text
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.appendChild(field)
  field.select()
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    document.body.removeChild(field)
  }
}
