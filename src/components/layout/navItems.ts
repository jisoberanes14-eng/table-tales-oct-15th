import type { IconName } from '@/components/ui/Icon'
import { routes } from '@/lib/routes'

export interface NavItem {
  to: string
  label: string
  icon: IconName
  /** Home must match exactly, otherwise it would be "active" on every page. */
  end?: boolean
}

export const navItems: NavItem[] = [
  { to: routes.home, label: 'Discover', icon: 'compass', end: true },
  { to: routes.trails, label: 'Trails', icon: 'route' },
  { to: routes.saved, label: 'Saved', icon: 'bookmark' },
]
