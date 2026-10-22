import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export type ConnectingDotsHoverProps = {
  phrase: string
  segments: string[]
  attribution: string
}

/** A small, non-modal annotation: hover on desktop, tap to pin on touch screens. */
export function ConnectingDotsHover({ phrase, segments, attribution }: ConnectingDotsHoverProps) {
  const noteId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const noteRef = useRef<HTMLElement>(null)
  const pinnedRef = useRef(false)
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [open, setOpen] = useState(false)

  function cancelLeave() {
    clearTimeout(leaveTimerRef.current)
  }

  function leave() {
    cancelLeave()
    if (!pinnedRef.current) leaveTimerRef.current = setTimeout(() => setOpen(false), 160)
  }

  useLayoutEffect(() => {
    if (!open) return
    const note = noteRef.current
    const trigger = triggerRef.current
    if (!note || !trigger) return

    const position = () => {
      const anchor = trigger.getBoundingClientRect()
      const box = note.getBoundingClientRect()
      const inset = 16
      const left = Math.max(inset, Math.min(anchor.left, window.innerWidth - box.width - inset))
      const below = anchor.bottom + 10
      const above = anchor.top - box.height - 10
      const top = below + box.height <= window.innerHeight - inset
        ? below
        : Math.max(inset, Math.min(above, window.innerHeight - box.height - inset))
      note.style.left = `${left}px`
      note.style.top = `${top}px`
      note.style.visibility = 'visible'
    }
    position()
    window.addEventListener('resize', position)
    window.addEventListener('scroll', position, true)
    const observer = new ResizeObserver(position)
    observer.observe(note)
    return () => {
      window.removeEventListener('resize', position)
      window.removeEventListener('scroll', position, true)
      observer.disconnect()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: Event) => {
      if (event.target instanceof Node && !triggerRef.current?.contains(event.target) && !noteRef.current?.contains(event.target)) {
        pinnedRef.current = false
        setOpen(false)
      }
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        pinnedRef.current = false
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('focusin', closeOutside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('focusin', closeOutside)
      document.removeEventListener('keydown', escape)
    }
  }, [open])

  useEffect(() => () => clearTimeout(leaveTimerRef.current), [])

  return (
    <span className="about-connecting-dots">
      <button
        ref={triggerRef}
        type="button"
        className="about-connecting-dots-trigger"
        aria-expanded={open}
        aria-controls={open ? noteId : undefined}
        aria-describedby={open ? noteId : undefined}
        onPointerEnter={(event) => {
          cancelLeave()
          if (event.pointerType === 'mouse') setOpen(true)
        }}
        onPointerLeave={leave}
        onClick={() => {
          cancelLeave()
          pinnedRef.current = !pinnedRef.current
          setOpen(pinnedRef.current)
        }}
      ><em>{phrase}</em></button>
      {open ? createPortal(
        <aside
          ref={noteRef}
          id={noteId}
          role="note"
          className="connecting-dots-note"
          onPointerEnter={cancelLeave}
          onPointerLeave={leave}
        >
          <span className="connecting-dots-note-copy">{segments.join('')}</span>
          <cite>{attribution}</cite>
        </aside>,
        document.body,
      ) : null}
    </span>
  )
}
