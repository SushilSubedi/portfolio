'use client'

import { ReactNode, useState } from 'react'

interface CodeBlockProps {
  children: ReactNode
  className?: string
}

// Helper function to extract text content from React elements
const getTextContent = (children: ReactNode): string => {
  if (typeof children === 'string') {
    return children
  }

  if (Array.isArray(children)) {
    return children.map(getTextContent).join('')
  }

  if (children && typeof children === 'object' && 'props' in children) {
    return getTextContent(
      (children as { props: { children: ReactNode } }).props.children,
    )
  }

  return String(children || '')
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const language = className?.replace('language-', '') || 'text'

  const copyToClipboard = async () => {
    try {
      const text = getTextContent(children).trim()
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="my-6 w-full max-w-full overflow-x-auto rounded-none border border-zinc-200 sm:rounded-lg dark:border-zinc-700">
      <div className="flex items-center justify-between bg-zinc-50 px-4 py-2 dark:bg-zinc-800">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className="flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <>
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="m-0 w-full overflow-x-auto bg-zinc-900 p-3 text-base sm:p-4 dark:bg-zinc-900">
        <code className="text-zinc-100 dark:text-zinc-200">{children}</code>
      </pre>
    </div>
  )
}
