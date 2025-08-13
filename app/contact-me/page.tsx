import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Me | Sushil Subedi',
  description:
    'Get in touch with Sushil Subedi to discuss projects, opportunities, or questions.',
}

export default function Contact() {
  return (
    <div className="flex w-full items-center justify-center px-2 py-6 sm:px-4 sm:py-12">
      <div className="w-full max-w-3xl rounded-xl bg-white/80 p-8 shadow-sm backdrop-blur-md dark:bg-zinc-900/80 dark:backdrop-blur-md">
        <ContactForm />
      </div>
    </div>
  )
}
