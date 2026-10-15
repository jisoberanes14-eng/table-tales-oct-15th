import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  eyebrow?: string
  description?: string
  children?: ReactNode
}

export function PageHeader({ title, eyebrow, description, children }: PageHeaderProps) {
  return (
    <header className="mb-8">
      {eyebrow && (
        <p className="mb-1 font-sans text-xs font-semibold tracking-widest text-accent-strong uppercase">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-semibold md:text-4xl">{title}</h1>
      {description && <p className="mt-2 max-w-prose text-muted">{description}</p>}
      {children}
    </header>
  )
}
