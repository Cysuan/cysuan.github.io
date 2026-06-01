/**
 * Social row below the profile bio: each entry has i18n keys; X uses inline SVG, others use `/public/social` PNGs.
 */

type XItem = {
  id: 'x'
  href: string
  labelKey: 'social.row.x'
  ariaKey: 'social.aria.x'
  kind: 'x'
}

type PngItem = {
  id: 'jike' | 'xiaohongshu' | 'bonjour'
  href: string | null
  labelKey: 'social.row.jike' | 'social.row.xiaohongshu' | 'social.row.bonjour'
  ariaKey: 'social.aria.jike' | 'social.aria.xiaohongshu' | 'social.aria.bonjour'
  kind: 'png'
  iconSrc: string
}

export type SocialRowItem = XItem | PngItem

/** Display order; `bonjour` is text-only (no `href`). */
export const SOCIAL_ROW_ITEMS: SocialRowItem[] = [
  {
    id: 'x',
    kind: 'x',
    href: 'https://x.com/siuan_c',
    labelKey: 'social.row.x',
    ariaKey: 'social.aria.x',
  },
  {
    id: 'jike',
    kind: 'png',
    href: 'https://web.okjike.com/u/43ee2c34-9ea0-4ced-ae22-3d59d74cb061',
    labelKey: 'social.row.jike',
    ariaKey: 'social.aria.jike',
    iconSrc: '/social/icon-jike.png',
  },
  {
    id: 'xiaohongshu',
    kind: 'png',
    href: 'https://www.xiaohongshu.com/user/profile/6000072c0000000001001943',
    labelKey: 'social.row.xiaohongshu',
    ariaKey: 'social.aria.xiaohongshu',
    iconSrc: '/social/icon-xiaohongshu.png',
  },
  {
    id: 'bonjour',
    kind: 'png',
    href: null,
    labelKey: 'social.row.bonjour',
    ariaKey: 'social.aria.bonjour',
    iconSrc: '/social/icon-bonjour.png',
  },
]
