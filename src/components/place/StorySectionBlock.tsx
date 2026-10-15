import type { StorySection } from '@/types'

export function StorySectionBlock({ section }: { section: StorySection }) {
  return (
    <section aria-labelledby={`story-${section.kind}`} className="mt-10 first:mt-0">
      <h2
        id={`story-${section.kind}`}
        className="mb-3 flex items-center gap-3 text-2xl font-semibold"
      >
        <span aria-hidden="true" className="h-px w-6 bg-accent" />
        {section.title}
      </h2>
      <div className="space-y-4 text-[1.0625rem] leading-[1.7] md:max-w-[65ch]">
        {section.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}
