'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, User, Briefcase, BookOpen, Mail, FileText, ChevronRight } from 'lucide-react'

const sitemapLinks = [
  {
    href: '/',
    title: 'Home',
    description: 'Get a quick overview of who I am and chat with Sushil AI for personalized insights.',
    icon: Home,
  },
  {
    href: '/about',
    title: 'About',
    description: 'Discover my background, skills, experience, and what drives my passion for technology.',
    icon: User,
  },
  {
    href: '/projects',
    title: 'Projects',
    description: 'Explore my portfolio of enterprise-level projects and creative technical endeavors.',
    icon: Briefcase,
  },
  {
    href: '/blog',
    title: 'Blog',
    description: 'Read my thoughts, tutorials, and insights on web development and technology trends.',
    icon: BookOpen,
  },
  {
    href: '/contact-me',
    title: 'Contact',
    description: 'Get in touch for collaborations, opportunities, or just to connect.',
    icon: Mail,
  },
  {
    href: '/terms-and-policies',
    title: 'Terms & Policies',
    description: 'Review the legal guidelines and privacy policies governing this website.',
    icon: FileText,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function SitemapPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          Site Navigation
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
          Your complete guide to exploring my portfolio, blog, and professional journey.
        </p>
      </motion.header>

      {/* Links Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {sitemapLinks.map((link) => {
          const Icon = link.icon
          return (
            <motion.div key={link.href} variants={itemVariants}>
              <Link
                href={link.href}
                className="group block h-full rounded-2xl border border-zinc-700/50 bg-zinc-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-zinc-600/50 hover:bg-zinc-900/80 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:ring-blue-500/30">
                    <Icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-zinc-100">
                        {link.title}
                      </h2>
                      <ChevronRight className="h-5 w-5 text-zinc-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-zinc-300" />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {link.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-zinc-500">
          Need help navigating?{' '}
          <Link
            href="/contact-me"
            className="text-blue-400 transition-colors hover:text-blue-300"
          >
            Contact me
          </Link>
          {' '}for assistance.
        </p>
      </motion.div>
    </main>
  )
}

