import { useMemo } from 'react'

export type BehindCvTooltipProps = {
  /** 悬停说明全文（供读屏与动画拆分） */
  text: string
  /** 根节点 id（与 `aria-describedby` 联动） */
  id?: string
  /** 外层 class，由调用方决定定位容器样式 */
  className?: string
}

type TooltipMode = 'cjk' | 'latin'

/**
 * 将 tooltip 文案拆成动画单元：中文按字、英文按词（保留空白）。
 */
function splitTooltipUnits(text: string, mode: TooltipMode): string[] {
  if (mode === 'cjk') {
    return Array.from(text)
  }
  return text.split(/(\s+)/).filter((part) => part.length > 0)
}

/**
 * 检测是否以 CJK 为主（决定竖排逐字 vs 多行逐词）。
 */
function detectTooltipMode(text: string): TooltipMode {
  const cjkCount = (text.match(/[\u4e00-\u9fff]/g) ?? []).length
  const latinCount = (text.match(/[a-zA-Z]/g) ?? []).length
  return cjkCount >= latinCount ? 'cjk' : 'latin'
}

/**
 * 「简历背后」悬停说明：竖排/多行错落入场，替代单行横排 tooltip。
 */
export function BehindCvTooltip({ text, id, className }: BehindCvTooltipProps) {
  const mode = useMemo(() => detectTooltipMode(text), [text])
  const units = useMemo(() => splitTooltipUnits(text, mode), [text, mode])

  return (
    <div
      id={id}
      role="tooltip"
      className={[
        'resume-behind-tooltip',
        mode === 'cjk' ? 'resume-behind-tooltip--cjk' : 'resume-behind-tooltip--latin',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="resume-behind-tooltip-sr">{text}</span>
      <span className="resume-behind-tooltip-chars" aria-hidden>
        {units.map((unit, index) => (
          <span
            key={`${unit}-${index}`}
            className="resume-behind-tooltip-unit"
            style={{ '--unit-i': index } as React.CSSProperties}
          >
            {unit}
          </span>
        ))}
      </span>
    </div>
  )
}
