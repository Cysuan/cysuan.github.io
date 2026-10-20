import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { syncDocumentLanguage } from './i18n/config'
import { AesthetePage } from './pages/AesthetePage'
import { PaintingsFullPlaceholder } from './pages/PaintingsFullPlaceholder'

/**
 * Keeps `<title>` / `html lang` aligned with `i18n` after navigation or toggling language.
 */
function DocumentLanguageBinding() {
  const { i18n, t } = useTranslation()

  useEffect(() => {
    syncDocumentLanguage(i18n.language)
    document.title = t('site.pageTitle')
  }, [i18n.language, t])

  return null
}

/**
 * Application routes: `/resume` is the default landing; full archive placeholder at `/paintings/full`.
 */
function App() {
  return (
    <BrowserRouter>
      <DocumentLanguageBinding />
      <Routes>
        <Route path="/" element={<Navigate to="/resume" replace />} />
        <Route path="/resume" element={<AesthetePage />} />
        <Route path="/about" element={<AesthetePage />} />
        <Route path="/paintings/full" element={<PaintingsFullPlaceholder />} />
        <Route path="/paintings" element={<AesthetePage />} />
        <Route path="*" element={<Navigate to="/resume" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
