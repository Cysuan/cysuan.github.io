import { useId } from 'react'

export type ConnectingDotsHoverProps = {
  /** 可交互短语，如 “Connecting the dots” */
  phrase: string
  /** hover 时分段浮现的说明句（每段一行，对应逗号分句） */
  segments: string[]
  /** 引用出处署名，如 “史蒂夫·乔布斯” */
  attribution: string
}

/**
 * 「Connecting the dots」短语：下划线 + hover 时在右侧以引用样式逐行浮现说明。
 */
export function ConnectingDotsHover({
  phrase,
  segments,
  attribution,
}: ConnectingDotsHoverProps) {
  const tipId = useId()
  const fullQuote = segments.join('')

  return (
    <span className="about-connecting-dots">
      <button
        type="button"
        className="about-connecting-dots-trigger"
        aria-describedby={tipId}
      >
        {phrase}
      </button>
      <blockquote
        id={tipId}
        role="tooltip"
        className="about-connecting-dots-reveal"
        cite="https://www.youtube.com/watch?v=UF8uR6Z6KLc"
      >
        <span className="about-connecting-dots-reveal-inner" aria-hidden>
          <span className="about-connecting-dots-quote-body">
            {segments.map((segment, index) => (
              <span
                key={`${segment}-${index}`}
                className="about-connecting-dots-segment"
                style={{ '--seg-i': index } as React.CSSProperties}
              >
                {segment}
              </span>
            ))}
          </span>
          <footer className="about-connecting-dots-attribution">
            <cite>{attribution}</cite>
          </footer>
        </span>
        <span className="about-connecting-dots-sr">
          {fullQuote} {attribution}
        </span>
      </blockquote>
    </span>
  )
}
