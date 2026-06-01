import {
  PAINTING_DEFAULT_FRAME_COLORS,
  PAINTING_LAYOUT_PRESETS,
  type PaintingAspectRatio,
  type PaintingGridSpan,
} from './paintingsLayout'
import type { LocalizedLabel } from './paintingsLabels'

export type { PaintingAspectRatio, PaintingGridSpan, LocalizedLabel }

/** Bilingual tag shown under the title on each card. */
export type PaintingTag = LocalizedLabel

/**
 * One artwork in the portfolio grid and lightbox.
 * Edit `PAINTING_ENTRIES` to add works or change copy, layout, and frame color.
 */
export interface PaintingArtwork {
  id: string
  imageSrc: string
  imageAlt: string
  title: string
  titleItalic?: boolean
  /** Lightbox: medium (e.g. oil on canvas). */
  medium: LocalizedLabel
  /** Lightbox: dimensions. */
  size: string
  /** Lightbox: year or date. */
  year: string
  /** Lightbox: status (e.g. available, gifted). */
  status: LocalizedLabel
  tags: readonly PaintingTag[]
  /** Card frame background, e.g. `#c3d2c5`. */
  frameColor: string
  /** White / light frames: show a subtle border. */
  frameBorder?: boolean
  gridSpan: PaintingGridSpan
  aspectRatio: PaintingAspectRatio
  marginTopRem?: number
}

/**
 * Raw catalog row before `id` / `imageSrc` are resolved.
 * `file` is the filename under `public/paintings/` (e.g. `01.png`, `11.jpg`).
 */
export type PaintingEntryInput = {
  file: string
  title: string
  imageAlt: string
  aspectRatio: PaintingAspectRatio
  medium: LocalizedLabel
  size: string
  year: string
  status: LocalizedLabel
  tags: readonly PaintingTag[]
  /** Hex background behind the image; overrides layout default when set. */
  frameColor?: string
  frameBorder?: boolean
  titleItalic?: boolean
  gridSpan?: PaintingGridSpan
  marginTopRem?: number
}

const oilTag: PaintingTag = { zh: '油画', en: 'Oil' }
const brushTag: PaintingTag = { zh: '毛笔画', en: 'Brush painting' }

/**
 * Portfolio catalog — add rows here. Order = display order.
 */
