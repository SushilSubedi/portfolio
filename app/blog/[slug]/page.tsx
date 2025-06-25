import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import Image from 'next/image'

import Cover from '@/components/mdx/Cover'
import BlogImage from '@/components/mdx/BlogImage'
import CodeBlock from '@/components/mdx/CodeBlock'
import PostInteractions from '@/components/PostInteractions'
import { BLOG_POSTS } from '@/data/blogs'
import BlogPostDate from '@/components/BlogPostDate'

const components = {
  Cover,
  BlogImage,
  pre: CodeBlock,
  img: BlogImage,
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.uid === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-full overflow-x-hidden bg-zinc-50/50 dark:bg-zinc-800/50">
      <div className="max-w-full-lg mx-auto w-full">
        {/* Hero Image Section */}
        {post.image && (
          <div className="relative h-56 w-full max-w-full overflow-hidden rounded-none bg-zinc-100 sm:h-80 sm:rounded-lg dark:bg-zinc-800">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              unoptimized={post.image.startsWith('http')}
              sizes="100vw"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="relative w-full max-w-full bg-white px-2 py-4 sm:px-6 sm:py-8 lg:px-12 lg:py-12 dark:bg-zinc-800">
          {/* Back Navigation */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mr-2 h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Article Header */}
          <header className="mb-10">
            <h1 className="mb-6 text-3xl leading-tight font-bold text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
              {post.date && (
                <BlogPostDate
                  dateString={post.date}
                  dateFormatted={post.dateFormatted}
                />
              )}
              {post.readingTime && (
                <>
                  <span className="text-zinc-300 dark:text-zinc-600">•</span>
                  <span>{post.readingTime} min read</span>
                </>
              )}
            </div>

            {/* Tags */}
            {post.category && (
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {post.category}
                </span>
              </div>
            )}
          </header>

          {/* Article Content */}
          <article className="prose prose-lg prose-zinc dark:prose-invert prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-white prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-a:text-zinc-900 dark:prose-a:text-zinc-200 prose-strong:text-zinc-900 dark:prose-strong:text-white prose-code:text-zinc-800 prose-code:bg-zinc-100 dark:prose-code:text-zinc-200 dark:prose-code:bg-zinc-800 prose-pre:!bg-zinc-900 dark:prose-pre:!bg-zinc-900 prose-pre:text-zinc-100 prose-pre:!m-0 max-w-full overflow-x-auto break-words">
            <MDXRemote source={post.content} components={components} />
          </article>

          {/* External Link */}
          {post.link && (
            <div className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-600 dark:bg-zinc-700">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Originally published on{' '}
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-zinc-900 transition-colors hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-200"
                >
                  dev.to
                </a>
              </p>
            </div>
          )}

          {/* Post Interactions */}
          <PostInteractions post={post} />
        </div>
      </div>
    </div>
  )
}
