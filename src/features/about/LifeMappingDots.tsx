import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './lifeMappingDots.css'
import { getLifeMappingNodeCopyRows } from './lifeMappingCopy'
import { TutoringBusinessCard } from './TutoringBusinessCard'
import {
  LIFE_MAPPING_EDGES,
  LIFE_MAPPING_TOPOLOGY,
  type LifeMappingNodeKind,
  type LifeMappingLabelPlacement,
  type LifeMappingTopoNode,
} from './lifeMappingGraph'

/** Runtime node enriched with layout + SVG group handle (imperatively animated). */
type RuntimeLMNode = LifeMappingTopoNode & {
  label: string
  date: string
  tag?: string
  desc: string
  baseX: number
  baseY: number
  currentX: number
  currentY: number
  offset: number
  element: SVGGElement
}

/** Runtime edge with resolved endpoints + path element. */
type RuntimeLMLink = {
  source: RuntimeLMNode
  target: RuntimeLMNode
  element: SVGPathElement
}

const SVG_NS = 'http://www.w3.org/2000/svg'

type RichTextToken =
  | { type: 'text'; value: string }
  | { type: 'bold'; value: string }

/**
 * Very small inline formatter for panel copy.
 * - `**bold**` renders as `<strong>`
 * - `\n\n` starts a new paragraph
 *
 * @param input - Raw copy string
 */
function tokenizeRichText(input: string): RichTextToken[] {
  const tokens: RichTextToken[] = []
  const re = /\*\*(.+?)\*\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = re.exec(input))) {
    const before = input.slice(lastIndex, match.index)
    if (before) tokens.push({ type: 'text', value: before })
    tokens.push({ type: 'bold', value: match[1] ?? '' })
    lastIndex = match.index + match[0].length
  }
  const rest = input.slice(lastIndex)
  if (rest) tokens.push({ type: 'text', value: rest })
  return tokens
}

/**
 * @param desc - Copy string supporting `\n\n` paragraphs and `**bold**`
 */
function renderPanelDesc(desc: string): ReactNode {
  const paragraphs = desc.split(/\n{2,}/g).filter(Boolean)
  return paragraphs.map((p, pIdx) => {
    const inline = tokenizeRichText(p)
    return (
      <p key={`lm-p-${pIdx}`}>
        {inline.map((t, idx) =>
          t.type === 'bold' ? (
            <strong key={`lm-b-${pIdx}-${idx}`}>{t.value}</strong>
          ) : (
            <span key={`lm-t-${pIdx}-${idx}`}>{t.value}</span>
          ),
        )}
      </p>
    )
  })
}

/**
 * @param source - Line start
 * @param target - Line end
 */
function getPathString(source: RuntimeLMNode, target: RuntimeLMNode): string {
  const dx = target.currentX - source.currentX
  const dy = target.currentY - source.currentY
  const midX = (source.currentX + target.currentX) / 2
  const midY = (source.currentY + target.currentY) / 2
  const offset = 40
  const angle = Math.atan2(dy, dx)
  const cpX = midX + Math.cos(angle + Math.PI / 2) * offset
  const cpY = midY + Math.sin(angle + Math.PI / 2) * offset
  return `M${source.currentX},${source.currentY} Q${cpX},${cpY} ${target.currentX},${target.currentY}`
}

/**
 * @param links - Edges of the graph
 * @param targetId - Hovered or selected node
 */
function getHistoryPathIds(links: RuntimeLMLink[], targetId: string): string[] {
  const pathsToHighlight: string[] = []
  const stack: string[] = [targetId]
  const visited = new Set<string>()

  while (stack.length > 0) {
    const currentId = stack.pop()
    if (!currentId || visited.has(currentId)) continue
    visited.add(currentId)

    const incoming = links.filter((l) => l.target.id === currentId)
    incoming.forEach((link) => {
      pathsToHighlight.push(`link-${link.source.id}-${link.target.id}`)
      stack.push(link.source.id)
    })
  }
  return pathsToHighlight
}

