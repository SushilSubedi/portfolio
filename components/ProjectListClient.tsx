'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, ImageIcon, Building2 } from 'lucide-react'

import { projects } from '@/data/projects'

// Animation variants for container and items
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
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
}

export default function ProjectListClient() {
  // Only track in production environment
  const isProduction = process.env.NODE_ENV === 'production'
  const trackProjectClick = (title: string) => {
    if (!isProduction || typeof window === 'undefined') return
    const gtag = (window as any).gtag
    if (typeof gtag === 'function') {
      gtag('event', 'project_click', {
        event_category: 'Projects',
        event_label: title,
      })
    }
  }
  return (
    <motion.div
      className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/60 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-zinc-300/50 hover:bg-white/80 hover:shadow-xl dark:border-zinc-700/50 dark:bg-zinc-900/60 dark:hover:border-zinc-600/50 dark:hover:bg-zinc-900/80"
        >
          <div className="relative h-56 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            {project.image ? (
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ImageIcon className="h-16 w-16 text-zinc-300 dark:text-zinc-600" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          <div className="flex flex-grow flex-col p-6 sm:p-8">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {project.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-500/20 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/20">
                    {project.role}
                  </span>
                  <Link
                    href={project.company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                  >
                    <Building2 size={14} />
                    <span>{project.company.name}</span>
                  </Link>
                </div>
              </div>
            </div>

            <p className="mb-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>

            <div className="mt-auto space-y-6">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 transition-colors group-hover:bg-zinc-200/80 dark:bg-zinc-800/50 dark:text-zinc-400 dark:group-hover:bg-zinc-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center pt-2">
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackProjectClick(project.title)}
                  className="group/link inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 transition-colors hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400"
                >
                  <span>View Project</span>
                  <ExternalLink
                    size={16}
                    className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

