import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { isMockBackend } from '@/data'
import { useAuth } from '@/hooks/useAuth'

interface SignInPanelProps {
  title: string
  description: string
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Passwordless sign-in: type your email, get a one-time link. No password anywhere. */
export function SignInPanel({ title, description }: SignInPanelProps) {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!email.trim()) return
    setStatus('sending')
    setErrorMessage('')
    try {
      await signIn(email)
      setStatus('sent')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  return (
    <section
      aria-labelledby="signin-heading"
      className="rounded-2xl border border-line bg-raised p-6 md:p-8"
    >
      <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
        <Icon name="bookmark" className="size-6" />
      </span>
      <h2 id="signin-heading" className="text-2xl font-semibold">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-muted">{description}</p>

      {status === 'sent' ? (
        <div role="status" className="mt-6 rounded-xl bg-secondary-soft p-4 text-secondary">
          <p className="flex items-center gap-2 font-sans font-semibold">
            <Icon name="check" className="size-5" />
            Check your email
          </p>
          <p className="mt-1 text-[0.9375rem] text-ink">
            We sent a sign-in link to <strong>{email.trim()}</strong>. Open it on this device and
            you will be brought right back here. It may take a minute, and it can land in spam.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-3 inline-flex min-h-11 items-center font-sans text-sm font-semibold text-accent-strong underline underline-offset-4"
          >
            Use a different email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 max-w-md">
          <label htmlFor="signin-email" className="block font-sans text-sm font-semibold">
            Email address
          </label>
          <input
            id="signin-email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            aria-describedby={status === 'error' ? 'signin-error' : undefined}
            className="mt-2 min-h-12 w-full rounded-xl border border-line bg-surface px-4 font-sans text-base placeholder:text-muted"
          />
          <Button
            type="submit"
            variant="primary"
            className="mt-4 w-full sm:w-auto"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Email me a sign-in link'}
          </Button>
          {status === 'error' && (
            <p id="signin-error" role="alert" className="mt-3 font-sans text-sm text-accent-strong">
              {errorMessage}
            </p>
          )}
          <p className="mt-3 font-sans text-xs text-muted">
            No password needed. New here? The same link creates your account.
          </p>
          {isMockBackend && (
            <p className="mt-2 font-sans text-xs text-muted">
              Development mode (no Supabase): no email is sent; you are signed in instantly.
            </p>
          )}
        </form>
      )}
    </section>
  )
}
