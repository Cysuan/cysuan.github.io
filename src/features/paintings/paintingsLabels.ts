/**
 * Bilingual copy used on painting cards and in the lightbox.
 */
export type LocalizedLabel = {
  zh: string
  en: string
}

/**
 * @param label - zh/en pair
 * @param language - i18n language code
 */
export function pickLocalized(label: LocalizedLabel, language: string): string {
  return language.startsWith('zh') ? label.zh : label.en
}
