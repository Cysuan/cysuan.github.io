import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PaintingCard } from './PaintingCard'
import { PaintingsLightbox } from './PaintingsLightbox'
import { PAINTING_ARTWORKS } from './paintingsData'
import type { PaintingArtwork } from './paintingsData'
import './paintingsGallery.css'

/**
 * Paintings portfolio: staggered 12-column grid, ~30 configurable works, modal lightbox.
 */
export function PaintingsGallery() {
  const { t } = useTranslation()
  const [activeArtwork, setActiveArtwork] = useState<PaintingArtwork | null>(null)
  const heroLead = t('paintings.heroLead', { defaultValue: '' }).trim()

  const openArtwork = useCallback((artwork: PaintingArtwork) => {
    setActiveArtwork(artwork)
  }, [])

  const closeLightbox = useCallback(() => {
    setActiveArtwork(null)
  }, [])

  return (
    <section
      id="paintings"
      className="paintings-gallery"
      aria-label={t('paintings.sectionAria')}
    >
      <header className="paintings-gallery-hero">
        <svg
          className="paintings-decor paintings-decor-eye"
          viewBox="0 0 100 50"
          aria-hidden
        >
          <path d="M5,25 Q50,-10 95,25 Q50,60 5,25" />
          <circle cx="50" cy="25" r="12" />
          <circle cx="50" cy="25" r="4" fill="currentColor" />
          <path
            d="M40,5 Q45,15 50,5 M60,5 Q55,15 50,5"
            strokeWidth="1"
          />
        </svg>

        <svg
          className="paintings-decor paintings-decor-squiggle"
          viewBox="0 0 150 40"
          aria-hidden
        >
          <path d="M5,20 C20,-10 40,50 60,20 C80,-10 100,50 120,20 C135,5 145,30 145,30" />
        </svg>

        <svg
          className="paintings-decor paintings-decor-face"
          viewBox="0 0 60 80"
          aria-hidden
        >
          <path d="M10,30 C10,10 50,10 50,30 C50,60 30,75 30,75 C30,75 10,60 10,30 Z" />
          <circle cx="22" cy="35" r="2" fill="currentColor" stroke="none" />
          <circle cx="38" cy="35" r="2" fill="currentColor" stroke="none" />
          <path d="M25,50 Q30,55 35,50" />
          <path d="M5,20 L15,25 M55,20 L45,25" />
        </svg>

        {heroLead ? <p className="paintings-gallery-lead">{heroLead}</p> : null}
      </header>

      <div className="paintings-gallery-grid" role="list">
        {PAINTING_ARTWORKS.map((artwork) => (
          <PaintingCard
            key={artwork.id}
            artwork={artwork}
            onOpen={openArtwork}
          />
        ))}
      </div>

      <PaintingsLightbox artwork={activeArtwork} onClose={closeLightbox} />
    </section>
  )
}
