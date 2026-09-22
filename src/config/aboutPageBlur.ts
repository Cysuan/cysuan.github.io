/**
 * 关于页（首页）Tab 以下区域的模糊遮罩默认开关。
 * 改为 `true` 保存后，进入关于页时 Tab 以下内容为模糊不可读。
 */
export const ABOUT_BELOW_TABS_BLUR_DEFAULT = false

/** sessionStorage：当前浏览器 session 内覆盖默认开关（`1` 开 / `0` 关） */
export const ABOUT_BELOW_TABS_BLUR_SESSION_KEY = 'variant.aboutBelowTabsBlur'

/**
 * 读取 session 内的遮罩覆盖值；无覆盖时返回 `null`。
 */
export function readAboutBelowTabsBlurSession(): boolean | null {
  try {
    const raw = sessionStorage.getItem(ABOUT_BELOW_TABS_BLUR_SESSION_KEY)
    if (raw === '1') return true
    if (raw === '0') return false
  } catch {
    /* 隐私模式等 */
  }
  return null
}

/**
 * 写入 session 遮罩开关；传 `null` 则清除覆盖、恢复为默认配置。
 *
 * @param enabled - 是否启用模糊遮罩
 */
export function writeAboutBelowTabsBlurSession(enabled: boolean | null): void {
  try {
    if (enabled === null) {
      sessionStorage.removeItem(ABOUT_BELOW_TABS_BLUR_SESSION_KEY)
      return
    }
    sessionStorage.setItem(ABOUT_BELOW_TABS_BLUR_SESSION_KEY, enabled ? '1' : '0')
  } catch {
    /* 忽略 */
  }
}

/**
 * 解析当前是否启用关于页 Tab 以下模糊遮罩。
 *
 * @param sessionOverride - session 覆盖值
 */
export function resolveAboutBelowTabsBlurEnabled(sessionOverride: boolean | null): boolean {
  if (sessionOverride !== null) return sessionOverride
  return ABOUT_BELOW_TABS_BLUR_DEFAULT
}