export const PAINTING_ENTRIES: readonly PaintingEntryInput[] = [
  {
    file: '01.png',
    title: '徒步女士',
    imageAlt: '油画：徒步女士',
    aspectRatio: '4/5',
    medium: { zh: '油画', en: 'Oil' },
    size: '30 × 40 cm',
    year: '2022.9',
    status: { zh: '已送徒步女士', en: 'Gifted' },
    tags: [oilTag],
    frameColor: '#c3d2c5',
  },
  {
    file: '02.png',
    title: '日出',
    imageAlt: '油画：日出',
    aspectRatio: '16/9',
    medium: { zh: '油画', en: 'Oil' },
    size: '30 × 40 cm',
    year: '2025.10',
    status: { zh: '可送', en: ' Available' },
    tags: [oilTag],
    frameColor: '#d8dee2',
  },
  {
    file: '03.jpg',
    title: '三孃玩手机',
    imageAlt: '油画：三孃玩手机',
    aspectRatio: '4/5',
    medium: { zh: '油画', en: 'Oil' },
    size: '30 × 40 cm',
    year: '2025.6',
    status: { zh: '已送三孃', en: 'Gifted' },
    tags: [oilTag],
    frameColor: '#d1585e',
  },
  {
    file: '04.jpg',
    title: '小花',
    imageAlt: '油画：小花',
    aspectRatio: '1/1',
    medium: { zh: '油画', en: 'Oil' },
    size: '15 × 15 cm',
    year: '2023.6',
    status: { zh: '已送出', en: 'Gifted' },
    tags: [oilTag],
    frameColor: '#7fb9df',
  },
  {
    file: '05.jpg',
    title: '小火山',
    imageAlt: '油画：小火山',
    aspectRatio: '2/3',
    medium: { zh: '油画', en: 'Oil' },
    size: '15 × 20 cm',
    year: '2025.2',
    status: { zh: '自藏', en: 'In collection' },
    tags: [oilTag],
    frameColor: '#ffdec9',
  },
  {
    file: '06.png',
    title: '临摹梵高雷雨云下的麦田',
    imageAlt: '油画：乌云下的麦田',
    aspectRatio: '16/9',
    medium: { zh: '油画', en: 'Oil' },
    size: '30 × 40 cm',
    year: '2026.1',
    status: { zh: '自藏', en: 'In collection' },
    tags: [oilTag],
    frameColor: '#a3c94d',
  },
  {
    file: '07.jpg',
    title: '迷幻蘑菇',
    imageAlt: '油画：迷幻蘑菇',
    aspectRatio: '1/1',
    medium: { zh: '油画棒', en: 'Oil pastel' },
    size: '15 × 15 cm',
    year: '2026.2',
    status: { zh: '已送', en: 'Gifted' },
    tags: [oilTag],
    frameColor: '#cecfc9',
  },
  {
    file: '08.jpg',
    title: '嘟嘟唇',
    imageAlt: '油画：嘟嘟唇',
    aspectRatio: '4/5',
    medium: { zh: '油画', en: 'Oil' },
    size: '30 × 35 cm',
    year: '2025.2',
    status: { zh: '已送嘟嘟唇', en: 'Gifted' },
    tags: [oilTag],
    frameColor: '#c1a7a5',
  },
  {
    file: '09.jpg',
    title: '烤肠吹风',
    imageAlt: '油画：烤肠吹风',
    aspectRatio: '4/3',
    medium: { zh: '油画', en: 'Oil' },
    size: '30 × 40 cm',
    year: '2026.2',
    status: { zh: '自藏', en: 'In collection' },
    tags: [oilTag],
    frameColor: '#579194',
  },
  {
    file: '10.jpg',
    title: '春游',
    imageAlt: '油画：春游',
    aspectRatio: '3/4',
    medium: { zh: '油画', en: 'Oil' },
    size: '30 × 40 cm',
    year: '2022.9',
    status: { zh: '已送出', en: 'Gifted' },
    tags: [oilTag],
    frameColor: '#d4729d',
  },
  {
    file: '11.jpg',
    title: '春天',
    imageAlt: '油画：春天',
    aspectRatio: '4/5',
    medium: { zh: '油画', en: 'Oil' },
    size: '30 × 40 cm',
    year: '2022.9',
    status: { zh: '已送出', en: 'Gifted' },
    tags: [oilTag],
    frameColor: '#518dbb',
  },
  {
    file: '12.jpg',
    title: '吹风',
    imageAlt: '油画：吹风',
    aspectRatio: '3/4',
    medium: { zh: '油画', en: 'Oil' },
    size: '30 × 40 cm',
    year: '2022.8',
    status: { zh: '自藏', en: 'In collection' },
    tags: [oilTag],
    frameColor: '#d7eaf4',
  },
  {
    file: '13.jpg',
    title: '女子肖像',
    imageAlt: '油画：女子肖像',
    aspectRatio: '4/3',
    medium: { zh: '油画', en: 'Oil' },
    size: '30 × 40 cm',
    year: '2022.10',
    status: { zh: '自藏', en: 'In collection' },
    tags: [oilTag],
    frameColor: '#c9ebe7',
  },
  {
    file: '14.jpg',
    title: '腾飞的二舅',
    imageAlt: '油画：腾飞的二舅',
    aspectRatio: '4/5',
    medium: { zh: '油画', en: 'Oil' },
    size: '30 × 40 cm',
    year: '2023.5',
    status: { zh: '已送二舅', en: 'Gifted' },
    tags: [oilTag],
    frameColor: '#ffdec9',
  },
  {
    file: '15.jpg',
    title: '黑豆',
    imageAlt: '油画：黑豆',
    aspectRatio: '1/1',
    medium: { zh: '油画', en: 'Oil' },
    size: '15 × 15 cm',
    year: '2024.2',
    status: { zh: '已送黑豆之家', en: 'Gifted' },
    tags: [oilTag],
    frameColor: '#ffcb61',
  },
  {
    file: '16.jpg',
    title: '拥抱',
    imageAlt: '油画：拥抱',
    aspectRatio: '4/3',
    medium: { zh: '油画', en: 'Oil' },
    size: '30 × 40 cm',
    year: '2022.8',
    status: { zh: '已送', en: 'Gifted' },
    tags: [oilTag],
    frameColor: '#45809b',
  },
  {
    file: '17.jpg',
    title: '小狗石榴',
    imageAlt: '油画：小狗石榴',
    aspectRatio: '1/1',
    medium: { zh: '油画', en: 'Oil' },
    size: '15 × 15 cm',
    year: '2026.2',
    status: { zh: '已送石榴家', en: 'Gifted' },
    tags: [oilTag],
    frameColor: '#c6a69b',
  },
  {
    file: '18.jpg',
    title: '瞪你',
    imageAlt: '毛笔画：瞪你',
    aspectRatio: '4/5',
    medium: { zh: '毛笔画', en: 'Brush painting' },
    size: '—',
    year: '2025.6',
    status: { zh: '准备送瞪眼女士', en: 'Gifted' },
    tags: [brushTag],
    frameColor: '#b0afab',
  },
  {
    file: '19.jpg',
    title: '滑雪手办',
    imageAlt: '油画：滑雪手办',
    aspectRatio: '1/1',
    medium: { zh: '油画', en: 'Oil' },
    size: '15 × 15 cm',
    year: '2025.6',
    status: { zh: '已送出', en: 'Gifted' },
    tags: [oilTag],
    frameColor: '#d3e3e6',
  },
  {
    file: '20.jpg',
    title: '徒步女士2',
    imageAlt: '油画：徒步女2',
    aspectRatio: '16/9',
    medium: { zh: '油画', en: 'Oil' },
    size: '30 × 40 cm',
    year: '2022.9',
    status: { zh: '已送徒步女士', en: 'Gifted' },
    tags: [oilTag],
    frameColor: '#b4d9d3',
  },
  {
    file: '21.jpg',
    title: '抓拍',
    imageAlt: '油画：抓拍',
    aspectRatio: '4/5',
    medium: { zh: '油画', en: 'Oil' },
    size: '30 × 40 cm',
    year: '2025.6',
    status: { zh: '已送抓拍对象', en: 'Gifted' },
    tags: [oilTag],
    frameColor: '#aa8b83',
  },
] as const

