import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { SideNav } from './SideNav'

/**
 * Page chrome: skip link, side nav (md+), bottom tabs (mobile), and the routed <main>.
 * On each route change we scroll to top and move focus to <main> so keyboard and
 * screen-reader users start at the top of the new page.
 */
export function AppShell() {
  const { pathname } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    window.scrollTo({ top: 0 })
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-ink px-4 py-2 font-sans text-sm font-semibold text-surface focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SideNav />
      <main id="main" tabIndex={-1} className="min-h-dvh md:pl-60">
        <div className="mx-auto w-full max-w-5xl px-4 pt-6 pb-28 sm:px-6 md:pt-10 md:pb-16 lg:px-10">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </>
  )
}
