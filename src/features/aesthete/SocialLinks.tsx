import { useTranslation } from 'react-i18next'
import { SocialXIcon } from './SocialXIcon'
import { SOCIAL_ROW_ITEMS } from './socialRowConfig'

function MailIcon() {
  return (
    <svg
      className="social-mail-glyph"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M20 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 2v.01L12 13 4 8.01V8h16ZM4 18V10.2l7.4 4.63a1 1 0 0 0 1.2 0L20 10.2V18H4Z"
      />
    </svg>
  )
}

/**
 * Renders the social list with a shared icon frame (X glyph or brand PNG) and label.
 */
export function SocialLinks() {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language.startsWith('zh')

  return (
    <div className="author-social-row">
      {SOCIAL_ROW_ITEMS.map((item) => {
        const label = t(item.labelKey)

        const icon =
          item.kind === 'x' ? (
            <SocialXIcon className="social-x-glyph" />
          ) : (
            <img
              src={item.iconSrc}
              alt=""
              width={20}
              height={20}
              loading="lazy"
              decoding="async"
            />
          )

        const body = (
          <>
            <span className="social-icon-slot" aria-hidden="true">
              {icon}
            </span>
            <span className="social-label">{label}</span>
          </>
        )

        if (item.href) {
          return (
            <a
              key={item.id}
              href={item.href}
              className="social-chip social-chip--link"
              target="_blank"
              rel="noreferrer noopener"
              aria-label={t(item.ariaKey)}
            >
              {body}
            </a>
          )
        }

        return (
          <span key={item.id} className="social-chip social-chip--static">
            {body}
          </span>
        )
      })}

      {isZh ? (
        <span className="social-chip social-chip--wechat" tabIndex={0}>
          <span className="social-icon-slot" aria-hidden="true">
            <img
              src="/social/icon-wechat.png"
              alt=""
              width={20}
              height={20}
              loading="lazy"
              decoding="async"
            />
          </span>
          <span className="social-label">扫码加好友</span>
          <span className="social-wechat-pop" aria-hidden="true">
            <img
              src="/social/wechat-qr.png"
              alt=""
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
            />
          </span>
        </span>
      ) : (
        <a
          className="social-chip social-chip--link"
          href="mailto:caisiyuanabi@163.com"
          aria-label="Reach out and be friends"
        >
          <span className="social-icon-slot" aria-hidden="true">
            <MailIcon />
          </span>
          <span className="social-label">Reach out and be friends</span>
        </a>
      )}
    </div>
  )
}
