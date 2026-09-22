import { useCallback, useEffect, useState } from 'react'
import {
  ABOUT_BELOW_TABS_BLUR_DEFAULT,
  readAboutBelowTabsBlurSession,
  resolveAboutBelowTabsBlurEnabled,
  writeAboutBelowTabsBlurSession,
} from '../../config/aboutPageBlur'

/**
 * 关于页 Tab 以下模糊遮罩：默认读配置 + session 覆盖；在关于页按 Alt+Shift+B 切换。
 *
 * @param active - 当前是否为关于页路由
 */
export function useAboutBelowTabsBlur(active: boolean) {
  const [sessionOverride, setSessionOverride] = useState<boolean | null>(() =>
    readAboutBelowTabsBlurSession(),
  )

  const enabled = resolveAboutBelowTabsBlurEnabled(sessionOverride)

  const toggle = useCallback(() => {
    const next = !resolveAboutBelowTabsBlurEnabled(sessionOverride)
    writeAboutBelowTabsBlurSession(next)
    setSessionOverride(next)
  }, [sessionOverride])

  const resetToDefault = useCallback(() => {
    writeAboutBelowTabsBlurSession(null)
    setSessionOverride(null)
  }, [])

  useEffect(() => {
    if (!active) return

    /**
     * @param event - 键盘事件（Alt+Shift+B 切换遮罩）
     */
    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey && event.shiftKey && event.code === 'KeyB') {
        event.preventDefault()
        toggle()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active, toggle])

  return {
    enabled,
    toggle,
    resetToDefault,
    defaultEnabled: ABOUT_BELOW_TABS_BLUR_DEFAULT,
  }
}
