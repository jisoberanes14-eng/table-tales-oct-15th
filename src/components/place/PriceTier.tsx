import { PRICE_DESCRIPTIONS } from '@/lib/constants'
import type { PriceTier as PriceTierValue } from '@/types'

/** Renders $ to $$$$ with the unused dollar signs dimmed and an accessible text label. */
export function PriceTier({ tier }: { tier: PriceTierValue }) {
  return (
    <span
      className="font-sans text-sm font-semibold"
      role="img"
      aria-label={`Price: ${PRICE_DESCRIPTIONS[tier]}, ${tier} of 4`}
    >
      <span aria-hidden="true">
        {'$'.repeat(tier)}
        <span className="text-line">{'$'.repeat(4 - tier)}</span>
      </span>
    </span>
  )
}
