import { useEffect, useRef, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import type { PaintingArtwork } from './paintingsData'
import { pickLocalized } from './paintingsLabels'

export type PaintingsLightboxProps = {
  artwork: PaintingArtwork | null
  onClose: () => void
}

/**
 * Full-screen painting detail dialog (native `<dialog>` + backdrop click).
 */
export function PaintingsLightbox({ artwork, onClose }: PaintingsLightboxProps) {
  const { t, i18n } = useTranslation()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const lang = i18n.language

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (artwork) {
      if (!dialog.open) dialog.showModal()
    } else if (dialog.open) {
      dialog.close()
    }
  }, [artwork])

  useEffect(() => {
    if (!artwork) return undefined

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [artwork, onClose])

  const handleDialogClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="paintings-lightbox"
      onClose={onClose}
      onClick={handleDialogClick}
      aria-labelledby="paintings-lightbox-title"
    >
      {artwork ? (
        <div className="paintings-lightbox-content">
          <button
            type="button"
            className="paintings-lightbox-close"
            onClick={onClose}
            aria-label={t('paintings.modal.close')}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="paintings-lightbox-img-wrap">
            <img
              src={artwork.imageSrc}
              alt={artwork.imageAlt}
              className="paintings-lightbox-img"
            />
          </div>

          <div className="paintings-lightbox-details">
            <h2
              id="paintings-lightbox-title"
              className={`paintings-lightbox-title serif${artwork.titleItalic ? ' italic' : ''}`}
            >
              {artwork.title}
            </h2>

            <ul className="paintings-lightbox-info">
              <li className="paintings-lightbox-info-row">
                <span className="paintings-lightbox-info-label">
                  {t('paintings.modal.medium')}
                </span>
                <span>{pickLocalized(artwork.medium, lang)}</span>
              </li>
              <li className="paintings-lightbox-info-row">
                <span className="paintings-lightbox-info-label">
                  {t('paintings.modal.dimensions')}
                </span>
                <span>{artwork.size}</span>
              </li>
              <li className="paintings-lightbox-info-row">
                <span className="paintings-lightbox-info-label">
                  {t('paintings.modal.year')}
                </span>
                <span>{artwork.year}</span>
              </li>
              <li className="paintings-lightbox-info-row">
                <span className="paintings-lightbox-info-label">
                  {t('paintings.modal.availability')}
                </span>
                <span>{pickLocalized(artwork.status, lang)}</span>
              </li>
            </ul>

            <svg
              className="paintings-lightbox-decor"
              viewBox="0 0 100 50"
              aria-hidden
            >
              <path d="M10,25 C30,0 70,50 90,25" />
              <circle cx="50" cy="25" r="4" fill="currentColor" stroke="none" />
              <circle cx="30" cy="25" r="2" fill="currentColor" stroke="none" />
              <circle cx="70" cy="25" r="2" fill="currentColor" stroke="none" />
            </svg>
          </div>
        </div>
      ) : null}
    </dialog>
  )
}
