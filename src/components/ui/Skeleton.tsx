/** Pulsing placeholder block. Decorative: the surrounding region announces loading. */
export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`motion-safe:animate-pulse rounded-md bg-sunken ${className}`}
    />
  )
}

/** Wrap skeleton groups so screen readers hear "Loading" once. */
export function LoadingRegion({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>
      {children}
    </div>
  )
}
