/** Shown on every placeholder story so nobody mistakes seed content for real history. */
export function SampleBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-sample-soft px-2.5 py-0.5 font-sans text-xs font-semibold tracking-wide text-sample uppercase ${className}`}
    >
      Sample content
    </span>
  )
}
