import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/content'
import './Nav.css'

const LEFT = [
  { id: 'work', label: 'Work' },
  { id: 'journey', label: 'Journey' },
]
const RIGHT = [
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [active, setActive] = useState('top')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const onLanding = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!onLanding) return
    const ids = ['top', ...LEFT.map((l) => l.id), ...RIGHT.map((l) => l.id)]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [onLanding, pathname])

  const go = (id) => {
    setOpen(false)
    if (onLanding) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${id}`)
    }
  }

  const renderLink = (l, i, offset = 0) => (
    <button
      key={l.id}
      onClick={() => go(l.id)}
      className={`nav__link ${onLanding && active === l.id ? 'is-active' : ''}`}
    >
      <span className="nav__num">0{i + 1 + offset}</span>
      {l.label}
    </button>
  )

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav__inner">
          {/* LEFT pill */}
          <nav className="nav__pill nav__pill--left" aria-label="Primary left">
            {LEFT.map((l, i) => renderLink(l, i, 0))}
          </nav>

          {/* CENTER brand wordmark — its own taller white pill creates the arched silhouette */}
          <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
            <span className="nav__brand-text">MATHAN</span>
            <span className="nav__brand-sub">{profile.role}</span>
          </Link>

          {/* RIGHT pill */}
          <nav className="nav__pill nav__pill--right" aria-label="Primary right">
            {RIGHT.map((l, i) => renderLink(l, i, 2))}
            <Link
              to="/archive"
              className={`nav__cta ${pathname === '/archive' ? 'is-active' : ''}`}
            >
              Archive <span aria-hidden>↗</span>
            </Link>
            <a
              className="nav__icon"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
                <path
                  fill="currentColor"
                  d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17a10.94 10.94 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.26 5.65.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.55C20.22 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"
                />
              </svg>
            </a>
          </nav>

          {/* Mobile burger sits absolute on small screens */}
          <button
            className="nav__menu"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span className={`nav__burger ${open ? 'is-open' : ''}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__sheet"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {[...LEFT, ...RIGHT].map((l, i) => (
              <button key={l.id} onClick={() => go(l.id)} className="nav__sheet-link">
                <span className="nav__num">0{i + 1}</span>
                {l.label}
              </button>
            ))}
            <Link to="/archive" onClick={() => setOpen(false)} className="nav__sheet-link">
              <span className="nav__num">→</span>
              Archive
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
