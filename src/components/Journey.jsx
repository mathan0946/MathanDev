import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { journey, achievements } from '../data/content'
import AnimatedHeading from './AnimatedHeading'
import './Journey.css'

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Journey() {
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 60%'],
  })
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 })

  return (
    <section id="journey" className="section-pad journey">
      <div className="container journey__grid">
        {/* Left: education spine */}
        <div className="journey__main">
          <header className="section-head">
            <span className="eyebrow">The journey</span>
            <AnimatedHeading text="Still early, already building." emWords={[1]} />
          </header>

          <ol className="timeline" ref={timelineRef}>
            <motion.span className="timeline__progress" style={{ scaleY: lineScale }} aria-hidden />
            {journey.map((j, i) => (
              <motion.li
                key={i}
                className={`timeline__item ${j.now ? 'is-now' : ''}`}
                custom={i}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
              >
                <div className="timeline__node">
                  <span className="timeline__dot" />
                  {j.now && <span className="timeline__pulse" />}
                </div>
                <div className="timeline__content">
                  <div className="timeline__top">
                    <span className="timeline__period">{j.period}</span>
                    {j.now && <span className="timeline__badge">Now</span>}
                  </div>
                  <h3 className="timeline__title">{j.title}</h3>
                  <p className="timeline__place">{j.place}</p>
                  <span className="timeline__detail">{j.detail}</span>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Right: achievement notes, offset for asymmetry */}
        <aside className="journey__aside">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              className="note"
              initial={{ opacity: 0, y: 24, rotate: i % 2 ? 1.2 : -1.2 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 0.8 : -0.8 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="note__pin" aria-hidden />
              <h4 className="note__headline">{a.headline}</h4>
              <p className="note__body">{a.body}</p>
            </motion.div>
          ))}
        </aside>
      </div>
    </section>
  )
}
