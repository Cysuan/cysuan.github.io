import type { TFunction } from 'i18next'
import { type ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BehindStoryGallery } from './BehindStoryGallery'
import { ResumeBehindSortSwitch } from './ResumeBehindSortSwitch'
import { DualLayerStack } from './ResumeBehindCv'
import { ResumeDogEarDock } from './ResumeDogEarDock'
import { ResumeEntryReorderGroup } from './ResumeEntryReorderGroup'
import './resumeSection.css'
import {
  RESUME_EDUCATION_DEFAULT_ORDER,
  RESUME_EDUCATION_TIMELINE_ORDER,
  RESUME_EXPERIENCE_DEFAULT_ORDER,
  RESUME_EXPERIENCE_TIMELINE_ORDER,
  type ResumeBehindSortMode,
  type ResumeEducationItem,
  type ResumeExperienceItem,
} from './resumeData'
import {
  getBehindStoryGallery,
  getBehindStoryParagraphs,
  getRichParagraphs,
  getTitleSegments,
  getWorkBlocks,
  RichParagraph,
  type ResumeRichSegment,
} from './resumeRich'

/**
 * Reads string array from i18n JSON.
 *
 * @param t - i18n translate function
 * @param key - Full translation key
 */
function getStringArray(t: TFunction, key: string): readonly string[] {
  const raw = t(key, { returnObjects: true })
  return Array.isArray(raw) ? (raw as string[]) : []
}

/**
 * Reads experience tag labels for current language.
 *
 * @param id - Experience entry id
 * @param t - i18n translate function
 */
function getExperienceTags(id: string, t: TFunction): readonly string[] {
  return getStringArray(t, `resume.entries.experience.${id}.tags`)
}

/**
 * 履历页：全局「简历背后」状态；左侧时间/地点固定，仅右侧列 A/B 切换。
 */
