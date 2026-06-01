import { useTranslation } from 'react-i18next'
import './aboutSection.css'
import { AboutDotsPhilosophy } from './AboutDotsPhilosophy'
import { LifeMappingDots } from './LifeMappingDots'

const PORTRAIT_SRC = '/about/about-portrait.jpg'

/**
 * About route: headline, bio, portrait, Life Mapping dots, and a closing note on the dots idea.
 */
export function AboutSection() {
  const { t } = useTranslation()

  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="about-layout">
        <div className="about-copy">
          <h1 id="about-heading" className="about-heading">
            <span className="about-heading-line about-heading-line--bold">About me.</span>
          </h1>
          <p className="about-bio">{t('about.longBio')}</p>
        </div>
        <aside className="about-media">
          <img
            src={PORTRAIT_SRC}
            alt={t('about.photoAlt')}
            width={480}
            height={480}
            loading="lazy"
            decoding="async"
          />
        </aside>
      </div>

      <h2 className="about-heading about-life-mapping-section-heading">
        <span className="about-heading-line about-heading-line--bold">
          {t('about.lifeMapping.heading')}
        </span>
      </h2>

      <AboutDotsPhilosophy />

      <LifeMappingDots />
    </section>
  )
}
