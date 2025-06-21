'use client'

import Link from 'next/link'
import { useState } from 'react'

const BlogPostCard = ({
  post,
}: {
  post: {
    title: string
    image?: string | null
    description: string
    category?: string
    date?: string
    readingTime?: number
    uid: string
    author?: string
    content?: string
  }
}) => {
  const [imageError, setImageError] = useState(false)

  const imagePath = post.image || ''
  const showImage = imagePath && !imageError

  return (
    <Link
      href={`/blog/${post.uid}`}
      className="block h-full no-underline"
      style={{ textDecoration: 'none' }}
    >
      <div className="group h-full min-w-[260px] overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-800">
        <div className="relative flex h-52 w-full items-center justify-center overflow-hidden bg-zinc-100 dark:bg-zinc-700">
          {showImage ? (
            <img
              src={imagePath}
              alt={post.title}
              className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <svg
              className="h-12 w-12 text-zinc-400 dark:text-zinc-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                strokeWidth={1.5}
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 16l3-3 2 2 3-4"
              />
              <circle cx="9" cy="9" r="1.5" />
            </svg>
          )}
        </div>

        <div className="p-6">
          {post.category && (
            <span className="mb-2.5 inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold tracking-wide text-zinc-600 uppercase dark:bg-zinc-700 dark:text-zinc-300">
              {post.category}
            </span>
          )}
          <h2 className="mb-2 line-clamp-2 text-lg leading-tight font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 dark:text-white dark:group-hover:text-zinc-300">
            {post.title}
          </h2>
          <p className="mb-4 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
            {post.description}
          </p>
          <div className="mt-auto flex items-center text-xs text-zinc-500 dark:text-zinc-400">
            {post.date && (
              <span className="mr-3">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
            {post.readingTime && <span>{post.readingTime} min read</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogPostCard
