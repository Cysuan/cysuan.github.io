/**
 * Fixed layout for Life Mapping SVG nodes (% of viewport box) plus directed edges — matches reference design topology.
 */

export type LifeMappingNodeKind = 'life' | 'learn' | 'work'

export type LifeMappingLabelPlacement = 'rightDown' | 'leftDown' | 'up'

export interface LifeMappingTopoNode {
  id: string
  /** 0–100 horizontal position inside the drawable box */
  x: number
  /** 0–100 vertical position */
  y: number
  /** Base circle radius */
  r: number
  type: LifeMappingNodeKind
  /**
   * Placement hint for the node label to reduce overlap with lines.
   * When omitted, defaults to `rightDown`.
   */
  labelPlacement?: LifeMappingLabelPlacement
}

export const LIFE_MAPPING_TOPOLOGY: readonly LifeMappingTopoNode[] = [
  { id: 'n1', x: 15, y: 85, r: 4, type: 'life', labelPlacement: 'rightDown' },
  { id: 'n2', x: 25, y: 75, r: 6, type: 'life', labelPlacement: 'rightDown' },
  { id: 'n3', x: 32, y: 65, r: 5, type: 'learn', labelPlacement: 'rightDown' },
  { id: 'n4', x: 20, y: 55, r: 7, type: 'learn', labelPlacement: 'leftDown' },
  { id: 'n5', x: 30, y: 45, r: 8, type: 'learn', labelPlacement: 'up' },
  { id: 'n6', x: 12, y: 40, r: 6, type: 'life' },
  { id: 'n7', x: 45, y: 55, r: 6, type: 'work', labelPlacement: 'rightDown' },
  { id: 'n8', x: 55, y: 48, r: 9, type: 'work', labelPlacement: 'rightDown' },
  { id: 'n9', x: 65, y: 35, r: 12, type: 'work', labelPlacement: 'rightDown' },
  { id: 'n10', x: 50, y: 25, r: 7, type: 'life', labelPlacement: 'leftDown' },
  { id: 'n11', x: 60, y: 15, r: 6, type: 'work' },
  { id: 'n12', x: 75, y: 20, r: 8, type: 'work' },
  { id: 'n13', x: 80, y: 35, r: 9, type: 'work' },
  { id: 'n14', x: 85, y: 50, r: 10, type: 'work' },
  { id: 'n15', x: 88, y: 65, r: 12, type: 'work' },
] as const

export const LIFE_MAPPING_EDGES: readonly { readonly source: string; readonly target: string }[] = [
  { source: 'n1', target: 'n2' },
  { source: 'n2', target: 'n3' },
  { source: 'n3', target: 'n7' },
  { source: 'n2', target: 'n4' },
  { source: 'n4', target: 'n5' },
  { source: 'n4', target: 'n6' },
  { source: 'n6', target: 'n7' },
  { source: 'n7', target: 'n8' },
  { source: 'n8', target: 'n9' },
  { source: 'n5', target: 'n9' },
  { source: 'n9', target: 'n10' },
  { source: 'n10', target: 'n11' },
  { source: 'n10', target: 'n12' },
  { source: 'n11', target: 'n13' },
  { source: 'n12', target: 'n13' },
  { source: 'n13', target: 'n14' },
  { source: 'n14', target: 'n15' },
  { source: 'n11', target: 'n15' },
] as const
