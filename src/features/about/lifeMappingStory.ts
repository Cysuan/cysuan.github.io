import type { LifeMappingNodeKind } from './lifeMappingGraph'

export interface LifeMappingStory {
  id: string
  date: string
  tag: string
  label: string
  desc: string
  type: LifeMappingNodeKind
  ledTo: { id: string; label: string }[]
}
