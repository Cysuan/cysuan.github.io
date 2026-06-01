import { useId } from 'react'
import { BehindCvTooltip } from './BehindCvTooltip'

export type ResumeDogEarDockProps = {
  /** B 层已打开时隐藏折角（由 kicker「回到简历」负责关闭） */
  hidden: boolean
  /** 点击打开 Behind the CV */
  onOpen: () => void
  /** 折角旁短标签，如 `[ 简历背后 ]` */
  label: string
  /** 悬停说明 */
  tooltip: string
}

/**
 * 绝对定位于分区（教育 / 工作经历）右上角的折角 + 触控层（与 `.resume-fold-root` 内 `--current-fold` 联动）。
 */
export function ResumeDogEarDock({ hidden, onOpen, label, tooltip }: ResumeDogEarDockProps) {
  const tipId = useId()

  if (hidden) return null

  return (
    <div className="resume-dog-ear-mount relative pointer-events-none">
      <div className="resume-dog-ear-shadow-layer" aria-hidden />
      <div className="resume-dog-ear-wrapper" aria-hidden>
        <div className="resume-dog-ear-shape" />
      </div>
      <button
        type="button"
        className="resume-dog-ear-zone pointer-events-auto"
        onClick={onOpen}
        aria-label={label}
        aria-describedby={tipId}
      >
        <span className="resume-dog-ear-zone-label">{label}</span>
      </button>
      <BehindCvTooltip id={tipId} text={tooltip} className="resume-dog-ear-tooltip" />
    </div>
  )
}
