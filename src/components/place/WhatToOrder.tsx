import type { WhatToOrder as WhatToOrderData } from '@/types'

export function WhatToOrder({ order }: { order: WhatToOrderData }) {
  return (
    <section aria-labelledby="what-to-order" className="rounded-2xl bg-accent-soft p-5">
      <h2
        id="what-to-order"
        className="font-sans text-xs font-semibold tracking-widest text-accent-strong uppercase"
      >
        What to order
      </h2>
      <p className="mt-2 font-display text-xl font-semibold">{order.dish}</p>
      <p className="mt-2 text-[0.9375rem] leading-relaxed">{order.why}</p>
    </section>
  )
}
