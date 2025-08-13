import type { Metadata } from 'next'
import ClientAbout from './ClientAbout'

export const metadata: Metadata = {
  title: 'About | Sushil Subedi',
  description:
    'I Build Things for the Web. A Story of Code, Curiosity, and Chiya.',
}

export default function AboutPage() {
  return <ClientAbout />
}
