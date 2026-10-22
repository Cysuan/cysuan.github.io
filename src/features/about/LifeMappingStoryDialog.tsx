import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { LIFE_MAPPING_TOPOLOGY } from './lifeMappingGraph'
import type { LifeMappingStory } from './lifeMappingStory'
import { TutoringBusinessCard } from './TutoringBusinessCard'

function StoryCopy({ text }: { text: string }) {
  return text.split(/\n{2,}/g).filter(Boolean).map((paragraph, index) => (
    <p key={index}>
      {paragraph.split(/(\*\*.+?\*\*)/g).map((part, partIndex) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={partIndex}>{part.slice(2, -2)}</strong>
          : part,
      )}
    </p>
  ))
}

type Props = {
  story: LifeMappingStory
  onClose: () => void
  onNavigate: (id: string) => void
}

/** A centered reading card on desktop, a swipe-dismissable sheet on mobile. */
export function LifeMappingStoryDialog({ story, onClose, onNavigate }: Props) {
  const { t } = useTranslation()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const backdropDownRef = useRef(false)
  const [closing, setClosing] = useState(false)

  const requestClose = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onClose()
    } else {
      setClosing(true)
    }
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const previousOverflow = document.documentElement.style.overflow
    dialog.showModal()
    document.documentElement.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.documentElement.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [story.id])

  // Pull down from the header or from content already scrolled to its top.
  // Native touchmove is non-passive so a sheet drag can take over from scrolling.
  useEffect(() => {
    const surface = surfaceRef.current
    const dialog = dialogRef.current
    if (!surface || !dialog) return
    let gesture: { x: number; y: number; started: number; distance: number; dragging: boolean } | null = null
    let suppressClick = false

    const begin = (x: number, y: number, target: EventTarget | null) => {
      gesture = null
      suppressClick = false
      if (!window.matchMedia('(max-width: 600px)').matches || !(target instanceof Element)) return
      if (target.closest('button, a, input, textarea, select, [role="button"]')) return
      if (scrollRef.current?.contains(target) && scrollRef.current.scrollTop > 1) return
      gesture = { x, y, started: performance.now(), distance: 0, dragging: false }
    }
    const move = (x: number, y: number) => {
      if (!gesture) return false
      const dx = Math.abs(x - gesture.x)
      const dy = y - gesture.y
      if (!gesture.dragging) {
        if (dy < -6 || (dx > 12 && dx > Math.abs(dy))) { gesture = null; return false }
        if (dy < 6 || dy < dx * 1.2) return false
        gesture.dragging = true
        dialog.classList.add('is-dragging')
      }
      gesture.distance = Math.max(0, dy)
      dialog.style.setProperty('--sheet-drag', `${gesture.distance * 0.9}px`)
      return true
    }
    const finish = (cancelled = false) => {
      const drag = gesture
      gesture = null
      if (!drag?.dragging) return
      suppressClick = true
      dialog.classList.remove('is-dragging')
      const dismiss = !cancelled && (drag.distance >= 44 || (drag.distance >= 24 && performance.now() - drag.started < 240))
      if (dismiss) requestClose()
      else dialog.style.removeProperty('--sheet-drag')
    }
    const touchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) { finish(true); return }
      begin(event.touches[0].clientX, event.touches[0].clientY, event.target)
    }
    const touchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) { finish(true); return }
      if (move(event.touches[0].clientX, event.touches[0].clientY) && event.cancelable) event.preventDefault()
    }
    const touchEnd = () => finish()
    const cancel = () => finish(true)
    // The same drag interaction also works with a mouse in a narrow preview.
    const pointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || event.button !== 0) return
      begin(event.clientX, event.clientY, event.target)
    }
    const pointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      if (move(event.clientX, event.clientY)) {
        surface.setPointerCapture(event.pointerId)
        event.preventDefault()
      }
    }
    const pointerUp = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') finish()
    }
    const pointerCancel = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') finish(true)
    }
    const click = (event: MouseEvent) => {
      if (!suppressClick) return
      suppressClick = false
      event.preventDefault()
      event.stopPropagation()
    }
    surface.addEventListener('touchstart', touchStart, { passive: true })
    surface.addEventListener('touchmove', touchMove, { passive: false })
    surface.addEventListener('touchend', touchEnd)
    surface.addEventListener('touchcancel', cancel)
    surface.addEventListener('pointerdown', pointerDown)
    surface.addEventListener('pointermove', pointerMove)
    surface.addEventListener('pointerup', pointerUp)
    surface.addEventListener('pointercancel', pointerCancel)
    surface.addEventListener('click', click, true)
    return () => {
      surface.removeEventListener('touchstart', touchStart)
      surface.removeEventListener('touchmove', touchMove)
      surface.removeEventListener('touchend', touchEnd)
      surface.removeEventListener('touchcancel', cancel)
      surface.removeEventListener('pointerdown', pointerDown)
      surface.removeEventListener('pointermove', pointerMove)
      surface.removeEventListener('pointerup', pointerUp)
      surface.removeEventListener('pointercancel', pointerCancel)
      surface.removeEventListener('click', click, true)
    }
  }, [requestClose])

  const index = LIFE_MAPPING_TOPOLOGY.findIndex((node) => node.id === story.id)
  const previous = LIFE_MAPPING_TOPOLOGY[index - 1]
  const next = LIFE_MAPPING_TOPOLOGY[index + 1]

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`life-mapping-detail-panel${closing ? ' is-closing' : ''}`}
      aria-labelledby="life-mapping-story-title"
      onAnimationEnd={(event) => {
        if (closing && event.target === event.currentTarget) onClose()
      }}
      onCancel={(event) => {
        event.preventDefault()
        requestClose()
      }}
      onPointerDown={(event) => {
        backdropDownRef.current = event.target === event.currentTarget
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && backdropDownRef.current) requestClose()
      }}
    >
      {story ? (
        <div className="life-mapping-story-surface" ref={surfaceRef}>
          <header className="life-mapping-story-header">
            <div
              className="life-mapping-sheet-grip"
              aria-hidden="true"
            ><span /></div>
            <button
              type="button"
              className="life-mapping-story-close"
              aria-label={t('about.lifeMapping.closePanel')}
              onClick={requestClose}
              autoFocus
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </header>

          <div className="life-mapping-story-scroll" ref={scrollRef}>
            <article className="life-mapping-story-content" key={story.id}>
              <div className="life-mapping-detail-meta">
                <span>{story.date}</span><span aria-hidden="true">·</span><span>{story.tag}</span>
              </div>
              <h2 id="life-mapping-story-title" className="life-mapping-detail-title">{story.label}</h2>
              <div className="life-mapping-detail-body"><StoryCopy text={story.desc} /></div>
              {story.id === 'n2' ? (
                <a
                  className="life-mapping-paintings-link"
                  href="https://www.xuanpaints.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('about.lifeMapping.paintingsLink')}
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17 17 7M7 7h10v10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
              ) : null}
              {story.id === 'n7' ? <TutoringBusinessCard key={story.id} /> : null}
              {story.ledTo.length > 0 ? (
                <nav className="life-mapping-detail-connections" aria-label={t('about.lifeMapping.ledTo')}>
                  <p className="life-mapping-detail-connections-title">{t('about.lifeMapping.ledTo')}</p>
                  <ul className="life-mapping-connection-list">
                    {story.ledTo.map((item) => (
                      <li key={item.id}>
                        <button type="button" className="life-mapping-connection-link" onClick={() => onNavigate(item.id)}>
                          <span>{item.label}</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}
            </article>
          </div>

          <footer className="life-mapping-story-footer">
            <button type="button" disabled={!previous} aria-label={t('about.lifeMapping.previousStory')} title={t('about.lifeMapping.previousStory')} onClick={() => previous && onNavigate(previous.id)}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="m14 5-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <button type="button" disabled={!next} aria-label={t('about.lifeMapping.nextStory')} title={t('about.lifeMapping.nextStory')} onClick={() => next && onNavigate(next.id)}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="m10 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </footer>
        </div>
      ) : null}
    </dialog>,
    document.body,
  )
}
