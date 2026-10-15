import { useQueryClient } from '@tanstack/react-query'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { authRepo } from '@/data'
import type { AuthUser } from '@/types'

interface AuthContextValue {
  /** The signed-in person, or null when signed out. */
  user: AuthUser | null
  /** True until the stored session has been checked on first load. */
  isLoading: boolean
  /** Emails a one-time sign-in link that brings the person back to the page they are on. */
  signIn: (email: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthState {
  user: AuthUser | null
  isLoading: boolean
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const [state, setState] = useState<AuthState>({ user: null, isLoading: true })
  // undefined = not seen yet; used to tell "first load" apart from "the user changed".
  const lastUserId = useRef<string | null | undefined>(undefined)

  useEffect(() => {
    return authRepo.subscribe((next) => {
      // Token refreshes re-emit the same person; don't re-render the whole app for that.
      setState((previous) =>
        !previous.isLoading &&
        previous.user?.id === next?.id &&
        previous.user?.email === next?.email
          ? previous
          : { user: next, isLoading: false },
      )

      // Signing in or out must never leave the previous person's data in memory.
      const nextId = next?.id ?? null
      if (lastUserId.current !== undefined && lastUserId.current !== nextId) {
        queryClient.clear()
      }
      lastUserId.current = nextId
    })
  }, [queryClient])

  const signIn = useCallback((email: string) => {
    // Come back to exactly the page they were on, without any old sign-in tokens in the URL.
    const returnTo = `${window.location.origin}${window.location.pathname}${window.location.search}`
    return authRepo.sendMagicLink(email, returnTo)
  }, [])

  const signOut = useCallback(() => authRepo.signOut(), [])

  const value = useMemo<AuthContextValue>(
    () => ({ user: state.user, isLoading: state.isLoading, signIn, signOut }),
    [state, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside <AuthProvider>')
  return value
}
