import { useRef } from 'react'
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

function Project({ p, i }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const flipped = i % 2 === 1

  return (
    <motion.article
      ref={ref}
      className={`project ${flipped ? 'project--flip' : ''}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="project__visual" style={{ y }}>
        <ProjectVisual tone={p.tone} accuracy={p.accuracy} accuracyLabel={p.accuracyLabel} />
      </motion.div>

      <div className="project__body">
        <div className="project__meta">
          <span className="project__index">{p.index}</span>
          <span className="project__year">{p.year}</span>
        </div>
        <h3 className="project__title">{p.title}</h3>
        <p className="project__subtitle">{p.subtitle}</p>
        <p className="project__summary">{p.summary}</p>

        <ul className="project__points">
          {p.points.map((pt, idx) => (
            <li key={idx}>{pt}</li>
          ))}
        </ul>

        <div className="project__foot">
          <div className="project__stack">
            {p.stack.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>
          <a className="project__link" href={p.url} target="_blank" rel="noreferrer">
            View repo <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Work() {
  const major = projects.filter((p) => p.major)
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

      <div className="container work__list">
        {major.map((p, i) => (
          <Project key={p.id} p={p} i={i} />
        ))}
      </div>

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