function linkKey(sourceId: string, targetId: string): string {
  return `link-${sourceId}-${targetId}`
}

/**
 * @param el - SVG node group or other target element
 */
function isElementFullyOutsideViewport(el: Element): boolean {
  const rect = el.getBoundingClientRect()
  return (
    rect.bottom <= 0 ||
    rect.top >= window.innerHeight ||
    rect.right <= 0 ||
    rect.left >= window.innerWidth
  )
}

/**
 * @param r - Node circle radius
 * @param placement - Label placement hint
 */
function getNodeLabelLayout(
  r: number,
  placement: LifeMappingLabelPlacement | undefined,
): { x: number; y: number; anchor: 'start' | 'end' | 'middle' } {
  const p: LifeMappingLabelPlacement = placement ?? 'rightDown'
  const gapX = 8
  const gapY = 12

  if (p === 'leftDown') {
    return { x: -(r + gapX), y: r + gapY, anchor: 'end' }
  }

  if (p === 'up') {
    return { x: 0, y: -(r + gapY), anchor: 'middle' }
  }

  return { x: r + gapX, y: r + gapY, anchor: 'start' }
}

/** Outgoing edge target shown in the detail panel “引向” list. */
interface LifeMappingLedToItem {
  id: string
  label: string
}

interface LifeMappingPanelModel {
  id: string
  date: string
  tag: string
  label: string
  desc: string
  type: LifeMappingNodeKind
  ledTo: LifeMappingLedToItem[]
}

/**
 * Interactive “connecting the dots” constellation (reference design) embedded on About.
 */
