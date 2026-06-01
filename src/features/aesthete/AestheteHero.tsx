import { useTranslation } from 'react-i18next'
import { SocialLinks } from './SocialLinks'

/**
 * Profile column (avatar, bilingual copy, social row) opposite the italic quote.
 */
export function AestheteHero() {
  const { t } = useTranslation()

  return (
    <section className="hero">
      <div className="author-card">
        <img
          src="/avatar-portrait.png"
          alt={t('profile.portraitAlt')}
          className="avatar-lg"
          width={88}
          height={88}
        />
        <h1 className="author-name serif">{t('profile.name')}</h1>
        <p className="author-bio preserve-lines">{t('profile.bio')}</p>
        <SocialLinks />
      </div>

      <div className="hero-quote-wrap">
        <blockquote className="quote-text">{t('quote.side')}</blockquote>
      </div>
    </section>
  )
}
