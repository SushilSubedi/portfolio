'use client'

import Link from 'next/link'
import Image from 'next/image'
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
    dateFormatted?: string
    readingTime?: number
    uid: string
    author?: string
    content?: string
  }
}) => {
  const [imageError, setImageError] = useState(false)

  const imagePath = post.image || ''
  const showImage = imagePath && !imageError && imagePath.trim() !== ''

  return (
    <article className="group overflow-hidden rounded-xl border border-zinc-200 bg-white/80 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-white/90 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900/80 dark:backdrop-blur-md dark:hover:bg-zinc-900/90">
      <Link href={`/blog/${post.uid}`} className="block">
        {/* Image Section */}
        {showImage ? (
          <div className="relative h-48 w-full overflow-hidden bg-zinc-50 dark:bg-zinc-700">
            <Image
              src={imagePath}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              unoptimized={imagePath.startsWith('http')}
            />
          </div>
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700">
            <svg
              className="h-12 w-12 text-zinc-300 dark:text-zinc-500"
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
          </div>
        )}

        {/* Content Section */}
        <div className="p-6">
          {/* Date */}
          {post.date && post.dateFormatted && (
            <div className="mb-3">
              <time className="text-sm text-zinc-500 dark:text-zinc-400">
                {post.dateFormatted}
              </time>
            </div>
          )}

          {/* Title */}
          <h2 className="mb-3 line-clamp-2 text-xl leading-tight font-bold text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-200">
            {post.title}
          </h2>

          {/* Description */}
          <p className="mb-4 line-clamp-3 text-zinc-600 dark:text-zinc-300">
            {post.description}
          </p>

          {/* Tags and Reading Time */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {post.category && (
                <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 transition-colors group-hover:bg-zinc-200 group-hover:text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300 dark:group-hover:bg-zinc-600 dark:group-hover:text-zinc-200">
                  {post.category}
                </span>
              )}
            </div>
            {post.readingTime && (
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {post.readingTime} min read
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}

export default BlogPostCard
