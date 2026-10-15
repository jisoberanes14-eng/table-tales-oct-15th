import type { Source, SourceKind } from '@/types'

const KIND_LABELS: Record<SourceKind, string> = {
  'owner-interview': 'Owner interview',
  'oral-history': 'Oral history',
  archive: 'Archive',
  book: 'Book',
  article: 'Article',
}

export function SourceList({ sources }: { sources: Source[] }) {
  if (sources.length === 0) return null
  return (
    <section aria-labelledby="story-sources" className="mt-10 border-t border-line pt-6">
      <h2
        id="story-sources"
        className="font-sans text-xs font-semibold tracking-widest text-muted uppercase"
      >
        Sources
      </h2>
      <ul className="mt-3 space-y-3">
        {sources.map((source) => (
          <li key={source.label} className="text-[0.9375rem] leading-snug">
            <span className="font-semibold">{source.label}</span>
            <span className="ml-2 font-sans text-xs font-semibold text-muted">
              {KIND_LABELS[source.kind]}
            </span>
            {source.note && <p className="mt-0.5 text-muted">{source.note}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}
