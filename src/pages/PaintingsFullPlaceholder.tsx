import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AestheteHeader } from '../features/aesthete/AestheteHeader'
import '../styles/aesthete.css'

/**
 * Placeholder route for full oil catalogue — distinct layout forthcoming.
 */
export function PaintingsFullPlaceholder() {
  const { t, i18n } = useTranslation()
  const uiLang = i18n.language.startsWith('zh') ? 'zh' : 'en'

  return (
    <div className="aesthete-root" data-ui-lang={uiLang}>
      <div className="page-container">
        <AestheteHeader />
        <article className="paintings-full-stub">
          <p className="paintings-full-stub-back">
            <Link
              to={{ pathname: '/paintings', hash: 'paintings' }}
              className="link-underlined"
            >
              {t('paintings.fullBack')}
            </Link>
          </p>
          <h1 className="paintings-full-stub-title serif">{t('paintings.fullTitle')}</h1>
          <p className="paintings-full-stub-lead">{t('paintings.fullLead')}</p>
        </article>
      </div>
    </div>
  )
}
