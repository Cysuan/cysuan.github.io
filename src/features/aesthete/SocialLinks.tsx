/** Contacts remain visually masked while the public résumé is unavailable. */
export function SocialLinks() {
  return (
    <div className="author-social-row author-social-row--locked" aria-hidden="true" inert>
      {Array.from({ length: 5 }, (_, index) => (
        <span className="social-private-placeholder" key={index} />
      ))}
    </div>
  )
}
