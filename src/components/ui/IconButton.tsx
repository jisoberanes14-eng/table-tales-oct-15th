import type { ButtonHTMLAttributes } from 'react'
import { Icon, type IconName } from './Icon'

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: IconName
  /** Required: icon-only buttons need an accessible name. */
  label: string
}

export function IconButton({
  icon,
  label,
  className = '',
  type = 'button',
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full text-muted hover:bg-line/50 hover:text-ink ${className}`}
      {...rest}
    >
      <Icon name={icon} />
    </button>
  )
}
