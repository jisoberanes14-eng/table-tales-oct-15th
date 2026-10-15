import type { ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

interface EmptyStateProps {
  icon?: IconName
  title: string
  description?: string
  /** Typically a ButtonLink or Button. */
  action?: ReactNode
}

export function EmptyState({ icon = 'compass', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-raised px-6 py-12 text-center">
      <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
        <Icon name={icon} className="size-7" />
      </span>
      <h2 className="text-xl font-semibold">{title}</h2>
      {description && <p className="mt-2 max-w-sm text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
