import { motion } from 'framer-motion'
import { profile } from '../data/content'
import './Contact.css'

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'LinkedIn', value: '/in/mathana-guru-sabareesan', href: profile.linkedin },
  { label: 'GitHub', value: '/mathan0946', href: profile.github },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
]

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container contact__inner">
        <motion.div
          className="contact__lead"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow eyebrow--light">Let’s build something</span>
          <div className="contact__person">
            <img src={profile.portrait} alt={profile.name} className="contact__avatar" loading="lazy" />
            <div>
              <p className="contact__person-name">{profile.name}</p>
              <p className="contact__person-role">{profile.role} · {profile.location}</p>
            </div>
          </div>
          <h2 className="contact__headline">
            Got a problem worth <em>solving with AI?</em>
          </h2>
          <p className="contact__sub">
            I’m looking for 2026 internships and collaborations where machine
            learning meets a real-world constraint. The harder the better.
          </p>
          <a className="contact__cta" href={`mailto:${profile.email}`}>
            <span>Start a conversation</span>
            <span className="contact__cta-arrow" aria-hidden>→</span>
          </a>
        </motion.div>

        <motion.ul
          className="contact__links"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="contact__link"
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                <span className="contact__link-label">{l.label}</span>
                <span className="contact__link-value">{l.value}</span>
                <span className="contact__link-arrow" aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
