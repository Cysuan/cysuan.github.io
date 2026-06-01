/**
 * Site-wide footer — copy is fixed (not locale-dependent) per product spec.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-line site-footer-line--primary">&copy; 2026 Siyuan</p>
        <p className="site-footer-line site-footer-line--muted">
          Designed & vibe coded with Cursor &times; Variant.
        </p>
      </div>
    </footer>
  )
}
