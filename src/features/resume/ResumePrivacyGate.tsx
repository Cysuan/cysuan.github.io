import { type FormEvent, type ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { unlockResumePrivacy, useResumePrivacy } from './useResumePrivacy'

/** 验证通过后遮罩淡出时长（ms） */
const UNLOCK_FADE_MS = 400

/** 验证正确答案（trim 后完整匹配） */
const RESUME_UNLOCK_ANSWER = "I don't know, let me check the app."

type ResumePrivacyGateProps = {
  children: ReactNode
}

/**
 * 履历正文隐私门：默认 blur 遮罩 + 问答验证；session 内验证成功后移除遮罩。
 *
 * @param props.children - 原有履历 DOM，完整保留不修改
 */
export function ResumePrivacyGate({ children }: ResumePrivacyGateProps) {
  const { t } = useTranslation()
  const unlocked = useResumePrivacy()
  const [fading, setFading] = useState(false)
  const [answerInput, setAnswerInput] = useState('')
  const [showError, setShowError] = useState(false)

  const contentUnlocked = unlocked

  /**
   * @param event - 表单提交
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    verifyAnswer()
  }

  /** 校验回答；正确则写入 session 并淡出遮罩 */
  function verifyAnswer() {
    if (answerInput.trim() === RESUME_UNLOCK_ANSWER) {
      setShowError(false)
      setFading(true)
      window.setTimeout(() => {
        unlockResumePrivacy()
        setFading(false)
      }, UNLOCK_FADE_MS)
      return
    }

    setShowError(true)
  }

  return (
    <div className="resume-privacy-shell">
      <div
        className={contentUnlocked ? 'resume-privacy-content is-unlocked' : 'resume-privacy-content'}
        aria-hidden={!contentUnlocked}
        inert={!contentUnlocked}
      >
        {children}
      </div>

      {!contentUnlocked ? (
        <div
          className={fading ? 'resume-privacy-overlay is-fading' : 'resume-privacy-overlay'}
          role="region"
          aria-label={t('resume.unlockFormAria')}
        >
          <form className="resume-privacy-form" onSubmit={handleSubmit} noValidate>
            <p className="resume-privacy-note">{t('resume.privacyNote')}</p>
            <p className="resume-privacy-prompt">{t('resume.unlockPrompt')}</p>

            <label className="resume-privacy-field">
              <span className="visually-hidden">{t('resume.unlockInputLabel')}</span>
              <input
                type="text"
                name="resume-unlock-answer"
                className="resume-privacy-input"
                value={answerInput}
                onChange={(event) => setAnswerInput(event.target.value)}
                placeholder={t('resume.unlockPlaceholder')}
                autoComplete="off"
                spellCheck={false}
                disabled={fading}
              />
            </label>

            {showError ? (
              <p className="resume-privacy-error" role="alert">
                {t('resume.unlockError')}
              </p>
            ) : null}

            <button type="submit" className="resume-privacy-submit" disabled={fading}>
              {t('resume.unlockButton')}
            </button>
          </form>
        </div>
      ) : null}
    </div>
  )
}
