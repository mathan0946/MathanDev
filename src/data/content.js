// Single source of truth for all portfolio content.

export const profile = {
  name: 'Mathana Guru Sabareesan',
  shortName: 'Mathana',
  role: 'AI / ML Engineer',
  location: 'Coimbatore, India',
  email: 'mathanaguru18@gmail.com',
  phone: '+91 8248625858',
  linkedin: 'https://www.linkedin.com/in/mathana-guru-sabareesan',
  github: 'https://github.com/mathan0946',
  githubHandle: 'mathan0946',
  portrait: '/portrait.png',
  // Three-line manifesto used in the hero
  manifesto: [
    'I teach machines to',
    'see, read, and reason',
    'about the messy real world.',
  ],
  intro:
    'Third-year Computer Science student specializing in Artificial Intelligence at Amrita School of AI. I build systems where deep learning meets the physical world — 30+ shipped projects across healthcare, agriculture, education, and finance.',
  // A pull-stat that anchors credibility without bragging
  signal: {
    rank: '7th',
    of: '10,000',
    event: 'IIT Kharagpur Data Science Hackathon 2024',
  },
  stats: [
    { value: '30+', label: 'projects shipped' },
    { value: '8.53', label: 'CGPA / 10' },
    { value: 'Top 0.1%', label: 'IIT KGP hackathon' },
  ],
}

/* ---- Featured: rich, story-first spreads with animated visuals ---- */
export const projects = [
  {
    id: 'learning',
    index: '01',
    title: 'Voice of Every Learner',
    subtitle: 'AI Multilingual Learning Assistant + Sign Language',
    year: '2025',
    accuracy: '7+',
    accuracyLabel: 'Indian languages · live sign-language recognition',
    stack: ['JavaScript', 'Speech', 'Computer Vision', 'NLP'],
    url: 'https://github.com/mathan0946/AI-Powered-Multilingual-Learning-Assistant-With-Sign-Language',
    summary:
      'Inclusive education that meets people where they are — learn through text, speech, or sign, with real-time translation across 7+ Indian languages.',
    points: [
      'Sign-language recognition pipeline so deaf and hard-of-hearing learners are first-class users, not an afterthought.',
      'Real-time translation across 7+ Indian languages with speech in and speech out.',
      'Interactive lesson flow that adapts to the modality each learner prefers.',
    ],
    tone: 'voice',
    major: true,
  },
  {
    id: 'research',
    index: '02',
    title: 'The Paper Critic',
    subtitle: 'Research Paper Evaluation & Conference Matching',
    year: '2024',
    accuracy: 'Minutes',
    accuracyLabel: 'from upload to a transparent, explained verdict',
    stack: ['Python', 'RAG', 'Vector DB', 'LLMs'],
    url: 'https://github.com/mathan0946/AI-Powered-Research-Paper-Evaluation-and-Conference-Matching-System',
    summary:
      'Upload a paper, get an editor’s read in minutes — and a chatbot that explains exactly why a conference would accept or reject it.',
    points: [
      'One-shot classification over a Pathway vector database to recommend the right venue.',
      'Conversational agent that defends its judgments with evidence from the paper itself.',
      'Built for transparency: every accept/reject comes with a reason.',
    ],
    tone: 'paper',
    major: true,
  },
  {
    id: 'derma',
    index: '03',
    title: 'DermaQ',
    subtitle: 'AI-Powered Dermatology, End to End',
    year: '2025',
    accuracy: 'Full-stack',
    accuracyLabel: 'web app + shipped Android APK',
    stack: ['TypeScript', 'Deep Learning', 'React', 'Mobile'],
    url: 'https://github.com/mathan0946/DermaQ',
    summary:
      'A full-stack dermatology app that detects and analyses skin conditions from a photo — and actually ships, APK and all.',
    points: [
      'Image-based skin-disease detection wrapped in a clean, reassuring product.',
      'Complete pipeline from model to TypeScript front end to installable Android build.',
      'Designed so a worried user gets clarity, not jargon.',
    ],
    tone: 'health',
  },
  {
    id: 'flango',
    index: '04',
    title: 'Flango',
    subtitle: 'Finite-Automata Education, Voice-Controlled',
    year: '2025',
    accuracy: 'Gemini',
    accuracyLabel: '+ Sarvam AI · voice-built automata, live analysis',
    stack: ['TypeScript', 'Gemini AI', 'Sarvam AI', 'Voice'],
    url: 'https://github.com/mathan0946/Flango',
    summary:
      'A theory-of-computation tutor you can talk to — build automata by voice, get them analysed in real time, and ask a chatbot when you’re stuck.',
    points: [
      'Voice-controlled automata construction powered by Google Gemini and Sarvam AI.',
      'Real-time pattern analysis with an interactive chatbot tutor and multilingual support.',
      'Privacy-first: bring-your-own API key, managed locally.',
    ],
    tone: 'logic',
  },
  {
    id: 'tomato',
    index: '05',
    title: 'Greenhouse Intelligence',
    subtitle: 'AI + IoT for Tomato Disease Detection',
    year: '2024',
    accuracy: '94.7%',
    accuracyLabel: 'detection accuracy · 10 disease classes',
    stack: ['Python', 'MobileNetV2', 'Raspberry Pi', 'MQTT'],
    url: 'https://github.com/mathan0946/TomatoCare-AI-Smart-Disease-Detection-and-Treatment-Recommendation-System',
    summary:
      'An end-to-end IoT system that watches a crop like an agronomist would — diagnosing disease from a photo while sensing the environment around the plant.',
    points: [
      'MobileNetV2 classifier across 10 disease classes at 94.7% accuracy, quantized for the edge.',
      'DHT11, BH1750 and soil-moisture data streamed over MQTT for low-latency monitoring.',
      'Companion app with camera diagnosis and weather-aware treatment advice.',
    ],
    tone: 'field',
    major: true,
  },
  {
    id: 'stock',
    index: '06',
    title: 'Signal in the Noise',
    subtitle: 'Bayesian LSTM Stock-Market Predictor',
    year: '2025',
    accuracy: 'Bayesian',
    accuracyLabel: 'uncertainty-aware forecasting, not blind point guesses',
    stack: ['Python', 'LSTM', 'Bayesian Inference', 'PyTorch'],
    url: 'https://github.com/mathan0946/Bayesian_LSTM_Stock_Market_Predictor',
    summary:
      'Forecasting that knows what it doesn’t know — Bayesian inference over LSTMs gives predictions with honest confidence bands.',
    points: [
      'Combines Bayesian inference with LSTM networks for sequence forecasting.',
      'Produces uncertainty estimates, not just a single fragile number.',
      'A study in trustworthy ML for high-stakes, noisy signals.',
    ],
    tone: 'signal',
  },
]