export function LifeMappingDots() {
  const { t, i18n } = useTranslation()
  const wrapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  const mouseRef = useRef({ x: 0, y: 0 })
  const circlePosRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)
  const rafMainRef = useRef<number>(0)
  const rafCursorRef = useRef<number>(0)

  const nodesRef = useRef<RuntimeLMNode[]>([])
  const linksRef = useRef<RuntimeLMLink[]>([])
  const activeNodeIdRef = useRef<string | null>(null)
  /** Node ids whose labels stay visible on the chart after being clicked */
  const pinnedLabelIdsRef = useRef<Set<string>>(new Set())
  /** Opens a node panel + chart highlight from the “引向” list (set in SVG mount effect). */
  const openNodeByIdRef = useRef<(nodeId: string) => void>(() => {})

  const [panel, setPanel] = useState<LifeMappingPanelModel | null>(null)
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 })

  /** Rebuild topology when container size or copy language changes. */
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const measure = () => {
      const r = el.getBoundingClientRect()
      setDimensions({ w: Math.floor(r.width), h: Math.floor(r.height) })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const closePanel = useCallback(() => {
    activeNodeIdRef.current = null
    setPanel(null)
    const nodes = nodesRef.current
    const links = linksRef.current
    links.forEach((l) => {
      l.element.classList.remove('active', 'path-history', 'dimmed')
    })
    nodes.forEach((n) => {
      n.element.style.opacity = '1'
      n.element.classList.remove('active')
    })
    wrapRef.current?.classList.remove('life-mapping--cursor-hover')
  }, [])

  useEffect(() => {
    if (!panel) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [panel, closePanel])

  /** Click outside the detail drawer closes it (panel and nodes stop propagation). */
  useEffect(() => {
    if (!panel) return
    const onDocClick = () => closePanel()
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [panel, closePanel])

  /**
   * Auto-close the detail panel when the constellation becomes "too squeezed" in view.
   * Rule: if the visible width of the Life Mapping area is < 1/3 of the viewport width.
   */
  useEffect(() => {
    if (!panel) return
    const el = wrapRef.current
    if (!el) return

    const thresholdPx = () =>
      (typeof window !== 'undefined' ? window.innerWidth : 0) / 3

    const checkAndClose = (visibleWidth: number) => {
      if (visibleWidth > 0 && visibleWidth < thresholdPx()) closePanel()
    }

    // Run once immediately (in case layout already satisfies the close condition).
    checkAndClose(el.getBoundingClientRect().width)

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        checkAndClose(entry.intersectionRect.width)
      },
      {
        root: null,
        // Be sensitive to width changes across scrolling and layout shifts.
        threshold: [0, 0.01, 0.1, 0.2, 0.33, 0.5, 1],
      },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [panel, closePanel])

  /**
   * Auto-close the detail panel when the selected dot leaves the viewport
   * (e.g. user scrolls the About page while a node panel is open).
   */
  useEffect(() => {
    if (!panel) return

    const nodeId = panel.id
    let rafId = 0

    const checkAndClose = () => {
      if (activeNodeIdRef.current !== nodeId) return
      const nodeEl = document.getElementById(`node-${nodeId}`)
      if (!nodeEl) return
      if (isElementFullyOutsideViewport(nodeEl)) closePanel()
    }

    const scheduleCheck = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(checkAndClose)
    }

    document.addEventListener('scroll', scheduleCheck, { capture: true, passive: true })
    window.addEventListener('resize', scheduleCheck, { passive: true })

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry && !entry.isIntersecting) closePanel()
      },
      { threshold: 0 },
    )

    const nodeEl = document.getElementById(`node-${nodeId}`)
    if (nodeEl) io.observe(nodeEl)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('scroll', scheduleCheck, true)
      window.removeEventListener('resize', scheduleCheck)
      io.disconnect()
    }
  }, [panel, closePanel])

  /** Mount / refresh SVG simulation. */
  useEffect(() => {
    const svg = svgRef.current
    const wrap = wrapRef.current
    if (!svg || !wrap || dimensions.w < 64 || dimensions.h < 64) return

    closePanel()

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    svg.innerHTML = ''
    nodesRef.current = []
    linksRef.current = []

    const copyRows = getLifeMappingNodeCopyRows(i18n.language)
    const copyById = new Map(copyRows.map((r) => [r.id, r] as const))

    const merged = LIFE_MAPPING_TOPOLOGY.map((topo) => ({
      ...topo,
      label: copyById.get(topo.id)?.label ?? '',
      date: copyById.get(topo.id)?.date ?? '',
      tag: copyById.get(topo.id)?.tag,
      desc: copyById.get(topo.id)?.desc ?? '',
      baseX: (topo.x / 100) * dimensions.w,
      baseY: (topo.y / 100) * dimensions.h,
      currentX: (topo.x / 100) * dimensions.w,
      currentY: (topo.y / 100) * dimensions.h,
      offset: Math.random() * Math.PI * 2,
    }))

    const nodeById = new Map<string, RuntimeLMNode>()

    const runtimeNodes: RuntimeLMNode[] = merged.map((m) => {
      const n: RuntimeLMNode = {
        ...m,
        element: document.createElementNS(SVG_NS, 'g') as SVGGElement,
      }
      nodeById.set(n.id, n)
      return n
    })

    const runtimeLinks: RuntimeLMLink[] = LIFE_MAPPING_EDGES.map((edge) => {
      const source = nodeById.get(edge.source)
      const target = nodeById.get(edge.target)
      if (!source || !target) {
        throw new Error(`LifeMapping: missing node for edge ${edge.source}→${edge.target}`)
      }
      const path = document.createElementNS(SVG_NS, 'path') as SVGPathElement
      path.setAttribute('class', 'link')
      path.id = linkKey(source.id, target.id)
      svg.appendChild(path)
      return { source, target, element: path }
    })

    nodesRef.current = runtimeNodes
    linksRef.current = runtimeLinks

  /**
   * @param nodeId - Hovered or selected node
   * @param dimOthers - When false (panel open), keep the full constellation visible
   */
    const applyNodeHighlight = (nodeId: string, dimOthers: boolean) => {
      wrap.classList.add('life-mapping--cursor-hover')

      const historyPaths = getHistoryPathIds(runtimeLinks, nodeId)

      runtimeLinks.forEach((link) => {
        const lk = linkKey(link.source.id, link.target.id)
        if (historyPaths.includes(lk)) {
          link.element.classList.add('path-history')
          link.element.classList.remove('dimmed')
        } else if (link.source.id === nodeId || link.target.id === nodeId) {
          link.element.classList.add('active')
          link.element.classList.remove('dimmed')
        } else {
          link.element.classList.remove('active', 'path-history')
          if (dimOthers) {
            link.element.classList.add('dimmed')
          } else {
            link.element.classList.remove('dimmed')
          }
        }
      })

      runtimeNodes.forEach((n) => {
        n.element.style.opacity = dimOthers && n.id !== nodeId ? '0.3' : '1'
        n.element.classList.toggle('active', n.id === nodeId)
      })
    }

    const handleNodeHover = (nodeId: string) => {
      if (activeNodeIdRef.current) return
      applyNodeHighlight(nodeId, true)
    }

    const handleNodeLeave = () => {
      if (activeNodeIdRef.current) return

      runtimeLinks.forEach((l) => {
        l.element.classList.remove('active', 'path-history', 'dimmed')
      })
      runtimeNodes.forEach((n) => {
        n.element.style.opacity = '1'
        n.element.classList.remove('active')
      })
      wrap.classList.remove('life-mapping--cursor-hover')
    }

    const openNodePanel = (node: RuntimeLMNode) => {
      activeNodeIdRef.current = node.id
      pinnedLabelIdsRef.current.add(node.id)
      node.element.classList.add('label-pinned')
      applyNodeHighlight(node.id, false)

      const outgoing = runtimeLinks.filter((l) => l.source.id === node.id)
      const ledTo: LifeMappingLedToItem[] = outgoing.map((l) => ({
        id: l.target.id,
        label: l.target.label,
      }))

      setPanel({
        id: node.id,
        date: node.date,
        tag: node.tag ?? typeLabel(node.type),
        label: node.label,
        desc: node.desc,
        type: node.type,
        ledTo,
      })

      panelRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }

    openNodeByIdRef.current = (nodeId: string) => {
      const target = runtimeNodes.find((n) => n.id === nodeId)
      if (target) openNodePanel(target)
    }

    runtimeNodes.forEach((node) => {
      const g = node.element
      g.classList.add('node')
      g.setAttribute('id', `node-${node.id}`)

      const hitbox = document.createElementNS(SVG_NS, 'circle')
      hitbox.classList.add('hitbox')
      hitbox.setAttribute('r', String(node.r + 15))

      const circle = document.createElementNS(SVG_NS, 'circle')
      circle.setAttribute('r', String(node.r))

      const text = document.createElementNS(SVG_NS, 'text')
      text.textContent = node.label
      const labelLayout = getNodeLabelLayout(node.r, node.labelPlacement)
      text.setAttribute('x', String(labelLayout.x))
      text.setAttribute('y', String(labelLayout.y))
      text.setAttribute('text-anchor', labelLayout.anchor)

      g.appendChild(hitbox)
      g.appendChild(circle)
      g.appendChild(text)
      svg.appendChild(g)

      g.addEventListener('mouseenter', () => handleNodeHover(node.id))
      g.addEventListener('mouseleave', handleNodeLeave)
      g.addEventListener('click', (e) => {
        e.stopPropagation()
        openNodePanel(node)
      })

      if (pinnedLabelIdsRef.current.has(node.id)) {
        g.classList.add('label-pinned')
      }
    })

    const tick = () => {
      timeRef.current += reduceMotion ? 0 : 0.01

      runtimeNodes.forEach((node) => {
        const floatAmp = reduceMotion ? 0 : 2 + node.r * 0.2
        const t0 = timeRef.current
        node.currentX = node.baseX + Math.sin(t0 + node.offset) * floatAmp
        node.currentY = node.baseY + Math.cos(t0 * 0.8 + node.offset) * floatAmp
        node.element.setAttribute('transform', `translate(${node.currentX}, ${node.currentY})`)
      })

      runtimeLinks.forEach((link) => {
        link.element.setAttribute('d', getPathString(link.source, link.target))
      })

      rafMainRef.current = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      openNodeByIdRef.current = () => {}
      cancelAnimationFrame(rafMainRef.current)
    }
  }, [closePanel, dimensions.w, dimensions.h, i18n.language])

  /**
   * @param nodeId - Target topology node id (e.g. `n2`)
   */
  const navigateToLedToNode = useCallback((nodeId: string) => {
    openNodeByIdRef.current(nodeId)
  }, [])

  /** Custom cursor: dot + lagging ring. */
  useEffect(() => {
    const dot = dotRef.current
    const ring = circleRef.current
    if (!dot || !ring) return

    const cx = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
    const cy = typeof window !== 'undefined' ? window.innerHeight / 2 : 0
    mouseRef.current = { x: cx, y: cy }
    circlePosRef.current = { x: cx, y: cy }

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    document.addEventListener('mousemove', onMove)

    const tick = () => {
      const { x, y } = mouseRef.current
      circlePosRef.current.x += (x - circlePosRef.current.x) * 0.15
      circlePosRef.current.y += (y - circlePosRef.current.y) * 0.15
      ring.style.transform = `translate(${circlePosRef.current.x}px, ${circlePosRef.current.y}px)`
      rafCursorRef.current = requestAnimationFrame(tick)
    }
    rafCursorRef.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafCursorRef.current)
    }
  }, [])

  const typeLabel = (k: LifeMappingNodeKind) => t(`about.lifeMapping.type.${k}`)

  return (
    <div className="about-life-mapping-shell">
      <section
        ref={wrapRef}
        className="about-life-mapping"
        aria-label={t('about.lifeMapping.sectionAria')}
      >
        <div ref={dotRef} className="life-mapping-cursor-dot" aria-hidden />
        <div ref={circleRef} className="life-mapping-cursor-circle" aria-hidden />

        <p className="life-mapping-ambient-quote">
          {t('about.lifeMapping.ambientLine1')}
          <br />
          {t('about.lifeMapping.ambientLine2')}
        </p>

        <svg
          ref={svgRef}
          className="life-mapping-network-canvas"
          width="100%"
          height="100%"
          aria-hidden
        />
      </section>

      <aside
        ref={panelRef}
        className={`life-mapping-detail-panel${panel ? ' life-mapping-detail-panel--open' : ''}`}
        aria-hidden={!panel}
        onClick={(e) => e.stopPropagation()}
        {...(panel ? { role: 'complementary' as const } : {})}
      >
        {panel ? (
          <>
            <div className="life-mapping-detail-meta">
              {panel.date} • {panel.tag}
            </div>
            <h2 className="life-mapping-detail-title">{panel.label}</h2>
            <div className="life-mapping-detail-body">
              {renderPanelDesc(panel.desc)}
            </div>
            {panel.id === 'n7' ? <TutoringBusinessCard resetKey={panel.id} /> : null}
            {panel.ledTo.length > 0 ? (
              <div className="life-mapping-detail-connections">
                <div className="life-mapping-detail-connections-title">
                  {t('about.lifeMapping.ledTo')}
                </div>
                <ul className="life-mapping-connection-list">
                  {panel.ledTo.map((item) => (
                    <li
                      key={`${panel.id}-out-${item.id}`}
                      className="life-mapping-connection-item"
                    >
                      <button
                        type="button"
                        className="life-mapping-connection-link"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigateToLedToNode(item.id)
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        ) : null}
      </aside>
    </div>
  )
}
