import { TAG_LABELS } from '@/lib/constants'
import type { StoryTagId } from '@/types'

export function StoryTag({ tag }: { tag: StoryTagId }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-sunken px-3 py-1 font-sans text-xs font-semibold text-ink">
      {TAG_LABELS[tag]}
    </span>
  )
}

export function StoryTagList({ tags, limit }: { tags: StoryTagId[]; limit?: number }) {
  const visible = limit === undefined ? tags : tags.slice(0, limit)
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Story tags">
      {visible.map((tag) => (
        <li key={tag}>
          <StoryTag tag={tag} />
        </li>
      ))}
    </ul>
  )
}
