import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects } from '../data/content'
import AnimatedHeading from './AnimatedHeading'
import './Work.css'

/* Abstract visual per project — pure CSS/SVG, themed by tone. */
function ProjectVisual({ tone, accuracy, accuracyLabel }) {
  return (
    <div className={`pv pv--${tone}`}>
      <div className="pv__canvas">
        {tone === 'field' && (
          <svg viewBox="0 0 200 200" className="pv__svg" aria-hidden>
            {Array.from({ length: 6 }).map((_, r) =>
              Array.from({ length: 6 }).map((_, c) => (
                <circle
                  key={`${r}-${c}`}
                  cx={20 + c * 32}
                  cy={20 + r * 32}
                  r={(r + c) % 4 === 0 ? 9 : 4}
                  className={(r + c) % 4 === 0 ? 'pv__dot pv__dot--hot' : 'pv__dot'}
                />
              ))
            )}
          </svg>
        )}

        {tone === 'paper' && (
          <div className="pv__lines" aria-hidden>
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} style={{ width: `${40 + ((i * 37) % 55)}%` }} />
            ))}
          </div>
        )}

        {tone === 'voice' && (
          <div className="pv__wave" aria-hidden>
            {Array.from({ length: 22 }).map((_, i) => (
              <span key={i} style={{ '--i': i }} />
            ))}
          </div>
        )}

        {tone === 'health' && (
          <svg viewBox="0 0 200 100" className="pv__svg pv__ecg" aria-hidden>
            <path
              d="M0 50 H55 L65 50 L72 22 L82 78 L92 50 L100 50 L108 38 L116 50 H200"
              fill="none"
            />
          </svg>
        )}

        {tone === 'logic' && (
          <svg viewBox="0 0 200 140" className="pv__svg pv__graph" aria-hidden>
            <line x1="40" y1="70" x2="100" y2="35" />
            <line x1="40" y1="70" x2="100" y2="105" />
            <line x1="100" y1="35" x2="160" y2="70" />
            <line x1="100" y1="105" x2="160" y2="70" />
            <line x1="100" y1="35" x2="100" y2="105" />
            {[[40, 70], [100, 35], [100, 105], [160, 70]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="13" className={i === 3 ? 'pv__node pv__node--accept' : 'pv__node'} />
            ))}
          </svg>
        )}

        {tone === 'signal' && (
          <div className="pv__candles" aria-hidden>
            {Array.from({ length: 14 }).map((_, i) => {
              const h = 25 + ((i * 53) % 60)
              const up = i % 3 !== 0
              return (
                <span
                  key={i}
                  className={up ? 'up' : 'down'}
                  style={{ height: `${h}%`, marginTop: `${(100 - h) * (i % 2 ? 0.4 : 0.6)}%` }}
                />
              )
            })}
          </div>
        )}

        {tone === 'metal' && (
          <div className="pv__pixels" aria-hidden>
            {Array.from({ length: 64 }).map((_, i) => (
              <span key={i} style={{ opacity: 0.15 + ((i * 7) % 9) / 12 }} />
            ))}
          </div>
        )}
      </div>

      <div className="pv__stat">
        <span className="pv__stat-value">{accuracy}</span>
        <span className="pv__stat-label">{accuracyLabel}</span>
      </div>
    </div>
  )
}

/* Card optimized for horizontal pin-scroll: visual on top, copy below. */
function ProjectCard({ p, i, total }) {
  return (
    <article className="hcard" data-index={String(i + 1).padStart(2, '0')}>
      <div className="hcard__visual">
        <ProjectVisual tone={p.tone} accuracy={p.accuracy} accuracyLabel={p.accuracyLabel} />
      </div>
      <div className="hcard__body">
        <div className="hcard__meta">
          <span className="hcard__index">{p.index}</span>
          <span className="hcard__counter">{String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <span className="hcard__year">{p.year}</span>
        </div>
        <h3 className="hcard__title">{p.title}</h3>
        <p className="hcard__subtitle">{p.subtitle}</p>
        <p className="hcard__summary">{p.summary}</p>
        <div className="hcard__foot">
          <div className="hcard__stack">
            {p.stack.slice(0, 5).map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>
          <a className="project__link" href={p.url} target="_blank" rel="noreferrer">
            View repo <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </article>
  )
}

/* Vertical fallback used on small screens. */
function ProjectVertical({ p, i }) {
  const flipped = i % 2 === 1
  return (
    <motion.article
      className={`project ${flipped ? 'project--flip' : ''}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project__visual">
        <ProjectVisual tone={p.tone} accuracy={p.accuracy} accuracyLabel={p.accuracyLabel} />
      </div>
      <div className="project__body">
        <div className="project__meta">
          <span className="project__index">{p.index}</span>
          <span className="project__year">{p.year}</span>
        </div>
        <h3 className="project__title">{p.title}</h3>
        <p className="project__subtitle">{p.subtitle}</p>
        <p className="project__summary">{p.summary}</p>
        <ul className="project__points">
          {p.points.map((pt, idx) => <li key={idx}>{pt}</li>)}
        </ul>
        <div className="project__foot">
          <div className="project__stack">
            {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
          </div>
          <a className="project__link" href={p.url} target="_blank" rel="noreferrer">
            View repo <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

/* Horizontal pin-scroll track. Outer height = N * 100vh; inner sticks
   and translates horizontally so vertical scroll feels like swipe. */
function HorizontalWork({ items }) {
  const outerRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const update = () => {
      if (!trackRef.current) return
      const trackW = trackRef.current.scrollWidth
      const vw = window.innerWidth
      setDistance(Math.max(0, trackW - vw))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [items.length])

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={outerRef}
      className="hwork"
      style={{ height: `${(items.length + 0.5) * 100}vh` }}
      aria-label="Selected projects, horizontal scroll"
    >
      <div className="hwork__sticky">
        <div className="hwork__hud">
          <span className="hwork__hud-label">SCROLL TO ADVANCE</span>
          <div className="hwork__hud-bar"><motion.span style={{ width: progress }} /></div>
        </div>
        <motion.div ref={trackRef} className="hwork__track" style={{ x }}>
          {items.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} total={items.length} />
          ))}
          <div className="hwork__end">
            <span className="eyebrow">END · 03 / 03</span>
            <p>Keep scrolling — there's more below.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Work() {
  const major = projects.filter((p) => p.major)
  const [horizontal, setHorizontal] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const update = () => setHorizontal(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <section id="work" className="section-pad work">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow">Selected work</span>
          <AnimatedHeading
            text="Three flagship systems, three real-world problems."
            emWords={[5, 6]}
          />
          <p className="lede">
            The work I’m proudest of — each one shipped, each one solving something
            that actually matters. The rest live in the full archive.
          </p>
        </header>
      </div>

      {horizontal ? (
        <HorizontalWork items={major} />
      ) : (
        <div className="container work__list">
          {major.map((p, i) => <ProjectVertical key={p.id} p={p} i={i} />)}
        </div>
      )}

      <div className="container work__cta">
        <Link to="/archive" className="work__archive-btn">
          <span className="work__archive-text">
            <span className="work__archive-label">Explore the full archive</span>
            <span className="work__archive-sub">30+ projects across AI, web, data &amp; systems</span>
          </span>
          <span className="work__archive-arrow" aria-hidden>→</span>
        </Link>
      </div>
    </section>
  )
}
