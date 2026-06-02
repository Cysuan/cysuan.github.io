import { useId } from 'react'

/** 作品集链接悬停展示的二维码（固定物理尺寸，不参与文档流）。 */
const PORTFOLIO_QR_SRC = '/images/portfolio-qr.png'

export type PortfolioQrHoverLinkProps = {
  /** 链接文案 */
  text: string
  /** 外链地址 */
  href: string
  /** 是否斜体样式 */
  em?: boolean
  /** 二维码替代文本 */
  qrAlt: string
}

/**
 * 「作品集」行内链接：悬停或键盘聚焦时在下方浮出 2.5cm × 2.5cm 二维码，不改变段落排版。
 */
export function PortfolioQrHoverLink({ text, href, em, qrAlt }: PortfolioQrHoverLinkProps) {
  const popoverId = useId()

  return (
    <span className="resume-portfolio-qr-wrap">
      <a
        href={href}
        className={em ? 'resume-inline-link resume-inline-link--em' : 'resume-inline-link'}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby={popoverId}
      >
        {text}
      </a>
      <span id={popoverId} className="resume-portfolio-qr-pop" role="img" aria-label={qrAlt}>
        <img src={PORTFOLIO_QR_SRC} alt="" decoding="async" />
      </span>
    </span>
  )
}
