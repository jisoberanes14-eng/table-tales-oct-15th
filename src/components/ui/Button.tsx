import type { ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { buttonClasses, type ButtonVariant } from './buttonStyles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button({
  variant = 'secondary',
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...rest} />
}

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant
}

export function ButtonLink({ variant = 'secondary', className = '', ...rest }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...rest} />
}
