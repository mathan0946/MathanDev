import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Work from '../components/Work'
import Journey from '../components/Journey'
import Skills from '../components/Skills'
import Contact from '../components/Contact'

const page = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
}

export default function Landing() {
  return (
    <motion.main variants={page} initial="initial" animate="animate" exit="exit">
      <Hero />
      <Work />
      <Journey />
      <Skills />
      <Contact />
    </motion.main>
  )
}
