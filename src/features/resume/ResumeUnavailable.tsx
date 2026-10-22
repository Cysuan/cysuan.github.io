import { useTranslation } from 'react-i18next'
import { ResumeSection } from './ResumeSection'
import './resumeSection.css'

/** Keep the original résumé layout beneath a strong, non-interactive frost layer. */
export function ResumeUnavailable() {
  const { t } = useTranslation()

  return (
    <div className="resume-viewport">
      <div className="resume-unavailable-shell">
        <div className="resume-unavailable-layout" aria-hidden="true" inert>
          <ResumeSection />
        </div>
        <div className="resume-unavailable" role="region" aria-label={t('resume.unavailableAria')}>
          <p className="resume-unavailable-note">{t('resume.privacyNote')}</p>
        </div>
      </div>
    </div>
  )
}