/**
 * @param entries - catalog rows
 */
function buildArtworks(entries: readonly PaintingEntryInput[]): PaintingArtwork[] {
  return entries.map((entry, index) => {
    const preset = PAINTING_LAYOUT_PRESETS[index % PAINTING_LAYOUT_PRESETS.length]
    const defaultColor =
      PAINTING_DEFAULT_FRAME_COLORS[
        index % PAINTING_DEFAULT_FRAME_COLORS.length
      ]
    const frameColor = entry.frameColor ?? defaultColor
    const fileStem = entry.file.replace(/\.[^.]+$/, '')

    return {
      id: `painting-${fileStem}`,
      imageSrc: `/paintings/${entry.file}`,
      imageAlt: entry.imageAlt,
      title: entry.title,
      titleItalic: entry.titleItalic,
      medium: entry.medium,
      size: entry.size,
      year: entry.year,
      status: entry.status,
      tags: entry.tags,
      frameColor,
      frameBorder: entry.frameBorder ?? frameColor.toLowerCase() === '#ffffff',
      gridSpan: entry.gridSpan ?? preset.gridSpan,
      aspectRatio: entry.aspectRatio,
      marginTopRem: entry.marginTopRem ?? preset.marginTopRem,
    }
  })
}

/** Portfolio shown on `/paintings`. */
export const PAINTING_ARTWORKS: readonly PaintingArtwork[] =
  buildArtworks(PAINTING_ENTRIES)
