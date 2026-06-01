import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../locales/en.json'
import zh from '../locales/zh.json'

/** localStorage key persisting the user's UI language. */
export const LOCALE_STORAGE_KEY = 'xuan.locale'

/** @returns Prefer stored locale; default to Chinese to match the primary design. */
function readStoredLng(): 'en' | 'zh' {
  if (typeof window === 'undefined') return 'zh'
  try {
    const v = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (v === 'en' || v === 'zh') return v
  } catch {
    /* ignore private mode / quota */
  }
  return 'zh'
}

void i18n.use(initReactI18next).init({
  lng: readStoredLng(),
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
})

/**
 * Persists the active locale for the next visit.
 * @param lng - BCP-47 style short code used in this app (`en` | `zh`).
 */
export function persistLocale(lng: 'en' | 'zh'): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, lng)
  } catch {
    /* ignore */
  }
}

/** @param lng - Active i18n language string. */
export function syncDocumentLanguage(lng: string): void {
  document.documentElement.lang = lng.startsWith('zh') ? 'zh-Hans' : 'en'
}

export default i18n
