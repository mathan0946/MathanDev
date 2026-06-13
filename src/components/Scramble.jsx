import { useEffect, useRef, useState } from 'react'

/**
 * Decrypts a string into place — each character cycles through random glyphs
 * before locking in. Inspired by classic terminal/decrypt animations.
 *
 * Props:
 *   text       — the final string
 *   delay      — ms before the scramble starts (default 0)
 *   speed      — ms between frames (lower = faster, default 38)
 *   revealRate — characters revealed per frame (default 0.5)
 *   className  — passthrough
 */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#░▒▓01ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export default function Scramble({
  text = '',
  delay = 0,
  speed = 38,
  revealRate = 0.6,
  className,
  as: Tag = 'span',
}) {
  const [out, setOut] = useState(text)
  const frameRef = useRef(0)
  const timerRef = useRef(null)
  const queueRef = useRef([])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setOut(text); return }

    const from = ' '.repeat(text.length)
    const queue = []
    for (let i = 0; i < text.length; i++) {
      const start = Math.floor(Math.random() * 18 / revealRate)
      const end = start + Math.floor(Math.random() * 24 / revealRate) + 6
      queue.push({ from: from[i] || ' ', to: text[i], start, end, char: '' })
    }
    queueRef.current = queue
    frameRef.current = 0

    const startTimer = setTimeout(() => {
      const tick = () => {
        let done = 0
        let display = ''
        const q = queueRef.current
        for (let i = 0; i < q.length; i++) {
          const item = q[i]
          if (frameRef.current >= item.end) {
            done++
            display += item.to
          } else if (frameRef.current >= item.start) {
            if (!item.char || Math.random() < 0.32) {
              item.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            }
            display += item.char
          } else {
            display += item.from
          }
        }
        setOut(display)
        if (done < q.length) {
          frameRef.current++
          timerRef.current = setTimeout(tick, speed)
        }
      }
      tick()
    }, delay)

    return () => {
      clearTimeout(startTimer)
      clearTimeout(timerRef.current)
    }
  }, [text, delay, speed, revealRate])

  return <Tag className={className} aria-label={text}>{out}</Tag>
}
