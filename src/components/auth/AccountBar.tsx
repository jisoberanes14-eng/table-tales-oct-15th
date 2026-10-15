import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

/** Shows who is signed in, with a Sign out button. Renders nothing when signed out. */
export function AccountBar({ className = '' }: { className?: string }) {
  const { user, signOut } = useAuth()
  const [failed, setFailed] = useState(false)

  if (!user) return null

  async function handleSignOut() {
    setFailed(false)
    try {
      await signOut()
    } catch {
      setFailed(true)
    }
  }

  return (
    <div className={`font-sans ${className}`}>
      <p className="text-xs text-muted">Signed in as</p>
      <p className="truncate text-sm font-semibold" title={user.email}>
        {user.email}
      </p>
      <Button
        variant="secondary"
        className="mt-2 min-h-11 w-full"
        onClick={() => void handleSignOut()}
      >
        Sign out
      </Button>
      {failed && (
        <p role="alert" className="mt-2 text-xs text-accent-strong">
          Could not sign out. Please try again.
        </p>
      )}
    </div>
  )
}
