'use client'

import React, { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'

import { MessageBoxProps, Part } from '@/constants/types'

function MessageBox({ messages, isAIMessageLoading }: MessageBoxProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, isAIMessageLoading])

  return (
    <div className="h-[40vh] min-h-[300px]">
      <div
        className="h-full overflow-y-auto rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
        ref={scrollContainerRef}
      >
        <div className="min-h-16 space-y-4 py-2 pr-2">
          {messages.map((message: any, index: number) => (
            <div
              key={message.id}
              className={`animate-fade-in flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both',
              }}
            >
              <div
                className={`max-w-full transition-all duration-300 ${message.role === 'user' ? 'md:max-w-[70%]' : 'md:max-w-[85%]'}`}
              >
                <div
                  className={`w-full rounded-lg p-3 text-sm shadow-sm transition-all duration-200 hover:shadow-md ${
                    message.role === 'user'
                      ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-600 dark:text-zinc-100'
                      : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
                  }`}
                >
                  {message.parts ? (
                    message.parts.map((part: Part, partIndex: number) => {
                      switch (part.type) {
                        case 'text':
                          return (
                            <div
                              key={partIndex}
                              className="prose prose-sm prose-zinc dark:prose-invert max-w-none"
                            >
                              <ReactMarkdown
                                components={{
                                  p: ({ children }) => (
                                    <p className="mb-2 last:mb-0">{children}</p>
                                  ),
                                  ul: ({ children }) => (
                                    <ul className="mb-2 ml-4 list-disc">
                                      {children}
                                    </ul>
                                  ),
                                  ol: ({ children }) => (
                                    <ol className="mb-2 ml-4 list-decimal">
                                      {children}
                                    </ol>
                                  ),
                                  li: ({ children }) => (
                                    <li className="mb-1">{children}</li>
                                  ),
                                  code: ({ children }) => (
                                    <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-600">
                                      {children}
                                    </code>
                                  ),
                                  pre: ({ children }) => (
                                    <pre className="mb-2 overflow-x-auto rounded bg-zinc-200 p-2 text-xs dark:bg-zinc-600">
                                      {children}
                                    </pre>
                                  ),
                                }}
                              >
                                {part.text}
                              </ReactMarkdown>
                            </div>
                          )
                        default:
                          return null
                      }
                    })
                  ) : (
                    <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-2 ml-4 list-disc">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-2 ml-4 list-decimal">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="mb-1">{children}</li>
                          ),
                          code: ({ children }) => (
                            <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-600">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="mb-2 overflow-x-auto rounded bg-zinc-200 p-2 text-xs dark:bg-zinc-600">
                              {children}
                            </pre>
                          ),
                        }}
                      >
                        {message.content || ''}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isAIMessageLoading && (
            <div className="animate-fade-in flex items-center justify-start">
              <div className="flex items-center space-x-2 rounded-lg bg-zinc-100 p-3 shadow-sm dark:bg-zinc-700">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s] dark:bg-zinc-500"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s] dark:bg-zinc-500"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 dark:bg-zinc-500"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(MessageBox)
