type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

export type BlogPost = {
  title: string
  description: string
  link?: string
  uid: string
  content: string
  category?: string
  date?: string
  author?: string // Added author
  readingTime?: number // Changed from readTime
  image?: string
}

type SocialLink = {
  LINKEDIN: string
  GITHUB: string
  TWITTER: string
  FACEBOOK: string
  EMAIL: string
  INSTAGRAM: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Motion Primitives Pro',
    description:
      'Advanced components and templates to craft beautiful websites.',
    link: 'https://pro.motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
    id: 'project1',
  },
  {
    name: 'Motion Primitives',
    description: 'UI kit to make beautiful, animated interfaces.',
    link: 'https://motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'project2',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Truemark Technology',
    title: 'Software Engineer',
    start: '202',
    end: 'Present',
    link: 'https://ibelick.com',
    id: 'work1',
  },
  {
    company: 'Freelance',
    title: 'Design Engineer',
    start: '2022',
    end: '2024',
    link: 'https://ibelick.com',
    id: 'work2',
  },
  {
    company: 'Freelance',
    title: 'Front-end Developer',
    start: '2017',
    end: 'Present',
    link: 'https://ibelick.com',
    id: 'work3',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    uid: 'exploring-the-intersection-of-design-ai-and-design-engineering',
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design.',
    category: 'AI',
    date: '2024-06-01',
    author: 'Sushil Subedi',
    readingTime: 7,
    image:
      '/images/exploring-the-intersection-of-design-ai-and-design-engineering.jpg',
    content: `
<Cover
  src="https://cdn.cosmos.so/affd4b79-e848-4dfd-bd42-5f2c4a847365?format=jpeg"
  alt="Image from the movie Alien - from cosmos.com"
  caption="cosmos.com"
  width={1200}
  height={675}
/>

Design and artificial intelligence (AI) are increasingly intertwined, driving innovation across industries. As technology evolves, the role of design engineering is more critical than ever, bridging creativity and functionality.

---

## The Evolving Role of AI in Design

AI is no longer just a backend tool—it’s becoming an active collaborator in the creative process. From generating design ideas to optimizing layouts, AI offers endless possibilities. For instance:

- **Generative Design**: AI algorithms can generate thousands of design variations based on constraints, helping designers explore ideas faster.
- **User Experience Optimization**: AI analyzes user behavior to suggest improvements, enabling data-driven design decisions.
- **Automation**: Repetitive tasks like resizing assets or formatting layouts can be automated, freeing up designers for more strategic work.

---

## Design Engineering: The Glue Between Creativity and Execution

Design engineering ensures that the gap between creative vision and technical execution is seamless. It combines the artistry of design with the precision of engineering.

> "Good design is as little design as possible." — Dieter Rams

### Further Reading

- [Designing for AI](https://example.com/designing-for-ai)
- [The Future of Design Systems](https://example.com/future-design-systems)
- [Ethical AI Guidelines](https://example.com/ethical-ai)
    `,
  },
  {
    uid: 'why-i-left-my-job-to-start-my-own-company',
    title: 'Why I Left My Job to Start My Own Company',
    description:
      'A deep dive into my decision to leave my job and start my own company.',
    category: 'Career',
    date: '2024-05-15',
    author: 'Sushil Subedi',
    readingTime: 7,
    image: '',
    content: `
      # Why I Left My Job to Start My Own Company
      Starting my own company was a challenging but rewarding decision...
    `,
  },
  {
    uid: 'building-performant-react-apps',
    title: 'Building Performant React Apps',
    description: 'Tips and techniques for optimizing React applications.',
    category: 'Development',
    date: '2024-04-20',
    author: 'Sushil Subedi',
    readingTime: 6,
    image: '',
    content: `
      # Building Performant React Apps
      Performance is crucial for modern web applications. In this post, we explore...
    `,
  },
  {
    uid: 'design-systems-for-scale',
    title: 'Design Systems for Scale',
    description: 'How to create and maintain design systems for large teams.',
    category: 'Design',
    date: '2024-03-10',
    author: 'Sushil Subedi',
    readingTime: 8,
    image: '', // No image, will show SVG
    content: `
      # Design Systems for Scale
      Design systems help teams build consistent and scalable products...
    `,
  },
]

export const SOCIAL_LINKS: SocialLink = {
  LINKEDIN: 'https://www.linkedin.com/in/sushil-subedi-42220b19b/',
  GITHUB: 'https://github.com/SushilSubedi?tab=repositories',
  TWITTER: 'https://x.com/SushilSubedi_',
  INSTAGRAM: 'https://www.instagram.com/sushil__subedi/',
  EMAIL: 'sushilsubedi151@gmail.com',
  FACEBOOK: 'https://www.facebook.com/sushil.subedi.169/',
}

export const EMAIL = 'your@email.com'
