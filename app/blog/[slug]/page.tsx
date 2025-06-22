import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

import Cover from '@/components/mdx/Cover'
import PostInteractions from '@/components/PostInteractions'
import { BLOG_POSTS } from '@/data/blogs'

const components = {
  Cover,
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
    <div className="mx-auto rounded-xl px-6 py-10 shadow-xl sm:px-8 md:px-10">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="mr-1.5 h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clipRule="evenodd"
          />
        </svg>
        Back to Blog
      </Link>
      <h1 className="mb-3 text-3xl leading-tight font-extrabold text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
        {post.title}
      </h1>
      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
        {post.author && <span>By {post.author}</span>}
        {post.date && (
          <>
            <span className="hidden sm:inline">•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </>
        )}
        {post.readingTime && (
          <>
            <span className="hidden sm:inline">•</span>
            <span>{post.readingTime} min read</span>
          </>
        )}
      </div>

      <hr className="mb-8 border-slate-200 dark:border-zinc-700" />

      <article className="prose prose-slate prose-lg dark:prose-invert mx-auto max-w-none">
        <MDXRemote source={post.content} components={components} />
      </article>

      {/* Add the interactions component here */}
      <PostInteractions post={post} />
    </div>
  )
}
