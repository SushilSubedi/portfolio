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
    transition: { staggerChildren: 0.2 },
  },
}
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

export default function ProjectListClient() {
  return (
    <motion.div
      className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white/80 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/90 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900/80 dark:backdrop-blur-md dark:hover:bg-zinc-900/90"
        >
          <div className="relative h-48 w-full overflow-hidden">
            {project.image ? (
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-700">
                <ImageIcon className="h-16 w-16 text-zinc-400 dark:text-zinc-500" />
              </div>
            )}
          </div>
          <div className="flex flex-grow flex-col p-6">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {project.title}
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/20">
                    {project.role}
                  </span>
                </div>
              </div>
              <Link
                href={project.company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <Building2 size={16} />
                <span className="font-medium">{project.company.name}</span>
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-6 border-t border-zinc-100 pt-4 dark:border-zinc-700">
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              >
                <ExternalLink size={16} />
                <span>View Live</span>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
