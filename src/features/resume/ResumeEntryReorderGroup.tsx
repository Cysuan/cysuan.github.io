import {
  type ReactNode,
  useLayoutEffect,
  useRef,
} from 'react'

const FLIP_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const FLIP_X_MS = 480
const FLIP_Y_MS = 580

export type ResumeEntryReorderGroupProps = {
  /**
   * 条目 id 顺序；仅当此串变化时（如勾选时间线排序）才播放 FLIP。
   * A/B 切换、高度收紧不应改变此 key。
   */
  orderKey: string
  children: ReactNode
}

/**
 * 对 `.resume-entry` 做分轴 FLIP：先水平、再垂直，磁吸式过渡。
 *
 * @param el - 条目根节点
 * @param dx - 水平位移（px）
 * @param dy - 垂直位移（px）
 */
function runStagedEntryFlip(el: HTMLElement, dx: number, dy: number) {
  if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return

  el.style.transition = 'none'
  el.style.transform = `translate(${dx}px, ${dy}px)`
  el.style.willChange = 'transform'

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const cleanup = () => {
        el.style.transition = ''
        el.style.transform = ''
        el.style.willChange = ''
      }

      const runVertical = () => {
        if (Math.abs(dy) < 0.5) {
          cleanup()
          return
        }
        el.style.transition = `transform ${FLIP_Y_MS}ms ${FLIP_EASE}`
        el.style.transform = 'translate(0, 0)'
        el.addEventListener('transitionend', cleanup, { once: true })
      }

      if (Math.abs(dx) >= 0.5) {
        el.style.transition = `transform ${FLIP_X_MS}ms ${FLIP_EASE}`
        el.style.transform = `translate(0px, ${dy}px)`
        el.addEventListener('transitionend', () => runVertical(), { once: true })
      } else {
        runVertical()
      }
    })
  })
}

/**
 * 包裹 `.resume-entry` 列表；仅在条目顺序变化时用 FLIP 过渡整块模块。
 */
export function ResumeEntryReorderGroup({ orderKey, children }: ResumeEntryReorderGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const positionsRef = useRef<Map<string, DOMRect>>(new Map())
  const hasMeasuredRef = useRef(false)
  const prevOrderKeyRef = useRef(orderKey)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const entries = Array.from(
      container.querySelectorAll<HTMLElement>('[data-resume-entry-id]'),
    )

    const nextPositions = new Map<string, DOMRect>()
    for (const el of entries) {
      const id = el.dataset.resumeEntryId
      if (id) nextPositions.set(id, el.getBoundingClientRect())
    }

    const orderChanged = prevOrderKeyRef.current !== orderKey
    prevOrderKeyRef.current = orderKey

    if (!hasMeasuredRef.current) {
      hasMeasuredRef.current = true
      positionsRef.current = nextPositions
      return
    }

    const motionOk =
      orderChanged &&
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (motionOk) {
      for (const el of entries) {
        const id = el.dataset.resumeEntryId
        if (!id) continue
        const prev = positionsRef.current.get(id)
        const next = nextPositions.get(id)
        if (!prev || !next) continue

        const dx = prev.left - next.left
        const dy = prev.top - next.top
        runStagedEntryFlip(el, dx, dy)
      }
    }

    positionsRef.current = nextPositions
  }, [orderKey])

  return (
    <div ref={containerRef} className="resume-entry-reorder-group">
      {children}
    </div>
  )
}
