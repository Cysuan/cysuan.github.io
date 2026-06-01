/**
 * Resume structural ids only. Copy in `src/locales/{en,zh}.json` under `resume.entries`.
 */
export interface ResumeExperienceItem {
  id: string
}

export interface ResumeEducationItem {
  id: string
}

export interface ResumeModel {
  education: readonly ResumeEducationItem[]
  experience: readonly ResumeExperienceItem[]
}

export const RESUME_MODEL: ResumeModel = {
  education: [{ id: 'edu-02' }, { id: 'edu-01' }],
  experience: [{ id: 'exp-04' }, { id: 'exp-02' }],
}

/** B 层「默认顺序」：与 A 层展示一致 */
export const RESUME_EDUCATION_DEFAULT_ORDER = RESUME_MODEL.education
export const RESUME_EXPERIENCE_DEFAULT_ORDER = RESUME_MODEL.experience

/** B 层「按时间线排序」：由早到晚 */
export const RESUME_EDUCATION_TIMELINE_ORDER: readonly ResumeEducationItem[] = [
  { id: 'edu-01' },
  { id: 'edu-02' },
]

export const RESUME_EXPERIENCE_TIMELINE_ORDER: readonly ResumeExperienceItem[] = [
  { id: 'exp-02' },
  { id: 'exp-04' },
]

export type ResumeBehindSortMode = 'default' | 'timeline'
