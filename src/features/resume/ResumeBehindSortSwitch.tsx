import { useTranslation } from 'react-i18next'
import type { ResumeBehindSortMode } from './resumeData'

export type ResumeBehindSortSwitchProps = {
  /** 当前排序模式 */
  mode: ResumeBehindSortMode
  /** 切换排序模式 */
  onModeChange: (mode: ResumeBehindSortMode) => void
}

/**
 * B 层首行 kicker 右侧：`[ 按照时间线排序 / 默认顺序 ]` 双态切换。
 */
export function ResumeBehindSortSwitch({ mode, onModeChange }: ResumeBehindSortSwitchProps) {
  const { t } = useTranslation()

  return (
    <div
      className="resume-sort-switch"
      role="group"
      aria-label={t('resume.behindCv.sortAria')}
    >
      <span className="resume-sort-bracket" aria-hidden="true">
        [
      </span>
      <button
        type="button"
        className={`resume-sort-opt${mode === 'timeline' ? ' is-active' : ''}`}
        aria-pressed={mode === 'timeline'}
        onClick={() => onModeChange('timeline')}
      >
        {t('resume.behindCv.sortTimeline')}
      </button>
      <span className="resume-sort-sep" aria-hidden="true">
        {' '}
        /{' '}
      </span>
      <button
        type="button"
        className={`resume-sort-opt${mode === 'default' ? ' is-active' : ''}`}
        aria-pressed={mode === 'default'}
        onClick={() => onModeChange('default')}
      >
        {t('resume.behindCv.sortDefault')}
      </button>
      <span className="resume-sort-bracket" aria-hidden="true">
        ]
      </span>
    </div>
  )
}
