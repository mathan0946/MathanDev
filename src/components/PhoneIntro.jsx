import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import './PhoneIntro.css'

const FRAME_COUNT = 39
const FRAME_PATH = (i) => `/frames/hi/${String(i).padStart(2, '0')}.png`

/**
 * Scroll-driven cinematic intro — single pinned section that does:
 *
 *  Phase 0 (0–28%)    "hi" frame-by-frame animation plays center stage.
 *  Phase 1 (28–42%)   hi shrinks + slides right; phone zooms in centered.
 *  Phase 2 (42–72%)   phone rotates to landscape, scales up, bezel dissolves.
 *  Phase 3 (72–100%)  phone fills the viewport; site is revealed.
 *
 * The hi canvas keeps rendering frame 39 after playback so the keepsake
 * sits beside the phone until the phone takes over the frame.
 */
export default function PhoneIntro() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const framesRef = useRef([])
  const [framesReady, setFramesReady] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Smooth out Lenis' fractional updates for buttery transforms.
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })

  // ----- Hi frame playback (phase 0) -----
  const frameProgress = useTransform(p, [0, 0.28], [0, 1])
  // Caption sits to the LEFT of the image; fades out by sliding further left.
  const hiCaptionOpacity = useTransform(p, [0, 0.22, 0.3], [1, 1, 0])
  const hiCaptionX = useTransform(p, [0, 0.3], ['0px', '-140px'])

  // Hi canvas — visible from the start, shrinks + slides right during handoff,
  // then keeps moving right and fades out as the phone grows.
  const hiCanvasScale = useTransform(p, [0.28, 0.42], [1, 0.95])
  const hiCanvasX = useTransform(p, [0.28, 0.42, 0.7], ['0vw', '28vw', '55vw'])
  const hiCanvasY = useTransform(p, [0.28, 0.42], ['0vh', '4vh'])
  const hiCanvasOpacity = useTransform(p, [0, 0.5, 0.7], [1, 1, 0])

  // ----- Phone phase (shifted to start at 0.3 — hi takes 0→0.3) -----
  const floatY = useTransform(p, [0.3, 0.51], [0, -10])
  const hintOpacity = useTransform(p, [0, 0.08], [1, 0])

  // Phone zooms in from tiny to its resting size during 30–43%.
  const rotate = useTransform(p, [0.51, 0.79], [0, -90])
  const scale = useTransform(
    p,
    [0.3, 0.426, 0.51, 0.79, 1],
    [0.18, 1, 1.04, 3.4, 3.4]
  )
  const stageOpacity = useTransform(p, [0.3, 0.335, 0.426], [0, 0.6, 1])

  // Bezel: thickness, radius and shadow all dissolve through phase 2.
  const bezelOpacity = useTransform(p, [0.58, 0.79], [1, 0])
  const bezelRadius = useTransform(p, [0.58, 0.804], [44, 0])
  const bezelInset = useTransform(p, [0.58, 0.804], [10, 0])
  const shadowOpacity = useTransform(p, [0.545, 0.79], [1, 0])
  const notchOpacity = useTransform(p, [0.545, 0.685], [1, 0])

  // ----- screen content crossfade -----
  const lockOpacity = useTransform(p, [0.51, 0.685], [1, 0])
  const siteOpacity = useTransform(p, [0.734, 0.846], [0, 1])

  // ----- aurora background fades as phone takes over -----
  const bgOpacity = useTransform(p, [0.685, 0.895], [1, 0])

  // ----- side meta-text — appears once phone settles, fades as it grows -----
  const sideOpacity = useTransform(p, [0.3, 0.4, 0.5], [0, 1, 0])
  const sideScale = useTransform(p, [0.3, 0.51], [1, 0.85])
  const sideXLeft = useTransform(p, [0.3, 0.51], [0, -120])
  const sideXRight = useTransform(p, [0.3, 0.51], [0, 120])

  // ----- Live clock for the lock screen -----
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 15)
    return () => clearInterval(id)
  }, [])
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  const date = now.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })

  // ----- Preload hi frames -----
  useEffect(() => {
    let cancelled = false
    let loaded = 0
    const arr = []
    const drawFirstFrameNow = () => {
      const canvas = canvasRef.current
      const img = arr[0]
      if (!canvas || !img || !img.complete) return
      const ctx = canvas.getContext('2d')
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const cw = rect.width, ch = rect.height
      const iw = img.naturalWidth, ih = img.naturalHeight
      const scale = Math.min(cw / iw, ch / ih)
      const dw = iw * scale, dh = ih * scale
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = FRAME_PATH(i)
      img.onload = () => {
        loaded++
        if (i === 1 && !cancelled) drawFirstFrameNow()
        if (loaded === FRAME_COUNT && !cancelled) setFramesReady(true)
      }
      img.onerror = () => {
        loaded++
        if (loaded === FRAME_COUNT && !cancelled) setFramesReady(true)
      }
      arr.push(img)
    }
    framesRef.current = arr
    return () => { cancelled = true }
  }, [])

  // ----- Render frame onto the canvas -----
  useEffect(() => {
    if (!framesReady) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const first = framesRef.current[0]
    if (!first) return
    const currentFrameRef = { current: 0 }

    const draw = (idx) => {
      const img = framesRef.current[idx]
      if (!img || !img.complete) return
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)
      const cw = rect.width, ch = rect.height
      const iw = img.naturalWidth, ih = img.naturalHeight
      const scale = Math.min(cw / iw, ch / ih)
      const dw = iw * scale, dh = ih * scale
      const dx = (cw - dw) / 2, dy = (ch - dh) / 2
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(currentFrameRef.current)
    }

    resize()
    const unsub = frameProgress.on('change', (v) => {
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(v * (FRAME_COUNT - 1))))
      if (idx !== currentFrameRef.current) {
        currentFrameRef.current = idx
        draw(idx)
      }
    })
    window.addEventListener('resize', resize)
    return () => {
      unsub()
      window.removeEventListener('resize', resize)
    }
  }, [framesReady, frameProgress])

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

        {/* Hi caption — shown only during hi playback */}
        <motion.div
          className="phone-intro__hi-caption"
          style={{ opacity: hiCaptionOpacity, x: hiCaptionX }}
          aria-hidden
        >
          <span className="phone-intro__hi-caption-kicker">— say</span>
          <h2 className="phone-intro__hi-caption-title">hi<em>.</em></h2>
          <span className="phone-intro__hi-caption-sub">scroll to play</span>
        </motion.div>

        {/* Hi frame canvas — plays, then shrinks + slides right of the phone */}
        <motion.div
          className="phone-intro__hi-stage"
          style={{
            scale: hiCanvasScale,
            x: hiCanvasX,
            y: hiCanvasY,
            opacity: hiCanvasOpacity,
          }}
        >
          <canvas ref={canvasRef} className="phone-intro__hi-canvas" aria-hidden />
        </motion.div>

        <motion.aside
          className="phone-intro__side phone-intro__side--left"
          style={{ opacity: sideOpacity, x: sideXLeft, scale: sideScale }}
          aria-hidden
        >
          <span className="phone-intro__side-top">
            <span className="phone-intro__side-dot" /> EST · 2026
          </span>
          <div className="phone-intro__welcome">
            <span className="phone-intro__welcome-kicker">— welcome to</span>
            <h1 className="phone-intro__welcome-title">
              the <em>portfolio</em>
            </h1>
            <span className="phone-intro__welcome-sub">an interactive experience</span>
          </div>
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

        <motion.div
          className="phone-intro__stage"
          style={{ rotate, scale, y: floatY, opacity: stageOpacity }}
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
