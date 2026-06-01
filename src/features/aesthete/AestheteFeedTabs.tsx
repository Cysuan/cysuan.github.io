import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'

type TabSpec = {
  id: 'resume' | 'about' | 'paintings'
  to: string | { pathname: string; hash?: string }
}

const TABS: TabSpec[] = [
  /** Hash aligns with `#resume` for in-page anchor after navigation. */
  { id: 'resume', to: { pathname: '/resume', hash: 'resume' } },
  { id: 'about', to: { pathname: '/about', hash: 'about' } },
  { id: 'paintings', to: { pathname: '/paintings', hash: 'paintings' } },
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
      {TABS.map((tab) => (
        <NavLink
          key={tab.id}
          to={tab.to}
          className={({ isActive }) =>
            `tab${isTabActive(tab.id, pathname) || isActive ? ' active' : ''}`
          }
        >
          {t(TAB_KEYS[tab.id])}
        </NavLink>
      ))}
    </div>
  )
}
