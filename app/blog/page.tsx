import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Blog | Sushil Subedi',
  description:
    'Thoughts on building software, navigating career paths, and the intersection of technology and creativity.',
}
import BlogListClient from '@/components/BlogListClient'
import { BLOG_POSTS } from '@/data/blogs'

export default function BlogList() {
  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-7xl px-2 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Writing on Code & Design
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Thoughts on building software, navigating career paths, and the
            intersection of technology and creativity.
          </p>
        </div>

        <BlogListClient posts={BLOG_POSTS} />
      </div>
    </div>
  )
}
