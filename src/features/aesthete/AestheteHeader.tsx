import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { LanguageSwitcher } from './LanguageSwitcher'

/**
 * Top bar with serif wordmark and the localized language capsule.
 */
export function AestheteHeader() {
  const { t } = useTranslation()

  return (
    <header className="site-chrome-header">
      <Link to={{ pathname: '/resume' }} className="logo">
        {t('site.logo')}
      </Link>
      <LanguageSwitcher />
    </header>
  )
}
