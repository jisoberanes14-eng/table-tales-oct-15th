import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'

interface BackLinkProps {
  /** Where to go when there is no in-app history (e.g. the page was opened from a shared link). */
  fallbackTo: string
  label: string
}

export function BackLink({ fallbackTo, label }: BackLinkProps) {
  const navigate = useNavigate()

  function goBack() {
    // React Router stores the position in the history stack as `idx`; 0 means we landed here directly.
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0
    if (idx > 0) navigate(-1)
    else navigate(fallbackTo)
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="-ml-3 mb-4 inline-flex min-h-11 items-center gap-2 rounded-full px-3 font-sans text-sm font-semibold text-muted hover:bg-sunken hover:text-ink"
    >
      <Icon name="arrow-left" />
      {label}
    </button>
  )
}
