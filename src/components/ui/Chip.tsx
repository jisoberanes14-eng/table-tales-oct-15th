import type { ButtonHTMLAttributes } from 'react'

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Toggle state, announced to screen readers via aria-pressed. */
  pressed: boolean
}

/** A toggleable filter chip with a 44px tap target. */
export function Chip({ pressed, className = '', type = 'button', children, ...rest }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={pressed}
      className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 font-sans text-sm font-semibold transition-colors ${
        pressed
          ? 'border-accent bg-accent text-on-accent'
          : 'border-line bg-raised text-ink hover:bg-sunken'
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