/* ---- Archive: the full breadth, filterable ---- */
export const archiveCategories = [
  'All',
  'AI / ML',
  'Web & Mobile',
  'Data Science',
  'Tools & Systems',
]

export const archive = [
  // AI / ML
  {
    name: 'Plagiarism Detector (BERT)',
    cat: 'AI / ML',
    lang: 'Python',
    desc: 'BERT semantic-similarity engine in Flask — transformer embeddings + cosine similarity to quantify textual overlap.',
    url: 'https://github.com/mathan0946/Plagiarism-Detector-Using-BERT',
    tags: ['BERT', 'Flask'],
  },
  {
    name: 'Biomedical NER',
    cat: 'AI / ML',
    lang: 'Python',
    desc: 'NLP pipeline that extracts medical and biomedical entities from clinical text.',
    url: 'https://github.com/mathan0946/biomedical_NER',
    tags: ['NLP', 'NER'],
  },
  {
    name: 'Bug Hunter',
    cat: 'AI / ML',
    lang: 'Python',
    desc: 'Intelligent bug detection and analysis across code repositories.',
    url: 'https://github.com/mathan0946/Bug_Hunter',
    tags: ['Static Analysis'],
  },
  {
    name: 'AgriGuru',
    cat: 'AI / ML',
    lang: 'Python',
    desc: 'Agricultural-tech assistant for modern, data-driven farming decisions.',
    url: 'https://github.com/mathan0946/AgriGuru',
    tags: ['AgriTech'],
  },
  {
    name: 'Image Filter in C',
    cat: 'Tools & Systems',
    lang: 'C',
    desc: 'From-scratch BMP noise reduction — mean & median filters over 3×3 kernels, pixel-level manipulation, no libraries.',
    url: 'https://github.com/mathan0946/Image-Filter-Application-using-C-language',
    tags: ['Image Processing'],
  },

  // Web & Mobile
  {
    name: 'Finovate — Frontend',
    cat: 'Web & Mobile',
    lang: 'TypeScript',
    desc: 'Fintech platform front end with a Python backend counterpart.',
    url: 'https://github.com/mathan0946/finovate-frontend',
    tags: ['FinTech', 'React'],
  },
  {
    name: 'Finovate — Backend',
    cat: 'Web & Mobile',
    lang: 'Python',
    desc: 'Service layer powering the Finovate financial platform.',
    url: 'https://github.com/mathan0946/finovate-backend',
    tags: ['API', 'Python'],
  },
  {
    name: 'SkillSurge',
    cat: 'Web & Mobile',
    lang: 'TypeScript',
    desc: 'A skill-development and learning platform.',
    url: 'https://github.com/mathan0946/SkillSurge',
    tags: ['EdTech'],
  },
  {
    name: 'DermaQ — APK',
    cat: 'Web & Mobile',
    lang: 'Android',
    desc: 'Installable Android build of the DermaQ dermatology app.',
    url: 'https://github.com/mathan0946/DermaQ-App-APK',
    tags: ['Mobile'],
  },
  {
    name: 'I am Mathan',
    cat: 'Web & Mobile',
    lang: 'TypeScript',
    desc: 'A personal-branding and portfolio experiment.',
    url: 'https://github.com/mathan0946/I_am_Mathan',
    tags: ['Personal'],
  },

  // Data Science
  {
    name: 'EV Charging Duration',
    cat: 'Data Science',
    lang: 'Jupyter',
    desc: 'Predicting EV charging-session length — preprocessing, EDA, outlier detection, clustering and modeling.',
    url: 'https://github.com/mathan0946/EV-Charging-Session-Duration-Prediction',
    tags: ['Forecasting', 'EDA'],
  },
  {
    name: 'NYC Taxi Fairness Audit',
    cat: 'Data Science',
    lang: 'HTML',
    desc: 'Auditing fairness in NYC taxi pricing with analytics and fairness metrics.',
    url: 'https://github.com/mathan0946/Fairness-Audit-of-NYC-Taxi-Pricing',
    tags: ['Fairness', 'Analytics'],
  },
  {
    name: 'Data-Driven Model (DDM)',
    cat: 'Data Science',
    lang: 'Python',
    desc: 'A data-driven modeling project for predictive analytics.',
    url: 'https://github.com/mathan0946/DDM',
    tags: ['Modeling'],
  },

  // Tools & Systems
  {
    name: 'Smart Tic-Tac-Toe (Minimax)',
    cat: 'Tools & Systems',
    lang: 'Java',
    desc: 'Unbeatable Minimax AI opponent plus local 2-player mode.',
    url: 'https://github.com/mathan0946/Java-Based-Smart-Tic-Tac-Toe-With-Minimax-AI-and-Multiplayer',
    tags: ['Minimax', 'Game'],
  },
  {
    name: 'Mathan Codes — DSA',
    cat: 'Tools & Systems',
    lang: 'C++',
    desc: 'A growing collection of data-structures & algorithms solutions.',
    url: 'https://github.com/mathan0946/Mathan_Codes',
    tags: ['DSA', 'C++'],
  },
  {
    name: 'Azure Practice',
    cat: 'Tools & Systems',
    lang: 'Cloud',
    desc: 'Hands-on labs across Microsoft Azure cloud services.',
    url: 'https://github.com/mathan0946/azure_practice',
    tags: ['Azure', 'Cloud'],
  },
]

