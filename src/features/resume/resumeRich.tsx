import type { TFunction } from 'i18next'

/** 行内富文本片段：纯文字、斜体或外链 */
export type ResumeRichSegment =
  | { type: 'text'; text: string }
  | { type: 'em'; text: string }
  | { type: 'link'; text: string; href: string; em?: boolean }

function isResumeRichSegment(s: unknown): s is ResumeRichSegment {
  if (!s || typeof s !== 'object' || typeof (s as { text?: string }).text !== 'string') {
    return false
  }
  const type = (s as { type?: string }).type
  if (type === 'text' || type === 'em') return true
  if (type === 'link') return typeof (s as { href?: string }).href === 'string'
  return false
}

/**
 * 从翻译 JSON 读取富文本段落（每段为片段数组）。
 *
 * @param t - i18n 函数
 * @param key - 完整 key，如 `resume.entries.education.edu-02.bodyParagraphs`
 */
export function getRichParagraphs(t: TFunction, key: string): readonly (readonly ResumeRichSegment[])[] {
  const raw = t(key, { returnObjects: true })
  if (!Array.isArray(raw)) return []
  return raw.filter((para): para is readonly ResumeRichSegment[] => {
    if (!Array.isArray(para)) return false
    return para.every(isResumeRichSegment)
  })
}

export type ResumeWorkBlock = {
  heading: string
  body?: string
  bodyParagraphs?: readonly (readonly ResumeRichSegment[])[]
}

function isRichSegmentArray(para: unknown): para is readonly ResumeRichSegment[] {
  if (!Array.isArray(para)) return false
  return para.every(isResumeRichSegment)
}

/**
 * 从翻译 JSON 读取工作经历「小标题 + 正文」块列表（支持纯文本或富文本段落）。
 *
 * @param t - i18n 函数
 * @param experienceId - 经历 id，如 `exp-04`
 */
export function getWorkBlocks(t: TFunction, experienceId: string): readonly ResumeWorkBlock[] {
  const raw = t(`resume.entries.experience.${experienceId}.workBlocks`, { returnObjects: true })
  if (!Array.isArray(raw)) return []
  return raw
    .filter((b): b is ResumeWorkBlock => {
      if (!b || typeof b !== 'object' || typeof (b as { heading?: string }).heading !== 'string') {
        return false
      }
      const body = (b as { body?: string }).body
      const paragraphs = (b as { bodyParagraphs?: unknown }).bodyParagraphs
      const hasBody = typeof body === 'string'
      const hasParagraphs =
        Array.isArray(paragraphs) && paragraphs.length > 0 && paragraphs.every(isRichSegmentArray)
      return hasBody || hasParagraphs
    })
    .map((b) => {
      const block = b as ResumeWorkBlock
      if (block.bodyParagraphs) {
        return { heading: block.heading, bodyParagraphs: block.bodyParagraphs }
      }
      return { heading: block.heading, body: block.body }
    })
}

type RichParagraphProps = {
  /** 段落内片段 */
  segments: readonly ResumeRichSegment[]
  /** React key 后缀 */
  paraKey: string
  /** 段落容器 class，默认教育正文行样式 */
  className?: string
}

/**
 * 单段富文本（支持换行 `\n` 与行内链接）。
 */
export function RichParagraph({ segments, paraKey, className = 'resume-entry-body-line' }: RichParagraphProps) {
  return (
    <p className={className}>
      {segments.map((s, i) => {
        if (s.type === 'link') {
          return (
            <a
              key={`${paraKey}-s-${i}`}
              href={s.href}
              className={s.em ? 'resume-inline-link resume-inline-link--em' : 'resume-inline-link'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.text}
            </a>
          )
        }
        if (s.type === 'em') {
          return (
            <em key={`${paraKey}-s-${i}`} className="resume-rich-em">
              {s.text}
            </em>
          )
        }
        return (
          <span key={`${paraKey}-s-${i}`} className="resume-rich-text">
            {s.text}
          </span>
        )
      })}
    </p>
  )
}

/** B 层叙事段落：纯文本或富文本片段数组 */
export type BehindStoryParagraph = string | readonly ResumeRichSegment[]

/** B 层叙事横向画廊单图 */
export type BehindGalleryImage = {
  src: string
  alt: string
  caption: string
  aspectRatio?: number
}

/**
 * 读取 B 层背后叙事段落（`resume.behindCv.stories.*.*.paragraphs`）。
 *
 * @param t - i18n 函数
 * @param kind - `education` | `experience`
 * @param id - 条目 id
 */
export function getBehindStoryParagraphs(
  t: TFunction,
  kind: 'education' | 'experience',
  id: string,
): readonly BehindStoryParagraph[] {
  const key = `resume.behindCv.stories.${kind}.${id}.paragraphs`
  const raw = t(key, { returnObjects: true })
  if (!Array.isArray(raw) || raw.length === 0) {
    const fallback = t('resume.behindCv.emptyPlaceholder', { defaultValue: '' })
    return fallback ? [fallback] : []
  }

  const parsed: BehindStoryParagraph[] = []
  for (const item of raw) {
    if (typeof item === 'string') {
      parsed.push(item)
      continue
    }
    if (Array.isArray(item) && item.every(isResumeRichSegment)) {
      parsed.push(item as readonly ResumeRichSegment[])
    }
  }

  if (parsed.length === 0) {
    const fallback = t('resume.behindCv.emptyPlaceholder', { defaultValue: '' })
    return fallback ? [fallback] : []
  }

  return parsed
}

/**
 * 读取 B 层背后叙事配图（`resume.behindCv.stories.*.*.gallery`）。
 *
 * @param t - i18n 函数
 * @param kind - `education` | `experience`
 * @param id - 条目 id
 */
export function getBehindStoryGallery(
  t: TFunction,
  kind: 'education' | 'experience',
  id: string,
): readonly BehindGalleryImage[] {
  const key = `resume.behindCv.stories.${kind}.${id}.gallery`
  const raw = t(key, { returnObjects: true })
  if (!Array.isArray(raw)) return []

  return raw
    .filter((item): item is BehindGalleryImage & { aspectRatio?: number } => {
      return (
        item &&
        typeof item === 'object' &&
        typeof (item as { src?: string }).src === 'string' &&
        typeof (item as { alt?: string }).alt === 'string' &&
        typeof (item as { caption?: string }).caption === 'string'
      )
    })
    .map((item) => ({
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      aspectRatio: typeof item.aspectRatio === 'number' ? item.aspectRatio : undefined,
    }))
}

/**
 * 工作经历主标题行（可含多个外链片段）。
 *
 * @param t - i18n 函数
 * @param experienceId - 经历 id
 */
export function getTitleSegments(t: TFunction, experienceId: string): readonly ResumeRichSegment[] | null {
  const raw = t(`resume.entries.experience.${experienceId}.titleSegments`, { returnObjects: true })
  if (!Array.isArray(raw) || raw.length === 0) return null
  const ok = raw.every(isResumeRichSegment)
  return ok ? (raw as ResumeRichSegment[]) : null
}
