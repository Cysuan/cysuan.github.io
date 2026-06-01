import { useTranslation } from 'react-i18next'
import { ConnectingDotsHover } from './ConnectingDotsHover'

const CONNECTING_DOTS_MARKER = '{{connectingDots}}'

/**
 * 段落内 `{{connectingDots}}` 占位符替换为可交互短语。
 */
function renderParagraphContent(
  text: string,
  phrase: string,
  hoverSegments: string[],
  attribution: string,
) {
  if (!text.includes(CONNECTING_DOTS_MARKER)) {
    return text
  }

  const [before, after] = text.split(CONNECTING_DOTS_MARKER)

  return (
    <>
      {before}
      <ConnectingDotsHover
        phrase={phrase}
        segments={hoverSegments}
        attribution={attribution}
      />
      {after}
    </>
  )
}

/**
 * Long-form note below the Life Mapping block: “connecting the dots” ethos (i18n paragraphs).
 */
export function AboutDotsPhilosophy() {
  const { t } = useTranslation()
  const raw = t('about.dotsPhilosophy.paragraphs', { returnObjects: true })
  const paragraphs = Array.isArray(raw) ? (raw as string[]) : []
  const phrase = t('about.dotsPhilosophy.connectingDotsPhrase')
  const hoverRaw = t('about.dotsPhilosophy.connectingDotsHoverSegments', {
    returnObjects: true,
  })
  const hoverSegments = Array.isArray(hoverRaw) ? (hoverRaw as string[]) : []
  const attribution = t('about.dotsPhilosophy.connectingDotsAttribution')

  return (
    <article className="about-dots-philosophy">
      <div className="about-dots-philosophy-body">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>
            {renderParagraphContent(paragraph, phrase, hoverSegments, attribution)}
          </p>
        ))}
      </div>
    </article>
  )
}
