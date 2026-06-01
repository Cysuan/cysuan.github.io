import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { createPortal } from 'react-dom'
import type { BehindGalleryImage } from './resumeRich'
import './behindStoryGallery.css'

export type { BehindGalleryImage }

export type BehindStoryGalleryLabels = {
  stripAria: string
  lightboxAria: string
  prev: string
  next: string
  close: string
}

export type BehindStoryGalleryProps = {
  images: readonly BehindGalleryImage[]
  labels: BehindStoryGalleryLabels
}

const CARD_ROTATIONS = [-2.5, 1.8, -1.2, 2.4, -2, 1.5, -1.8] as const
const CARD_OFFSETS = [8, 4, 10, 2, 12, 6, 9] as const
const DRAG_CLICK_THRESHOLD_PX = 6

/**
 * B 层叙事横向图片画廊：拖拽滚动、hover 微动效、固定层灯箱（不触发页面 reflow）。
 */
export function BehindStoryGallery({ images, labels }: BehindStoryGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false })
  const [dragging, setDragging] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [lightboxNavTick, setLightboxNavTick] = useState(0)

  const openLightbox = useCallback((index: number) => {
    setLightboxNavTick(0)
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const bumpLightboxNav = useCallback(() => {
    setLightboxNavTick((n) => n + 1)
  }, [])

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || images.length === 0) return i
      return (i - 1 + images.length) % images.length
    })
    bumpLightboxNav()
  }, [images.length, bumpLightboxNav])

  const goNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || images.length === 0) return i
      return (i + 1) % images.length
    })
    bumpLightboxNav()
  }, [images.length, bumpLightboxNav])

  useEffect(() => {
    if (lightboxIndex === null) return undefined

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeLightbox()
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxIndex, closeLightbox, goPrev, goNext])

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current
    if (!el || e.button !== 0) return
    if ((e.target as HTMLElement).closest('.behind-gallery-card')) return
    dragRef.current = { active: true, startX: e.clientX, scrollLeft: el.scrollLeft, moved: false }
    setDragging(true)
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || !scrollRef.current) return
    const dx = e.clientX - dragRef.current.startX
    if (Math.abs(dx) > DRAG_CLICK_THRESHOLD_PX) {
      dragRef.current.moved = true
    }
    scrollRef.current.scrollLeft = dragRef.current.scrollLeft - dx
  }

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return
    dragRef.current.active = false
    setDragging(false)
    scrollRef.current?.releasePointerCapture(e.pointerId)
  }

  const onCardClick = (index: number) => {
    if (dragRef.current.moved) {
      dragRef.current.moved = false
      return
    }
    openLightbox(index)
  }

  if (images.length === 0) return null

  const active = lightboxIndex !== null ? images[lightboxIndex] : null
  const activeRot = lightboxIndex !== null ? CARD_ROTATIONS[lightboxIndex % CARD_ROTATIONS.length] : 0

  return (
    <div className="behind-gallery" aria-label={labels.stripAria}>
      <div
        ref={scrollRef}
        className={['behind-gallery-scroll', dragging ? 'is-dragging' : ''].filter(Boolean).join(' ')}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="behind-gallery-track">
          {images.map((img, i) => (
            <button
              key={`behind-gallery-card-${i}`}
              type="button"
              className="behind-gallery-card"
              style={
                {
                  '--init-rot': `${CARD_ROTATIONS[i % CARD_ROTATIONS.length]}deg`,
                  '--init-y': `${CARD_OFFSETS[i % CARD_OFFSETS.length]}px`,
                } as CSSProperties
              }
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation()
                onCardClick(i)
              }}
              aria-label={img.alt}
            >
              <span
                className="behind-gallery-photo"
                style={img.aspectRatio ? { aspectRatio: String(img.aspectRatio) } : undefined}
              >
                <img src={img.src} alt={img.alt} loading="lazy" draggable={false} />
              </span>
              <span className="behind-gallery-card-caption">{img.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {active &&
        lightboxIndex !== null &&
        createPortal(
          <div
            className="behind-gallery-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={labels.lightboxAria}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox()
            }}
          >
            <button
              type="button"
              className="behind-gallery-lightbox-close"
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
            >
              {labels.close}
            </button>
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  className="behind-gallery-nav behind-gallery-nav--prev"
                  onClick={(e) => {
                    e.stopPropagation()
                    goPrev()
                  }}
                >
                  {labels.prev}
                </button>
                <button
                  type="button"
                  className="behind-gallery-nav behind-gallery-nav--next"
                  onClick={(e) => {
                    e.stopPropagation()
                    goNext()
                  }}
                >
                  {labels.next}
                </button>
              </>
            ) : null}
            <div className="behind-gallery-lightbox-panel" onClick={(e) => e.stopPropagation()}>
              <article
                key={`lb-${lightboxIndex}-${lightboxNavTick}`}
                className={[
                  'behind-gallery-lightbox-card',
                  lightboxNavTick > 0 ? 'is-navigating' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ '--from-rot': `${activeRot}deg` } as CSSProperties}
              >
                <div className="behind-gallery-lightbox-inner">
                  <div className="behind-gallery-lightbox-visual">
                    <img src={active.src} alt={active.alt} />
                  </div>
                  <p className="behind-gallery-lightbox-caption" aria-live="polite">
                    {active.caption}
                  </p>
                </div>
              </article>
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
