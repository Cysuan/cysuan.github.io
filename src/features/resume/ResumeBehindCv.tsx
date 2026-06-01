import type { ReactNode } from 'react'
import { BehindCvTooltip } from './BehindCvTooltip'

export type BehindCvButtonProps = {
  /** 是否与 B 层同步（全局展开时为 true） */
  expanded: boolean
  /** 点击打开 B 层 */
  onOpen: () => void
  /** 按钮文案（与 kicker 同风格） */
  label: string
  /** 悬停提示全文 */
  tooltip: string
}

/**
 * 「简历背后 / Behind the CV」入口按钮，悬停显示说明文案。
 */
export function BehindCvButton({ expanded, onOpen, label, tooltip }: BehindCvButtonProps) {
  return (
    <div className="group relative shrink-0">
      <button
        type="button"
        className="resume-behind-btn"
        aria-expanded={expanded}
        onClick={onOpen}
      >
        {label}
      </button>
      <BehindCvTooltip
        text={tooltip}
        className="resume-behind-btn-tooltip pointer-events-none invisible absolute right-0 top-full z-[80] mt-2 opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
      />
    </div>
  )
}

export type DualLayerStackProps = {
  /** 根节点 id（每条目右侧唯一，便于调试与测试） */
  id: string
  /** `true` 时展示 B 层并从右侧滑入 */
  active: boolean
  /** A 层：标准简历右侧内容 */
  front: ReactNode
  /** B 层：简历背后叙事；非首行可为空占位 */
  back: ReactNode
}

/**
 * 仅包裹右侧内容列的 A/B 双层面板（左侧时间/地点不参与动效）。
 */
export function DualLayerStack({ id, active, front, back }: DualLayerStackProps) {
  return (
    <div id={id} className="resume-dual-stack min-w-0">
      <div
        className={[
          'resume-dual-layer transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none',
          active ? 'resume-dual-layer--inactive' : 'resume-dual-layer--active',
          active
            ? 'pointer-events-none -translate-x-8 opacity-0'
            : 'translate-x-0 opacity-100',
        ].join(' ')}
        aria-hidden={active}
      >
        {front}
      </div>
      <div
        className={[
          'resume-dual-layer transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none',
          active ? 'resume-dual-layer--active' : 'resume-dual-layer--inactive',
          active
            ? 'translate-x-0 opacity-100'
            : 'pointer-events-none translate-x-full opacity-0',
        ].join(' ')}
        aria-hidden={!active}
      >
        {back}
      </div>
    </div>
  )
}
