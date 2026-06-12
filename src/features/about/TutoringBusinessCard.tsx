import { type KeyboardEvent, type MouseEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const BOX_SRC = '/about/tutoring-card/box.png'
const CARD_FRONT_SRC = '/about/tutoring-card/card-front.png'
const CARD_BACK_SRC = '/about/tutoring-card/card-back.png'

export type TutoringBusinessCardProps = {
  /** 面板关闭或切换节点时重置交互状态 */
  resetKey: string
}

/**
 * 「野生物理老师」详情页名片展示：悬停纸盒浮现正面，点击翻转至背面。
 */
export function TutoringBusinessCard({ resetKey }: TutoringBusinessCardProps) {
  const { t } = useTranslation()
  const [revealed, setRevealed] = useState(false)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setRevealed(false)
    setFlipped(false)
  }, [resetKey])

  const onReveal = useCallback(() => setRevealed(true), [])
  const onHide = useCallback(() => {
    setRevealed(false)
    setFlipped(false)
  }, [])

  /** 触屏设备无 hover，点击纸盒区域取出名片 */
  const onBoxTap = useCallback(() => {
    if (window.matchMedia('(hover: none)').matches) {
      setRevealed(true)
    }
  }, [])

  const onCardClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!revealed) return
    setFlipped((v) => !v)
  }, [revealed])

  const onCardKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      if (!revealed) return
      setFlipped((v) => !v)
    }
  }, [revealed])

  return (
    <div
      className="life-mapping-tutoring-card"
      onMouseEnter={onReveal}
      onMouseLeave={onHide}
      onFocus={onReveal}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onHide()
      }}
    >
      <div
        className={`life-mapping-tutoring-card-float${revealed ? ' life-mapping-tutoring-card-float--visible' : ''}`}
        aria-hidden={!revealed}
      >
        <button
          type="button"
          className={`life-mapping-tutoring-card-flip${flipped ? ' life-mapping-tutoring-card-flip--back' : ''}`}
          onClick={onCardClick}
          onKeyDown={onCardKeyDown}
          aria-label={t('about.lifeMapping.tutoringCard.flipAria')}
          tabIndex={revealed ? 0 : -1}
        >
          <span className="life-mapping-tutoring-card-face life-mapping-tutoring-card-face--front">
            <img src={CARD_FRONT_SRC} alt="" decoding="async" draggable={false} />
          </span>
          <span className="life-mapping-tutoring-card-face life-mapping-tutoring-card-face--back">
            <img src={CARD_BACK_SRC} alt="" decoding="async" draggable={false} />
          </span>
        </button>
      </div>

      <button
        type="button"
        className="life-mapping-tutoring-card-box"
        onClick={onBoxTap}
        aria-label={t('about.lifeMapping.tutoringCard.revealAria')}
      >
        <img
          src={BOX_SRC}
          alt=""
          decoding="async"
          draggable={false}
        />
      </button>
    </div>
  )
}
