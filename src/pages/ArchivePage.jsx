import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { archive, archiveCategories, projects, profile } from '../data/content'
import './ArchivePage.css'

const langColor = {
  Python: '#4b7fb0',
  TypeScript: '#5a93d4',
  JavaScript: '#e0b84b',
  Java: '#d98b5f',
  C: '#9bb07e',
  'C++': '#c08bb0',
  Jupyter: '#f0934b',
  HTML: '#e07a4b',
  Android: '#8bc34a',
  Cloud: '#6fa8d4',
}

// Pull featured projects into the archive list too, so the page is complete.
const featuredAsArchive = projects.map((p) => ({
  name: p.title,
  cat: 'AI / ML',
  lang: p.stack[0],
  desc: p.summary,
  url: p.url,
  tags: p.stack.slice(1, 3),
  featured: true,
}))

const allItems = [...featuredAsArchive, ...archive]

export default function ArchivePage() {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  const counts = useMemo(() => {
    const c = { All: allItems.length }
    allItems.forEach((a) => { c[a.cat] = (c[a.cat] || 0) + 1 })
    return c
  }, [])

  const visible = allItems.filter((a) => {
    const okCat = filter === 'All' || a.cat === filter
    const okQ =
      !query ||
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.desc.toLowerCase().includes(query.toLowerCase()) ||
      a.tags.join(' ').toLowerCase().includes(query.toLowerCase())
    return okCat && okQ
  })

  return (
    <motion.main
      className="apage"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
    >
      <div className="container">
        {/* Header */}
        <header className="apage__head">
          <Link to="/" className="apage__back">
            <span aria-hidden>←</span> Back home
          </Link>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            The full archive
          </motion.span>
          <motion.h1
            className="apage__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            Everything I’ve <em className="gradient-text">built &amp; shipped</em>.
          </motion.h1>
          <motion.p
            className="apage__lede"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            {allItems.length}+ public repositories across AI, web, data and systems.
            Search or filter to find your way in.
          </motion.p>
        </header>

        {/* Controls */}
        <div className="apage__controls">
          <LayoutGroup>
            <div className="apage__filters" role="tablist" aria-label="Filter projects">
              {archiveCategories.map((cat) => {
                const active = filter === cat
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={active}
                    className={`fchip ${active ? 'is-active' : ''}`}
                    onClick={() => setFilter(cat)}
                  >
                    {active && (
                      <motion.span
                        layoutId="apage-fchip"
                        className="fchip__bg"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="fchip__label">{cat}</span>
                    <span className="fchip__count">{counts[cat] ?? 0}</span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>

          <label className="apage__search">
            <span aria-hidden className="apage__search-icon">⌕</span>
            <input
              type="search"
              placeholder="Search projects…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search projects"
            />
          </label>
        </div>

        {/* Grid */}
        <LayoutGroup>
          <motion.div layout className="apage__grid">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <motion.a
                  key={p.name}
                  layout
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`rcard ${p.featured ? 'rcard--featured' : ''}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -7 }}
                >
                  {p.featured && <span className="rcard__star" aria-hidden>★ Featured</span>}
                  <div className="rcard__top">
                    <span
                      className="rcard__lang"
                      style={{ '--lc': langColor[p.lang] || 'var(--ink-faint)' }}
                    >
                      <span className="rcard__lang-dot" />
                      {p.lang}
                    </span>
                    <span className="rcard__arrow" aria-hidden>↗</span>
                  </div>
                  <h3 className="rcard__name">{p.name}</h3>
                  <p className="rcard__desc">{p.desc}</p>
                  <div className="rcard__tags">
                    {p.tags.map((t) => (
                      <span key={t} className="rcard__tag">{t}</span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {visible.length === 0 && (
          <p className="apage__empty">No projects match “{query}”. Try another search.</p>
        )}

        <div className="apage__foot">
          <a href={profile.github} target="_blank" rel="noreferrer" className="apage__ghlink">
            See all repositories on GitHub <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </motion.main>
  )
}
