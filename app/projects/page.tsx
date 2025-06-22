'use client'

import { ExternalLink, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { projects } from '@/data/projects'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

const ProjectsPage = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
          Featured Collaborations
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          A showcase of projects built with talented teams and partners.
        </p>
      </div>

      {/* Project List */}
      <motion.div
        className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-800"
          >
            <div className="relative h-48 w-full overflow-hidden">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-700">
                  <ImageIcon className="h-16 w-16 text-zinc-400 dark:text-zinc-500" />
                </div>
              )}
            </div>
            <div className="flex flex-grow flex-col p-6">
              <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white">
                {project.title}
              </h2>
              <p className="mt-2 flex-grow text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-600 transition-colors hover:text-black dark:text-zinc-300 dark:hover:text-white"
                >
                  <ExternalLink size={20} />
                  <span className="font-medium">Live Demo</span>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ProjectsPage