export const journey = [
  {
    period: '2023 — 2027',
    title: 'B.Tech, Computer Science & Engineering (AI)',
    place: 'Amrita School of AI, Amrita Vishwa Vidyapeetham',
    detail: 'CGPA 8.53 / 10.0',
    now: true,
  },
  {
    period: '2021 — 2023',
    title: 'Higher Secondary (HSC)',
    place: 'Srinivasa Public School',
    detail: '91%',
  },
  {
    period: '2020 — 2021',
    title: 'Secondary School (SSLC)',
    place: 'Srinivasa Public School',
    detail: '84%',
  },
]

export const achievements = [
  {
    headline: '7th of 10,000',
    body: 'IIT Kharagpur Data Science Hackathon 2024 — a GenAI + zero-shot classification solution that placed in the top 0.1%.',
  },
  {
    headline: 'Always shipping',
    body: 'Certified in LLMs and Python (Udemy, 2024) — but 30+ public repos say more than any certificate.',
  },
]

// Skills grouped by the *role they play* in a system, not by category label.
export const skillClusters = [
  {
    role: 'Make machines understand',
    blurb: 'The intelligence layer',
    items: ['Deep Learning', 'NLP & BERT', 'Computer Vision', 'Image Processing', 'PCA', 'TensorFlow', 'PyTorch'],
  },
  {
    role: 'Make them generate',
    blurb: 'Language & reasoning',
    items: ['LLMs', 'RAG', 'Transformers', 'Vector DBs', 'Gemini', 'Ollama', 'Zero-shot'],
  },
  {
    role: 'Make it real',
    blurb: 'Ship & serve',
    items: ['Python', 'TypeScript', 'C', 'C++', 'Java', 'SQL', 'Flask', 'React', 'Firebase', 'Git', 'GCP', 'Azure'],
  },
]
