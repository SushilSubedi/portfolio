import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Sushil Subedi',
  description:
    'Enterprise-level projects showcasing expertise in modern web technologies and scalable solutions.',
}

import ProjectListClient from '@/components/ProjectListClient'

const ProjectsPage = () => {
  return (
    <div className="mx-auto max-w-5xl px-2 py-8 sm:px-6 sm:py-16 lg:px-8">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl dark:text-zinc-100">
          Professional Projects
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-zinc-300 dark:text-zinc-400">
          Enterprise-level projects developed as a software engineer, showcasing
          expertise in modern web technologies and scalable solutions.
        </p>
      </div>

      {/* Project List */}
      <ProjectListClient />
    </div>
  )
}

export default ProjectsPage
