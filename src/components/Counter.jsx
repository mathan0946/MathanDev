import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/* Counts up to a number when scrolled into view. Falls back to raw text
   for non-numeric values like "Top 0.1%" or "94.7%". */
export default function Counter({ value, duration = 1600, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(null)

  // Parse leading number + suffix (e.g. "30+", "94.7%", "8.53")
  const match = String(value).match(/^([\d.]+)(.*)$/)
  const target = match ? parseFloat(match[1]) : null
  const suffix = match ? match[2] : ''
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0

  useEffect(() => {
    if (!inView || target === null) return
    let raf
    let start
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setDisplay(target); return }
    const tick = (t) => {
      if (start === undefined) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  if (target === null) return <span ref={ref} className={className}>{value}</span>

  const shown = display === null ? (0).toFixed(decimals) : display.toFixed(decimals)
  return (
    <span ref={ref} className={className}>
      {shown}
      {suffix}
    </span>
  )
}
