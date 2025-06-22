'use client'

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useMemo } from 'react'
import BlogPostCard from '@/components/BlogPostCard'
import { BLOG_POSTS } from '@/data/blogs'

const POSTS_PER_PAGE = 6 // Or any number you prefer

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const categories = useMemo(() => {
    const allCategories = BLOG_POSTS.map((post) => post.category).filter(
      Boolean,
    ) as string[]
    return ['All', ...new Set(allCategories)]
  }, [])

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const titleMatch = post.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const categoryMatch =
        selectedCategory === 'All' ||
        selectedCategory === '' ||
        post.category === selectedCategory
      return titleMatch && categoryMatch
    })
  }, [searchQuery, selectedCategory])

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE
    return filteredPosts.slice(startIndex, endIndex)
  }, [filteredPosts, currentPage])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0) // Scroll to top on page change
  }

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Writing on Code & Design
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Thoughts on building software, navigating career paths, and the
          intersection of technology and creativity.
        </p>
      </div>

      {/* Search and Filter UI */}
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1) // Reset to first page on search
            }}
            className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2.5 pr-10 text-zinc-900 shadow-sm focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-600 dark:focus:ring-zinc-600"
          />
          <svg
            className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="relative min-w-[200px]">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setCurrentPage(1) // Reset to first page on filter change
            }}
            className="w-full appearance-none rounded-md border border-zinc-300 bg-white px-4 py-2.5 pr-8 text-zinc-900 shadow-sm focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-600 dark:focus:ring-zinc-600"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a 1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {paginatedPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <BlogPostCard key={post.uid} post={post} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <nav
              className="mt-16 flex items-center justify-center space-x-2"
              aria-label="Pagination"
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Previous
              </button>

              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
                    currentPage === number
                      ? 'border-zinc-500 bg-zinc-500 text-white dark:border-zinc-600 dark:bg-zinc-600'
                      : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Next
              </button>
            </nav>
          )}
        </>
      ) : (
        <div className="col-span-full py-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-zinc-400 dark:text-zinc-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-zinc-800 dark:text-zinc-200">
            No articles found
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Try adjusting your search or filter to find what you&apos;re looking
            for.
          </p>
        </div>
      )}
    </div>
  )
}
