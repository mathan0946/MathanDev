import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillClusters } from '../data/content'
import AnimatedHeading from './AnimatedHeading'
import './Skills.css'

export default function Skills() {
  const [active, setActive] = useState(0)

  return (
    <section id="skills" className="section-pad skills">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow">How I think in stacks</span>
          <AnimatedHeading text="Skills, grouped by the job they do." emWords={[4, 5, 6]} />
          <p className="lede">
            Not an alphabet soup of logos — the three layers I reach for when an
            idea needs to become a working system.
          </p>
        </header>

        <div className="skills__stack">
          {skillClusters.map((c, i) => {
            const isOpen = active === i
            return (
              <motion.div
                key={c.role}
                className={`layer ${isOpen ? 'is-open' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="layer__head">
                  <span className="layer__num">L{i + 1}</span>
                  <div className="layer__titles">
                    <h3 className="layer__role">{c.role}</h3>
                    <span className="layer__blurb">{c.blurb}</span>
                  </div>
                  <span className="layer__count">{c.items.length}</span>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="layer__items"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="layer__items-inner">
                        {c.items.map((it, k) => (
                          <motion.span
                            key={it}
                            className="skill-tag"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 + k * 0.03 }}
                          >
                            {it}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
