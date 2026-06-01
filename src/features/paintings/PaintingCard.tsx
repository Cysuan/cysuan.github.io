import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { PaintingArtwork } from './paintingsData'
import { pickLocalized } from './paintingsLabels'

export type PaintingCardProps = {
  artwork: PaintingArtwork
  onOpen: (artwork: PaintingArtwork) => void
}

/**
 * Single framed artwork tile in the paintings grid.
 */
export function PaintingCard({ artwork, onOpen }: PaintingCardProps) {
  const { i18n } = useTranslation()
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(artwork.imageSrc) && !imageFailed

  const cardStyle = {
    gridColumn: `span ${artwork.gridSpan}`,
    backgroundColor: artwork.frameColor,
    ...(artwork.frameBorder
      ? { border: '1px solid rgba(26, 25, 22, 0.1)' }
      : {}),
    ...(artwork.marginTopRem !== undefined
      ? { marginTop: `${artwork.marginTopRem}rem` }
      : {}),
  } as const

  const imgStyle =
    artwork.aspectRatio === 'auto'
      ? undefined
      : ({ aspectRatio: artwork.aspectRatio } as const)

  return (
    <article
      role="listitem"
      className="paintings-card"
      style={cardStyle}
    >
      <button
        type="button"
        className="paintings-card-hit"
        onClick={() => onOpen(artwork)}
        aria-label={artwork.title}
      >
        <div className="paintings-card-img-wrap">
          {showImage ? (
            <img
              src={artwork.imageSrc}
              alt={artwork.imageAlt}
              className="paintings-card-img"
              style={imgStyle}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div
              className="paintings-card-placeholder"
              style={imgStyle}
              aria-hidden
            />
          )}
        </div>

        <div className="paintings-card-meta">
          <h2
            className={`paintings-card-title serif${artwork.titleItalic ? ' italic' : ''}`}
          >
            {artwork.title}
          </h2>
          {artwork.tags.length > 0 ? (
            <div className="paintings-card-tags">
              {artwork.tags.map((tag) => (
                <span
                  key={`${tag.zh}-${tag.en}`}
                  className="paintings-card-tag"
                >
                  {pickLocalized(tag, i18n.language)}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <span className="paintings-card-icon" aria-hidden>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </span>
      </button>
    </article>
  )
}
