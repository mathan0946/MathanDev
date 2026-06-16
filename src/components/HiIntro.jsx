import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import './HiIntro.css'

const FRAME_COUNT = 39
const FRAME_PATH = (i) => `/frames/hi/${String(i).padStart(2, '0')}.png`

/**
 * Scroll-driven frame-by-frame intro.
 * Pinned full-viewport section drives the "hi" sequence by mapping
 * scroll progress to a frame index. Plays before the phone intro.
 */
export default function HiIntro() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const framesRef = useRef([])
  const [ready, setReady] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Smooth the scroll signal so frame stepping doesn't jitter.
  const smoothed = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.5 })

  // Frames advance through the first ~55% — that's the "performance".
  // The rest of the scroll shrinks the image and slides it to the left,
  // handing off into the phone intro that follows.
  const frameProgress = useTransform(smoothed, [0, 0.55], [0, 1])
  const titleOpacity = useTransform(smoothed, [0, 0.05, 0.45, 0.6], [0, 1, 1, 0])
  const titleY = useTransform(smoothed, [0, 0.1], ['20px', '0px'])
  const vignetteOpacity = useTransform(smoothed, [0.6, 1], [1, 0.15])

  // Cinematic handoff — stage shrinks and slides left in the second half.
  const stageScale = useTransform(smoothed, [0.55, 0.95], [1, 0.35])
  const stageX = useTransform(smoothed, [0.55, 0.95], ['0vw', '32vw'])
  const stageY = useTransform(smoothed, [0.55, 0.95], ['0vh', '6vh'])

  // Preload every frame as <img> so the canvas can draw instantly.
  useEffect(() => {
    let cancelled = false
    let loaded = 0
    const arr = []
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = FRAME_PATH(i)
      img.onload = () => {
        loaded++
        if (loaded === FRAME_COUNT && !cancelled) setReady(true)
      }
      img.onerror = () => {
        loaded++
        if (loaded === FRAME_COUNT && !cancelled) setReady(true)
      }
      arr.push(img)
    }
    framesRef.current = arr
    return () => { cancelled = true }
  }, [])

  // Render a frame onto the canvas, sized to its container.
  useEffect(() => {
    if (!ready) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const first = framesRef.current[0]
    if (!first) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(currentFrameRef.current)
    }

    const currentFrameRef = { current: 0 }

    const draw = (idx) => {
      const img = framesRef.current[idx]
      if (!img || !img.complete) return
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)
      // contain-fit: preserve aspect ratio, center.
      const cw = rect.width
      const ch = rect.height
      const iw = img.naturalWidth
      const ih = img.naturalHeight
      const scale = Math.min(cw / iw, ch / ih)
      const dw = iw * scale
      const dh = ih * scale
      const dx = (cw - dw) / 2
      const dy = (ch - dh) / 2
      ctx.drawImage(img, dx, dy, dw, dh)
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
  }, [ready, frameProgress])

  return (
    <section ref={sectionRef} className="hi-intro" aria-label="Hi intro animation">
      <div className="hi-intro__sticky">
        <motion.div className="hi-intro__vignette" style={{ opacity: vignetteOpacity }} aria-hidden>
          <span className="hi-intro__grid" />
          <span className="hi-intro__glow" />
          <span className="hi-intro__grain" />
        </motion.div>

        <motion.div
          className="hi-intro__caption"
          style={{ opacity: titleOpacity, y: titleY }}
          aria-hidden
        >
          <span className="hi-intro__caption-kicker">— say</span>
          <h2 className="hi-intro__caption-title">
            hi<em>.</em>
          </h2>
          <span className="hi-intro__caption-sub">scroll to play</span>
        </motion.div>

        <motion.div
          className="hi-intro__stage"
          style={{ scale: stageScale, x: stageX, y: stageY }}
        >
          <canvas ref={canvasRef} className="hi-intro__canvas" aria-hidden />
        </motion.div>

        <div className="hi-intro__hud" aria-hidden>
          <span className="hi-intro__hud-dot" />
          FRAME SEQUENCE · 01–{FRAME_COUNT}
        </div>
      </div>
    </section>
  )
}
