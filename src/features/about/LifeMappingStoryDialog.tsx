import { useEffect, useRef, useState } from 'react'
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
  const scrollRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef<number | null>(null)
  const backdropDownRef = useRef(false)
  const [closing, setClosing] = useState(false)

  function requestClose() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onClose()
    } else {
      setClosing(true)
    }
  }

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
        <div className="life-mapping-story-surface">
          <header className="life-mapping-story-header">
            <div
              className="life-mapping-sheet-grip"
              aria-hidden="true"
              onPointerDown={(event) => {
                dragStartRef.current = event.clientY
                event.currentTarget.setPointerCapture(event.pointerId)
              }}
              onPointerMove={(event) => {
                if (dragStartRef.current === null) return
                const distance = Math.max(0, event.clientY - dragStartRef.current)
                dialogRef.current?.style.setProperty('--sheet-drag', `${distance}px`)
              }}
              onPointerUp={(event) => {
                if (dragStartRef.current !== null && event.clientY - dragStartRef.current > 60) {
                  requestClose()
                }
                dialogRef.current?.style.removeProperty('--sheet-drag')
                dragStartRef.current = null
              }}
              onPointerCancel={() => {
                dialogRef.current?.style.removeProperty('--sheet-drag')
                dragStartRef.current = null
              }}
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
