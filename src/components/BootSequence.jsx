import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './BootSequence.css'

const LINES = [
  '> handshake / portfolio.kernel ............ ok',
  '> mounting /30+ projects .................. ok',
  '> calibrating cursor ...................... ok',
  '> warming manifesto.txt ................... ok',
  '> ready_',
]

const DURATION = 2400 // ms — total counting time
const HEX = Array.from({ length: 60 }, (_, i) =>
  ((i * 53 + 19) & 0xff).toString(16).padStart(2, '0').toUpperCase()
)

const pad = (n) => String(n).padStart(3, '0')

export default function BootSequence({ onComplete }) {
  const [count, setCount] = useState(0)
  const [visibleLines, setVisibleLines] = useState(0)
  const [glitch, setGlitch] = useState(false)
  const [open, setOpen] = useState(true)
  const startRef = useRef(0)

  // Freeze scroll + hide chrome (nav/footer) while booting
  useEffect(() => {
    const lenis = window.__lenis
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('is-booting')
    lenis?.stop?.()
    return () => {
      document.body.style.overflow = prev
      document.body.classList.remove('is-booting')
      lenis?.start?.()
    }
  }, [])

  // Counter (easeOutCubic) + type-on line reveal
  useEffect(() => {
    let raf = 0
    startRef.current = performance.now()
    const tick = (t) => {
      const elapsed = t - startRef.current
      const p = Math.min(1, elapsed / DURATION)
      const eased = 1 - Math.pow(1 - p, 3)
      const n = Math.floor(eased * 100)
      setCount(n)
      setVisibleLines(Math.min(LINES.length, Math.floor((n / 100) * LINES.length) + (n >= 100 ? 1 : 0)))
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        setCount(100)
        setVisibleLines(LINES.length)
        setGlitch(true)
        // Glitch, then collapse into the phone position
        setTimeout(() => setOpen(false), 520)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const onExitComplete = () => onComplete?.()

  // Tens scramble during the run for that broken-terminal feel
  const display = pad(count)

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {open && (
        <motion.div
          className={`boot${glitch ? ' boot--glitch' : ''}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
          role="status"
          aria-live="polite"
        >
          {/* Layered FX */}
          <span className="boot__grid" aria-hidden />
          <span className="boot__noise" aria-hidden />
          <span className="boot__scan" aria-hidden />
          <span className="boot__vignette" aria-hidden />

          {/* HUD corners */}
          <div className="boot__hud boot__hud--tl">
            <span className="boot__dot" /> MATHANA.OS · v01
          </div>
          <div className="boot__hud boot__hud--tr">
            SEQ · 0001<br />
            <span className="boot__hud-dim">PORTFOLIO / 2026</span>
          </div>
          <div className="boot__hud boot__hud--bl">
            <span className="boot__hud-dim">SIGNAL</span>
            <span className="boot__signal"><i /><i /><i /><i /></span>
          </div>
          <div className="boot__hud boot__hud--br">
            BOOT-SEQ <span className="boot__hud-strong">ACTIVE</span>
          </div>

          {/* Hex side stream */}
          <motion.div
            className="boot__hex"
            initial={{ y: 0 }}
            animate={{ y: '-50%' }}
            transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
          >
            {[...HEX, ...HEX].map((h, i) => (
              <span key={i} className={i % 6 === 0 ? 'boot__hex-strong' : ''}>{h}</span>
            ))}
          </motion.div>

          {/* Massive counter — outline that fills from bottom as load progresses */}
          <motion.div
            className="boot__center"
            exit={{ scale: 0.1, opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
          >
            <div className="boot__count" data-text={display}>
              <span className="boot__count-outline">{display}</span>
              <span
                className="boot__count-fill"
                style={{ clipPath: `inset(${100 - count}% 0 0 0)` }}
              >
                {display}
              </span>
              <span className="boot__count-suffix">%</span>
            </div>
          </motion.div>

          {/* Type-on diagnostic lines */}
          <div className="boot__lines">
            {LINES.slice(0, visibleLines).map((l, i) => {
              const isLast = i === LINES.length - 1
              return (
                <motion.div
                  key={i}
                  className="boot__line"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l}
                  {isLast && i + 1 === visibleLines && (
                    <span className="boot__caret" />
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Bottom progress rail */}
          <div className="boot__bar">
            <div className="boot__bar-fill" style={{ width: `${count}%` }} />
            <span className="boot__bar-num">{display}</span>
          </div>

          {/* End-of-boot flash */}
          {glitch && <span className="boot__flash" aria-hidden />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
