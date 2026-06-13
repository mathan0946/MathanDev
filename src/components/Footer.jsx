import { Link } from 'react-router-dom'
import { profile } from '../data/content'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__mark">MG</span>
          <div>
            <p className="footer__name">{profile.name}</p>
            <p className="footer__tag">{profile.role} · {profile.location}</p>
          </div>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/archive">Archive</Link>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </nav>
      </div>

      <div className="container footer__base">
        <span>© 2026 {profile.name}</span>
        <span className="footer__built">
          Designed &amp; built from scratch — React, Framer Motion, far too much coffee.
        </span>
      </div>
    </footer>
  )
}