export function ResumeSection() {
  const { t } = useTranslation()
  const [behindOpen, setBehindOpen] = useState(false)
  const [behindSortMode, setBehindSortMode] = useState<ResumeBehindSortMode>('default')

  const behindLabel = t('resume.behindCv.button')
  const behindTooltip = t('resume.behindCv.buttonTooltip')
  const openBehind = () => setBehindOpen(true)

  /** 关闭 B 层并恢复默认排序，下次进入背后叙事时从默认顺序开始 */
  const closeBehind = () => {
    setBehindOpen(false)
    setBehindSortMode('default')
  }

  const educationOrder =
    behindOpen && behindSortMode === 'timeline'
      ? RESUME_EDUCATION_TIMELINE_ORDER
      : RESUME_EDUCATION_DEFAULT_ORDER

  const experienceOrder =
    behindOpen && behindSortMode === 'timeline'
      ? RESUME_EXPERIENCE_TIMELINE_ORDER
      : RESUME_EXPERIENCE_DEFAULT_ORDER

  /**
   * 分区 kicker：B 层「回到简历」；仅教育首行右侧带排序切换。
   *
   * @param aLayerKickerKey - A 层 kicker 文案 key
   * @param showSortSwitch - 是否在右侧展示排序切换（仅教育首行）
   */
  function renderSectionKicker(aLayerKickerKey: string, showSortSwitch = false) {
    if (behindOpen) {
      return (
        <div
          className={[
            'resume-kicker-row',
            showSortSwitch ? 'resume-kicker-row--split' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <button
            type="button"
            className="resume-kicker"
            aria-expanded={behindOpen}
            onClick={closeBehind}
          >
            {t('resume.behindCv.backToCv')}
          </button>
          {showSortSwitch ? (
            <ResumeBehindSortSwitch mode={behindSortMode} onModeChange={setBehindSortMode} />
          ) : null}
        </div>
      )
    }
    return (
      <div className="resume-kicker-row">
        <div className="resume-kicker">{t(aLayerKickerKey)}</div>
      </div>
    )
  }

  /**
   * 工作经历主标题（与 A 层一致，含外链片段）。
   *
   * @param expId - 经历 id
   * @param titleSegments - 富文本标题片段，无则回退 `title` 字段
   */
  function renderExperienceTitle(expId: string, titleSegments: readonly ResumeRichSegment[] | null) {
    return (
      <h2 className="resume-entry-title">
        {titleSegments
          ? titleSegments.map((s, i) =>
              s.type === 'link' ? (
                <a
                  key={`${expId}-tl-${i}`}
                  href={s.href}
                  className="resume-title-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.text}
                </a>
              ) : (
                <span key={`${expId}-tl-${i}`}>{s.text}</span>
              ),
            )
          : t(`resume.entries.experience.${expId}.title`)}
      </h2>
    )
  }

  /**
   * 教育背景 B 层抬头：仅学校/专业（不展示学位行）。
   *
   * @param eduId - 教育条目 id
   */
  function renderEducationBehindHeader(eduId: string) {
    return (
      <h2 className="resume-entry-title">{t(`resume.entries.education.${eduId}.degree`)}</h2>
    )
  }

  /**
   * B 层：保留条目抬头 + 背后叙事段落。
   *
   * @param kind - 教育或工作经历
   * @param id - 条目 id
   * @param header - 与 A 层一致的 title / 学历信息
   */
  function renderBehindBack(
    kind: 'education' | 'experience',
    id: string,
    header: ReactNode,
  ) {
    const paragraphs = getBehindStoryParagraphs(t, kind, id)
    const gallery = getBehindStoryGallery(t, kind, id)
    return (
      <>
        <div className="resume-behind-header">{header}</div>
        <div className="resume-behind-stack">
          <div className="resume-behind-body">
          {paragraphs.map((p, i) =>
            typeof p === 'string' ? (
              <p key={`behind-${kind}-${id}-${i}`}>{p}</p>
            ) : (
              <RichParagraph
                key={`behind-${kind}-${id}-${i}`}
                paraKey={`behind-${kind}-${id}-${i}`}
                segments={p}
                className="resume-behind-body-line"
              />
            ),
          )}
        </div>
        {gallery.length > 0 ? (
          <BehindStoryGallery
            images={gallery}
            labels={{
              stripAria: t('resume.behindCv.galleryUi.stripAria'),
              lightboxAria: t('resume.behindCv.galleryUi.lightboxAria'),
              prev: t('resume.behindCv.galleryUi.prev'),
              next: t('resume.behindCv.galleryUi.next'),
              close: t('resume.behindCv.galleryUi.close'),
            }}
            />
          ) : null}
        </div>
      </>
    )
  }

  /**
   * @param item - 教育条目
   */
  function renderEducationEntry(item: ResumeEducationItem) {
    const paraKey = `resume.entries.education.${item.id}.bodyParagraphs`
    const richParas = getRichParagraphs(t, paraKey)
    const plainLines =
      richParas.length > 0 ? [] : getStringArray(t, `resume.entries.education.${item.id}.bodyLines`)

    return (
      <article key={item.id} data-resume-entry-id={item.id} className="resume-entry">
        <div className="resume-entry-left">
          <p className="resume-range">{t(`resume.entries.education.${item.id}.range`)}</p>
          <p className="resume-location">{t(`resume.entries.education.${item.id}.location`)}</p>
        </div>
        <div className="resume-entry-right min-w-0">
          <DualLayerStack
            id={`resume-dual-edu-${item.id}`}
            active={behindOpen}
            front={
              <>
                <h2 className="resume-entry-title">{t(`resume.entries.education.${item.id}.degree`)}</h2>
                <p className="resume-entry-org">{t(`resume.entries.education.${item.id}.school`)}</p>
                <div className="resume-entry-body-stack">
                  {richParas.length > 0
                    ? richParas.map((segments, i) => (
                        <RichParagraph
                          key={`${item.id}-rp-${i}`}
                          paraKey={`${item.id}-${i}`}
                          segments={segments}
                        />
                      ))
                    : plainLines.map((line, i) => (
                        <p key={`${item.id}-line-${i}`} className="resume-entry-body-line">
                          {line}
                        </p>
                      ))}
                </div>
              </>
            }
            back={renderBehindBack('education', item.id, renderEducationBehindHeader(item.id))}
          />
        </div>
      </article>
    )
  }

  /**
   * @param item - 工作经历条目
   */
  function renderExperienceEntry(item: ResumeExperienceItem) {
    const tags = getExperienceTags(item.id, t)
    const workBlocks = getWorkBlocks(t, item.id)
    const titleSegments = getTitleSegments(t, item.id)

    return (
      <article key={item.id} data-resume-entry-id={item.id} className="resume-entry">
        <div className="resume-entry-left">
          <p className="resume-range">{t(`resume.entries.experience.${item.id}.range`)}</p>
          <p className="resume-location">{t(`resume.entries.experience.${item.id}.location`)}</p>
        </div>
        <div className="resume-entry-right min-w-0">
          <DualLayerStack
            id={`resume-dual-exp-${item.id}`}
            active={behindOpen}
            front={
              <>
                {renderExperienceTitle(item.id, titleSegments)}
                <div className="resume-work-blocks">
                  {workBlocks.map((block, i) => (
                    <div key={`${item.id}-wb-${i}`} className="resume-work-block">
                      <p className="resume-work-block-heading">{block.heading}</p>
                      {block.bodyParagraphs && block.bodyParagraphs.length > 0 ? (
                        <div className="resume-work-block-body-stack">
                          {block.bodyParagraphs.map((segments, pi) => (
                            <RichParagraph
                              key={`${item.id}-wb-${i}-p-${pi}`}
                              paraKey={`${item.id}-wb-${i}-p-${pi}`}
                              segments={segments}
                              className="resume-work-block-body-line"
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="resume-work-block-body">{block.body}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="resume-tag-row" aria-label={t('resume.tagsAria')}>
                  {tags.map((tag, i) => (
                    <span key={`${item.id}-tag-${i}`}>{tag}</span>
                  ))}
                </div>
              </>
            }
            back={renderBehindBack('experience', item.id, renderExperienceTitle(item.id, titleSegments))}
          />
        </div>
      </article>
    )
  }

  return (
    <div className="resume-viewport" aria-label={t('resume.sectionAria')}>
      <div className="resume-stack">
        <main className="resume-main">
          <section
            id="resume-education"
            className="resume-section-block resume-fold-root"
            aria-label={t('resume.sections.education')}
          >
            <div className="resume-section-front resume-page-front-clip">
              {renderSectionKicker('resume.kicker.academic', true)}

              <ResumeEntryReorderGroup
                orderKey={educationOrder.map((e) => e.id).join(',')}
              >
                {educationOrder.map((item) => renderEducationEntry(item))}
              </ResumeEntryReorderGroup>
            </div>
            <ResumeDogEarDock
              hidden={behindOpen}
              onOpen={openBehind}
              label={behindLabel}
              tooltip={behindTooltip}
            />
          </section>

          <section
            id="resume-professional"
            className="resume-section-block resume-fold-root"
            aria-label={t('resume.sections.professional')}
          >
            <div className="resume-section-front resume-page-front-clip">
              {renderSectionKicker('resume.kicker.professional')}

              <ResumeEntryReorderGroup
                orderKey={experienceOrder.map((e) => e.id).join(',')}
              >
                {experienceOrder.map((item) => renderExperienceEntry(item))}
              </ResumeEntryReorderGroup>
            </div>
            <ResumeDogEarDock
              hidden={behindOpen}
              onOpen={openBehind}
              label={behindLabel}
              tooltip={behindTooltip}
            />
          </section>
        </main>
      </div>
    </div>
  )
}
