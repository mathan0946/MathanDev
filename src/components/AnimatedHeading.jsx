import { motion } from 'framer-motion'

/* Splits text into words that rise + fade in one-by-one on scroll.
   `em` marks words (by index array) to render in italic accent. */
export default function AnimatedHeading({
  text,
  el = 'h2',
  className,
  emWords = [],
  delay = 0,
  stagger = 0.06,
}) {
  const words = text.split(' ')
  const MotionTag = motion[el] || motion.h2

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const word = {
    hidden: { opacity: 0, y: '0.6em', filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="ah__word" aria-hidden>
          <motion.span className="ah__word-inner" variants={word}>
            {emWords.includes(i) ? <em>{w}</em> : w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </MotionTag>
  )
}
