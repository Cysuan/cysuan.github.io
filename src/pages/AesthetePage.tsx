import { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { AboutSection } from '../features/about/AboutSection'
import { AestheteFeedTabs } from '../features/aesthete/AestheteFeedTabs'
import { AestheteHeader } from '../features/aesthete/AestheteHeader'
import { AestheteHero } from '../features/aesthete/AestheteHero'
import { SiteFooter } from '../features/aesthete/SiteFooter'
import { PaintingsGallery } from '../features/paintings/PaintingsGallery'
import { ResumeSection } from '../features/resume/ResumeSection'
import '../styles/aesthete.css'

/**
 * Personal portfolio shell: shared chrome + tabbed sections with hash anchors (resume / about / paintings).
 */
export function AesthetePage() {
  const location = useLocation()
  const { pathname, hash } = location
  const { i18n } = useTranslation()
  const uiLang = i18n.language.startsWith('zh') ? 'zh' : 'en'
  const isAboutView = pathname === '/about'
  const hideHero = pathname === '/about' || pathname === '/paintings'

  /**
   * After route/hash change: smooth-scroll to `#resume`, `#about`, or `#paintings` when matched;
   * otherwise reset scroll position.
   */
  useLayoutEffect(() => {
    const opts: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }

    if (pathname === '/paintings') {
      if (hash === '#paintings' || hash === '') {
        document.getElementById('paintings')?.scrollIntoView(opts)
        return
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    if (pathname === '/resume') {
      if (hash === '#resume') {
        document.getElementById('resume')?.scrollIntoView(opts)
        return
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    if (pathname === '/about') {
      if (hash === '#about' || hash === '') {
        document.getElementById('about')?.scrollIntoView(opts)
        return
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return (
    <div className="aesthete-root" data-ui-lang={uiLang}>
      <div className="page-container">
        <AestheteHeader />
        {!hideHero ? <AestheteHero /> : null}
        <AestheteFeedTabs />

        {pathname === '/resume' ? (
          <section id="resume" className="resume-section">
            <ResumeSection />
          </section>
        ) : null}

        {isAboutView ? <AboutSection /> : null}

        {pathname === '/paintings' ? <PaintingsGallery /> : null}

        <SiteFooter />
      </div>
    </div>
  )
}
