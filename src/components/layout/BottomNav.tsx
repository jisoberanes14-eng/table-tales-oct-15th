import { NavLink } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { navItems } from './navItems'

/** Mobile tab bar. Hidden from md up, where SideNav takes over. */
export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-raised pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="mx-auto flex max-w-lg">
        {navItems.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex min-h-16 flex-col items-center justify-center gap-1 px-2 font-sans text-xs font-semibold ${
                  isActive ? 'text-accent-strong' : 'text-muted hover:text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-8 w-14 items-center justify-center rounded-full ${
                      isActive ? 'bg-accent-soft' : ''
                    }`}
                  >
                    <Icon name={item.icon} filled={isActive && item.icon === 'bookmark'} />
                  </span>
                  {item.label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
