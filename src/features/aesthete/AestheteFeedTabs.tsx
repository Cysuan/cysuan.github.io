import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'

type TabSpec = {
  id: 'resume' | 'about' | 'paintings'
  to: string
}

const PAINTINGS_EXTERNAL_URL = 'https://www.xuanpaints.com'

const TABS: TabSpec[] = [
  { id: 'resume', to: '/resume' },
  { id: 'about', to: '/about' },
  { id: 'paintings', to: '/paintings' },
]

const TAB_KEYS: Record<TabSpec['id'], 'tabs.resume' | 'tabs.about' | 'tabs.paintings'> = {
  resume: 'tabs.resume',
  about: 'tabs.about',
  paintings: 'tabs.paintings',
}

/** @param pathname - Active location pathname */
function isTabActive(tabId: TabSpec['id'], pathname: string): boolean {
  if (tabId === 'resume') return pathname === '/resume'
  if (tabId === 'about') return pathname === '/about'
  return pathname === '/paintings' || pathname.startsWith('/paintings/')
}

/**
 * Primary navigation underline tabs (paths Latin; hashes pair with scroll targets).
 */
export function AestheteFeedTabs() {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <div className="tabs-container">
      {TABS.map((tab) =>
        tab.id === 'paintings' ? (
          <a
            key={tab.id}
            href={PAINTINGS_EXTERNAL_URL}
            className="tab"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t(TAB_KEYS[tab.id])}
          </a>
        ) : (
          <NavLink
            key={tab.id}
            to={tab.to}
            className={({ isActive }) =>
              `tab${isTabActive(tab.id, pathname) || isActive ? ' active' : ''}`
            }
          >
            {t(TAB_KEYS[tab.id])}
          </NavLink>
        ),
      )}
    </div>
  )
}
