import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Mathan3D from './Mathan3D'
import './PhoneIntro.css'

/**
 * Scroll-driven cinematic intro.
 *
 * Phase 1 (0–30%)   portrait phone floats; aurora wallpaper + lock screen.
 * Phase 2 (30–70%)  phone pivots to landscape, scales up, bezel dissolves,
 *                   lock screen fades out, website fades in.
 * Phase 3 (70–100%) phone is gone — the website fills the viewport.
 *
 * The section is 500vh tall and its inner stage is sticky so scroll progress
 * drives the morph. Swap the contents of #website-content for your real site.
 */
export default function PhoneIntro() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Smooth out Lenis' fractional updates for buttery transforms.
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })

  // ---- phase 1: floating portrait
  const floatY = useTransform(p, [0, 0.3], [0, -10])
  const hintOpacity = useTransform(p, [0, 0.08], [1, 0])

  // ---- phase 2: rotate + scale + bezel dissolve
  // Rotate to landscape, then keep scaling so the screen fills the viewport.
  const rotate = useTransform(p, [0.3, 0.7], [0, -90])
  const scale = useTransform(
    p,
    [0, 0.3, 0.7, 1],
    [1, 1.04, 3.4, 3.4]
  )

  // Bezel: thickness, radius and shadow all dissolve through phase 2.
  const bezelOpacity = useTransform(p, [0.4, 0.7], [1, 0])
  const bezelRadius = useTransform(p, [0.4, 0.72], [44, 0])
  const bezelInset = useTransform(p, [0.4, 0.72], [10, 0])
  const shadowOpacity = useTransform(p, [0.35, 0.7], [1, 0])
  const notchOpacity = useTransform(p, [0.35, 0.55], [1, 0])

  // ---- screen content crossfade
  // Site fade is delayed until the phone is nearly in landscape, so the
  // pre-rotated website doesn't appear at a weird angle during the spin.
  const lockOpacity = useTransform(p, [0.3, 0.55], [1, 0])
  const siteOpacity = useTransform(p, [0.62, 0.78], [0, 1])

  // ---- aurora background fades as phone takes over
  const bgOpacity = useTransform(p, [0.55, 0.85], [1, 0])

  // ---- side meta-text — fades + slides out as the phone takes over
  const sideOpacity = useTransform(p, [0, 0.28], [1, 0])
  const sideScale = useTransform(p, [0, 0.3], [1, 0.85])
  const sideXLeft = useTransform(p, [0, 0.3], [0, -120])
  const sideXRight = useTransform(p, [0, 0.3], [0, 120])

  // Live clock for the lock screen.
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 15)
    return () => clearInterval(id)
  }, [])
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  const date = now.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <section className="phone-intro" ref={sectionRef} aria-label="Intro animation">
      <div className="phone-intro__sticky">
        <motion.div className="phone-intro__bg" style={{ opacity: bgOpacity }} aria-hidden>
          <span className="phone-intro__aurora phone-intro__aurora--a" />
          <span className="phone-intro__aurora phone-intro__aurora--b" />
          <span className="phone-intro__aurora phone-intro__aurora--c" />
          <span className="phone-intro__grid" />
          <span className="phone-intro__scan" />
          <span className="phone-intro__particles">
            {Array.from({ length: 26 }).map((_, i) => (
              <i key={i} style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                animationDelay: `${(i % 8) * 0.7}s`,
                animationDuration: `${6 + (i % 5)}s`,
              }} />
            ))}
          </span>
          <span className="phone-intro__grain" />
        </motion.div>

        <motion.aside
          className="phone-intro__side phone-intro__side--left"
          style={{ opacity: sideOpacity, x: sideXLeft, scale: sideScale }}
          aria-hidden
        >
          <span className="phone-intro__side-top">
            <span className="phone-intro__side-dot" /> EST · 2026
          </span>
          <span className="phone-intro__side-foot">
            <span>11.0168° N</span>
            <span>76.9558° E</span>
            <span>COIMBATORE / IN</span>
          </span>
        </motion.aside>

        <motion.aside
          className="phone-intro__side phone-intro__side--right"
          style={{ opacity: sideOpacity, x: sideXRight, scale: sideScale }}
          aria-hidden
        >
          <span className="phone-intro__side-top phone-intro__side-top--end">
            v01 / DRAFT
            <span className="phone-intro__side-live"><i /> LIVE</span>
          </span>
          <span className="phone-intro__side-foot phone-intro__side-foot--end">
            <span>BUILDING — SINCE</span>
            <span>DAY ONE</span>
            <span className="phone-intro__side-tick">→ SCROLL TO ENTER</span>
          </span>
        </motion.aside>

        {/* 3D model floating beside the phone — fades + slides out as the
            phone takes over the frame. */}
        <motion.div
          className="phone-intro__model"
          style={{ opacity: sideOpacity, x: sideXRight, scale: sideScale }}
          aria-hidden
        >
          <Mathan3D />
        </motion.div>

        <motion.div
          className="phone-intro__stage"
          style={{ rotate, scale, y: floatY }}
        >
          <motion.div
            className="phone-intro__shadow"
            style={{ opacity: shadowOpacity }}
            aria-hidden
          />

          <div className="phone-intro__phone">
            <motion.div
              className="phone-intro__bezel"
              style={{
                opacity: bezelOpacity,
                borderRadius: bezelRadius,
                inset: bezelInset,
              }}
              aria-hidden
            />

            <motion.div
              className="phone-intro__notch"
              style={{ opacity: notchOpacity }}
              aria-hidden
            />

            <div className="phone-intro__screen">
              {/* Lock screen + wallpaper */}
              <motion.div className="phone-intro__lock" style={{ opacity: lockOpacity }}>
                <div id="wallpaper" className="phone-intro__wallpaper" aria-hidden>
                  <span className="phone-intro__wall phone-intro__wall--a" />
                  <span className="phone-intro__wall phone-intro__wall--b" />
                  <span className="phone-intro__wall phone-intro__wall--c" />
                  <span className="phone-intro__wall-stars">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <i key={i} style={{
                        left: `${(i * 29) % 100}%`,
                        top: `${(i * 41) % 100}%`,
                        animationDelay: `${(i % 6) * 0.5}s`,
                      }} />
                    ))}
                  </span>
                  <span className="phone-intro__wall-pulse" />
                </div>
                <div className="phone-intro__lock-content">
                  <div className="phone-intro__status">
                    <span>{time}</span>
                    <span className="phone-intro__signal">
                      <i /><i /><i /><i />
                    </span>
                  </div>
                  <div className="phone-intro__time">{time}</div>
                  <div className="phone-intro__date">{date}</div>
                  <div className="phone-intro__lock-foot">
                    <span className="phone-intro__flash" aria-hidden>⚡</span>
                    <span className="phone-intro__camera" aria-hidden>◉</span>
                  </div>
                  <div className="phone-intro__home-indicator" aria-hidden />
                </div>
              </motion.div>

              {/* Website preview (this is what you swap for the real site) */}
              <motion.div
                id="website-content"
                className="phone-intro__site"
                style={{ opacity: siteOpacity }}
              >
                <img
                  src="/hey.png"
                  alt=""
                  className="phone-intro__site-hi"
                  aria-hidden
                />
                <div className="phone-intro__site-greeting">
                  <span className="phone-intro__site-kicker">— Hey there,</span>
                  <h2 className="phone-intro__site-name">
                    I’m <em>Mathan</em>.
                  </h2>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="phone-intro__hint"
          style={{ opacity: hintOpacity }}
          aria-hidden
        >
          <span>scroll</span>
          <span className="phone-intro__hint-line" />
        </motion.div>
      </div>
    </section>
  )
}
