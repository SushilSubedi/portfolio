'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { Maximize2, Minimize2 } from 'lucide-react'

import { initialMessages } from '@/data/gemini/chatConfig'

import Form from './Form'
import MessageBox from './messageBox'

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { messages, input, handleSubmit, handleInputChange, status } = useChat({
    api: '/api/gemini',
    initialMessages,
  })

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className={`transition-all duration-300 ${isExpanded ? 'fixed inset-4 z-50 w-[98%] max-w-none' : 'relative w-full'}`}
    >
      {isExpanded && (
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={toggleExpanded}
        />
      )}
      <div
        className={`relative rounded-lg border bg-white shadow-lg transition-all duration-300 dark:bg-zinc-900 ${isExpanded ? 'border-zinc-300 shadow-2xl dark:border-zinc-600' : 'border-zinc-200 dark:border-zinc-700'}`}
      >
        {/* Header with expand/collapse button */}
        <div className="flex items-center justify-between border-b border-zinc-200 p-3 dark:border-zinc-700">
          <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Chat with SushilAI
          </h3>
          <button
            onClick={toggleExpanded}
            className="rounded-md p-1 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            aria-label={isExpanded ? 'Minimize chat' : 'Expand chat'}
          >
            {isExpanded ? (
              <Minimize2 className="h-4 w-4 cursor-pointer" />
            ) : (
              <Maximize2 className="h-4 w-4 cursor-pointer" />
            )}
          </button>
        </div>

        {/* Chat content */}
        <div className="p-4">
          <MessageBox
            messages={messages}
            isAIMessageLoading={status === 'submitted'}
            isExpanded={isExpanded}
          />
          <Form
            handleSubmit={handleSubmit}
            input={input}
            handleInputChange={handleInputChange}
            handleKeyDown={handleKeyDown}
            status={status}
          />
        </div>
      </div>
    </div>
  )
}
