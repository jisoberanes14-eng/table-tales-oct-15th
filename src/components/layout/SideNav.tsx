import { Link, NavLink } from 'react-router-dom'
import { AccountBar } from '@/components/auth/AccountBar'
import { Icon } from '@/components/ui/Icon'
import { APP_NAME, APP_TAGLINE } from '@/lib/constants'
import { routes } from '@/lib/routes'
import { navItems } from './navItems'

/** Tablet/desktop navigation: a fixed left rail. Hidden on mobile, where BottomNav is used. */
export function SideNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-line bg-raised px-4 py-8 md:flex">
      <Link to={routes.home} className="mb-10 block px-3">
        <span className="block font-display text-2xl font-semibold text-accent-strong">
          {APP_NAME}
        </span>
        <span className="mt-1 block text-sm text-muted italic">{APP_TAGLINE}</span>
      </Link>
      <nav aria-label="Primary">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex min-h-11 items-center gap-3 rounded-xl px-3 font-sans text-[0.9375rem] font-semibold ${
                    isActive ? 'bg-accent-soft text-accent-strong' : 'text-ink hover:bg-sunken'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon name={item.icon} filled={isActive && item.icon === 'bookmark'} />
                    {item.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <AccountBar className="mt-auto px-1" />
    </aside>
  )
}
