import './Marquee.css'

const ITEMS = [
  'Deep Learning', 'LLMs', 'RAG', 'Computer Vision', 'Transformers', 'PyTorch',
  'TensorFlow', 'BERT', 'Edge AI', 'IoT', 'React', 'TypeScript', 'Python',
  'Vector DBs', 'NLP', 'Gemini', 'Bayesian ML',
]

export default function Marquee() {
  // Duplicate the track so the loop is seamless
  const track = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {track.map((item, i) => (
          <span className="marquee__item" key={i}>
            {item}
            <span className="marquee__star">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
