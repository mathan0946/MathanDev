import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './Cursor.css'

/* A glowing dual-ring cursor that lags slightly and grows over interactive
   targets. Disabled on touch / coarse pointers. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [down, setDown] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 })
  const dotX = useSpring(x, { stiffness: 900, damping: 40 })
  const dotY = useSpring(y, { stiffness: 900, damping: 40 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target
      const interactive = t.closest?.(
        'a, button, input, [role="tab"], .layer, .rcard, [data-cursor="hover"]'
      )
      setHovering(Boolean(interactive))
    }
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className={`cursor-ring ${hovering ? 'is-hover' : ''} ${down ? 'is-down' : ''}`}
        style={{ x: ringX, y: ringY }}
        aria-hidden
      />
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
        aria-hidden
      />
    </>
  )
}
