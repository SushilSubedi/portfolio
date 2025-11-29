'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText, Shield, Cookie, Mail } from 'lucide-react'

const sections = [
  {
    id: 'terms',
    title: 'Terms of Use',
    icon: FileText,
    content: {
      intro: 'By accessing this website, you agree to use it responsibly and respect its content. All materials, including text, images, and code, are my intellectual property unless stated otherwise.',
      points: [
        'Do not use this site for unlawful purposes',
        'Respect the site\'s content and avoid unauthorized copying',
        'Contact me for permission to use any materials',
        'I reserve the right to modify these terms at any time',
      ],
    },
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    icon: Shield,
    content: {
      intro: 'Your privacy matters to me. I collect minimal data to improve your experience and never share your personal information with third parties unless required by law.',
      points: [
        'Data collected: Name, email (via contact form), and basic analytics',
        'Purpose: To respond to inquiries and understand site usage',
        'Security: Reasonable measures are in place to protect your data',
        'Retention: Data is kept only as long as necessary',
      ],
    },
  },
  {
    id: 'cookies',
    title: 'Cookie Policy',
    icon: Cookie,
    content: {
      intro: 'This site may use cookies to enhance functionality, like remembering your preferences or tracking usage via analytics tools.',
      points: [
        'Essential cookies for site functionality',
        'Analytics cookies to understand user behavior (optional)',
        'You can manage cookie settings through your browser',
        'Third-party analytics tools may set their own cookies',
      ],
    },
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
}

export default function TermsAndPoliciesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          Terms & Policies
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
          Understand the guidelines and privacy policies governing this website.
        </p>
      </motion.header>

      {/* Sections */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <motion.section
              key={section.id}
              variants={itemVariants}
              className="rounded-2xl border border-zinc-700/50 bg-zinc-900/60 p-6 backdrop-blur-xl sm:p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20">
                  <Icon className="h-5 w-5 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-100">
                  {section.title}
                </h2>
              </div>
              <p className="mb-4 text-base leading-relaxed text-zinc-400">
                {section.content.intro}
              </p>
              <ul className="space-y-2">
                {section.content.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          )
        })}

        {/* Contact Section */}
        <motion.section
          variants={itemVariants}
          className="rounded-2xl border border-zinc-700/50 bg-zinc-900/60 p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20">
              <Mail className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-100">
              Questions?
            </h2>
          </div>
          <p className="text-base leading-relaxed text-zinc-400">
            If you have concerns about these terms or policies, feel free to{' '}
            <Link
              href="/contact-me"
              className="text-blue-400 transition-colors hover:text-blue-300"
            >
              contact me
            </Link>
            {' '}or email me directly at{' '}
            <a
              href="mailto:sushilsubedi151@gmail.com"
              className="text-blue-400 transition-colors hover:text-blue-300"
            >
              sushilsubedi151@gmail.com
            </a>
            . I'm here to help!
          </p>
        </motion.section>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 text-center text-sm text-zinc-500"
      >
        <p>Last updated: November 29, 2025</p>
      </motion.footer>
    </main>
  )
}

