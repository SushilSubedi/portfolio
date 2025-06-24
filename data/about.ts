interface Experience {
  role: string
  company: string
  period: string
  description: string
}

interface CorePrinciple {
  icon: string
  title: string
  description: string
}

interface Toolkit {
  name: string
  icon: string
  description: string
}

export const experiences: Experience[] = [
  {
    role: 'Full Stack Developer',
    company: 'U & J Enterprises',
    period: '2025 - present',
    description:
      'As a Full Stack Developer, building a platform that turns product photos into AI-generated listings to AuctionFlex, k-bid, Shopify, and more.',
  },
  {
    role: 'Software Engineer',
    company: 'Truemark Technology',
    period: '2021 - 2024',
    description:
      'Led development of scalable web apps using React & Rails, mentored junior developers, and automated CI/CD pipelines.',
  },
  {
    role: 'Associate Software Engineer',
    company: 'Truemark Technology',
    period: '2020 - 2021',
    description:
      'Enhanced features based on senior feedback, implemented code quality tools, and contributed to the hiring process.',
  },
  {
    role: 'React Developer Intern',
    company: 'Influence',
    period: 'Dec 2020',
    description:
      'Began my career by refactoring and enhancing a product website, gaining hands-on experience with modern web development.',
  },
]

export const corePrinciples: CorePrinciple[] = [
  {
    icon: 'Sparkles',
    title: 'Elegant Solutions',
    description:
      'I believe in the power of simplicity. My goal is to write clean, efficient, and maintainable code that solves complex problems in the most straightforward way.',
  },
  {
    icon: 'Heart',
    title: 'User-Centric Design',
    description:
      'Technology should serve people. I focus on building intuitive, accessible, and engaging user experiences that make a real difference.',
  },
  {
    icon: 'BookOpen',
    title: 'Continuous Growth',
    description:
      'The tech world is always evolving, and so am I. I am a lifelong learner, constantly exploring new tools, techniques, and ideas to stay at the cutting edge.',
  },
]

export const toolkit: Toolkit[] = [
  {
    name: 'React & Next.js',
    icon: 'Code',
    description:
      'Crafting dynamic, server-rendered, and static web applications.',
  },
  {
    name: 'Ruby on Rails',
    icon: 'Server',
    description:
      'Building scalable and efficient server-side applications and APIs.',
  },
  {
    name: 'Databases',
    icon: 'Database',
    description: 'Proficient with both SQL (PostgreSQL) database.',
  },
  {
    name: 'TypeScript',
    icon: 'Code',
    description:
      'Enhancing code quality and maintainability with static typing.',
  },
  {
    name: 'Git & CI/CD',
    icon: 'GitMerge',
    description:
      'Implementing version control and automated deployment pipelines.',
  },
  {
    name: 'Tailwind CSS',
    icon: 'Wind',
    description:
      'Rapidly building modern, responsive designs with a utility-first approach.',
  },
]
