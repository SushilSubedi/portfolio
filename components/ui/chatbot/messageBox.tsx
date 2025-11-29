'use client'

import React, { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'

import { MessageBoxProps, Part } from '@/constants/types/index'

interface ExtendedMessageBoxProps extends MessageBoxProps {
  isExpanded?: boolean
}

function MessageBox({
  messages,
  isAIMessageLoading,
  isExpanded = false,
}: ExtendedMessageBoxProps) {
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
    <div
      className={`flex-1 overflow-hidden transition-all duration-300`}
    >
      <div
        className="h-full overflow-y-auto rounded-lg border border-zinc-700/50 bg-zinc-900/60 p-4 shadow-lg backdrop-blur-xl"
        ref={scrollContainerRef}
      >
        <div className="min-h-16 space-y-4 py-2 pr-2">
          {messages.map((message, index: number) => (
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
                  className={cn(
                    'w-full rounded-lg p-3 text-sm shadow-sm transition-all duration-200 hover:shadow-md',
                    message.role === 'user'
                      ? 'bg-zinc-800/80 text-zinc-100 backdrop-blur-sm ring-1 ring-zinc-700/50'
                      : 'bg-zinc-800/60 text-zinc-100 backdrop-blur-sm ring-1 ring-zinc-700/30',
                  )}
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
                                {part.text || ''}
                              </ReactMarkdown>
                            </div>
                          )
                        case 'reasoning':
                          return (
                            <div
                              key={partIndex}
                              className="mb-2 text-sm text-zinc-600 italic dark:text-zinc-400"
                            >
                              {part.reasoning}
                            </div>
                          )
                        case 'tool-invocation':
                          return (
                            <div
                              key={partIndex}
                              className="mb-2 text-sm text-zinc-500 dark:text-zinc-500"
                            >
                              Tool invocation:{' '}
                              {JSON.stringify(part.toolInvocation)}
                            </div>
                          )
                        case 'source':
                        case 'file':
                        case 'step-start':
                          return (
                            <div
                              key={partIndex}
                              className="mb-2 text-sm text-zinc-500 dark:text-zinc-500"
                            >
                              {part.type}: {JSON.stringify(part)}
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
                            <code className="rounded bg-zinc-700 px-1 py-0.5 text-xs text-zinc-100">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="mb-2 overflow-x-auto rounded bg-zinc-700 p-2 text-xs text-zinc-100">
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
              <div
                className={cn(
                  'flex items-center space-x-2 rounded-lg p-3 shadow-sm',
                  'bg-zinc-800/60 backdrop-blur-sm ring-1 ring-zinc-700/30',
                )}
              >
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-300 [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-300 [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-300"></div>
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
