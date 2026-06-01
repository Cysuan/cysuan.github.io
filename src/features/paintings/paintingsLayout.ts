/**
 * Per-card grid layout presets for the 12-column paintings gallery.
 * Frame colors are set per artwork in `paintingsData.ts` (`frameColor`).
 */

/** Grid column span on a 12-column track (1–12). */
export type PaintingGridSpan = 4 | 5 | 7 | 8

/** Thumbnail aspect ratio; use `auto` to follow the image’s natural proportions. */
export type PaintingAspectRatio =
  | '4/5'
  | '16/9'
  | '3/2'
  | '2/3'
  | '3/4'
  | '4/3'
  | '1/1'
  | 'auto'

/**
 * Layout-only fields (grid span, stagger). Colors are not defined here.
 */
export interface PaintingLayoutPreset {
  gridSpan: PaintingGridSpan
  /** Stagger offset in rem; negative values pull a card upward. */
  marginTopRem?: number
}

/**
 * Default grid rhythm (7 slots); indexes wrap when there are more works than presets.
 */
export const PAINTING_LAYOUT_PRESETS: readonly PaintingLayoutPreset[] = [
  { gridSpan: 5 },
  { gridSpan: 7, marginTopRem: 4 },
  { gridSpan: 4 },
  { gridSpan: 4, marginTopRem: -3 },
  { gridSpan: 4, marginTopRem: 2 },
  { gridSpan: 8 },
  { gridSpan: 4, marginTopRem: 6 },
] as const

/** Default frame hex colors cycled when `frameColor` is omitted on an entry. */
export const PAINTING_DEFAULT_FRAME_COLORS: readonly string[] = [
  '#c8dd9b',
  '#f5dac9',
  '#d6e3f0',
  '#f1cdc7',
  '#ffffff',
  '#c8dd9b',
  '#f5dac9',
] as const
