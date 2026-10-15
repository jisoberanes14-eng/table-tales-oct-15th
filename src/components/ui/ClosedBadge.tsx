/** Shown on places an admin has confirmed as closed. The story and history stay readable. */
export function ClosedBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-ink px-2.5 py-0.5 font-sans text-xs font-semibold tracking-wide text-surface uppercase ${className}`}
    >
      Closed
    </span>
  )
}
