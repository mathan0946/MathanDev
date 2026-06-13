import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/content'
import './Nav.css'

const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'journey', label: 'Journey' },
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
    const ids = ['top', ...SECTIONS.map((l) => l.id)]
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

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container nav__inner">
          <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
            <span className="nav__mark">MG</span>
            <span className="nav__name">{profile.shortName}</span>
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {SECTIONS.map((l, i) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`nav__link ${onLanding && active === l.id ? 'is-active' : ''}`}
              >
                <span className="nav__num">0{i + 1}</span>
                {l.label}
              </button>
            ))}
            <Link
              to="/archive"
              className={`nav__link nav__link--cta ${pathname === '/archive' ? 'is-active' : ''}`}
            >
              Archive
            </Link>
          </nav>

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
            {SECTIONS.map((l, i) => (
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
