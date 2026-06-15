import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import Hero from '../components/Hero'
import BootSequence from '../components/BootSequence'
import PhoneIntro from '../components/PhoneIntro'
import KineticManifesto from '../components/KineticManifesto'
import Marquee from '../components/Marquee'
import Work from '../components/Work'
import Journey from '../components/Journey'
import Skills from '../components/Skills'
import Contact from '../components/Contact'

const page = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
}

/** Section with scroll-driven scale + opacity that brightens as it enters view. */
function ScrollSection({ children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.35, 1, 1, 0.35])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.985])
  return (
    <motion.div ref={ref} style={{ opacity, scale }} className="scroll-section">
      {children}
    </motion.div>
  )
}

export default function Landing() {
  const [booted, setBooted] = useState(false)
  return (
    <motion.main variants={page} initial="initial" animate="animate" exit="exit">
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      <PhoneIntro />
      <Hero />
      <KineticManifesto />
      <Marquee />
      <ScrollSection><Work /></ScrollSection>
      <ScrollSection><Journey /></ScrollSection>
      <ScrollSection><Skills /></ScrollSection>
      <ScrollSection><Contact /></ScrollSection>
    </motion.main>
  )
}
