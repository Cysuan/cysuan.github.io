import { useTranslation } from 'react-i18next'
import { persistLocale } from '../../i18n/config'

/**
 * Capsule toggle matching the EN / 中文 presentation in the design reference.
 */
export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const lng = i18n.language.startsWith('zh') ? 'zh' : 'en'

  /** Switches UI language and stores the preference locally. */
  const setLng = (next: 'en' | 'zh') => {
    void i18n.changeLanguage(next)
    persistLocale(next)
  }

  return (
    <div
      className="lang-switch"
      role="group"
      aria-label={t('a11y.language')}
    >
      <button
        type="button"
        className={`lang-opt${lng === 'en' ? ' is-active' : ''}`}
        onClick={() => setLng('en')}
      >
        {t('lang.en')}
      </button>
      <span className="lang-sep" aria-hidden="true">
        {' '}
        /{' '}
      </span>
      <button
        type="button"
        className={`lang-opt${lng === 'zh' ? ' is-active' : ''}`}
        onClick={() => setLng('zh')}
      >
        {t('lang.zh')}
      </button>
    </div>
  )
}
