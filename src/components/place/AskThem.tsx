export function AskThem({ questions }: { questions: string[] }) {
  if (questions.length === 0) return null
  return (
    <section aria-labelledby="ask-them" className="rounded-2xl border border-line bg-raised p-5">
      <h2
        id="ask-them"
        className="font-sans text-xs font-semibold tracking-widest text-secondary uppercase"
      >
        Ask them this
      </h2>
      <p className="mt-1 text-sm text-muted">Conversation starters for the owner or staff.</p>
      <ol className="mt-4 space-y-4">
        {questions.map((question, index) => (
          <li key={question} className="flex gap-3">
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary-soft font-sans text-sm font-bold text-secondary"
            >
              {index + 1}
            </span>
            <span className="text-[0.9375rem] leading-relaxed">{question}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
