import { motion } from 'framer-motion'

/* A drop-in scroll reveal. Wrap anything; it rises + fades in on enter. */
const dirOffset = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 60, y: 0 },
  right: { x: -60, y: 0 },
  none: { x: 0, y: 0 },
}

export default function Reveal({
  children,
  as = 'div',
  dir = 'up',
  delay = 0,
  duration = 0.8,
  amount = 0.3,
  once = true,
  className,
  ...rest
}) {
  const off = dirOffset[dir] || dirOffset.up
  const Comp = motion[as] || motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, ...off }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
