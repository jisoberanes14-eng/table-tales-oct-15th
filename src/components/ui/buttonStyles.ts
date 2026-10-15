export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const base =
  'inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-5 py-2 font-sans text-[0.9375rem] font-semibold leading-tight transition-colors disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-on-accent hover:bg-accent-strong',
  secondary: 'border border-line bg-raised text-ink hover:bg-sunken',
  ghost: 'text-ink hover:bg-sunken',
}

export function buttonClasses(variant: ButtonVariant = 'secondary', extra = ''): string {
  return `${base} ${variants[variant]} ${extra}`.trim()
}
