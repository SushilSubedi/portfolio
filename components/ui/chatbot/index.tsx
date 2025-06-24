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
      className={`rounded-l shadow-lg transition-all duration-300 ${isExpanded ? 'fixed inset-4 z-50 h-full w-[98%] max-w-none shadow-2xl' : 'w-full'}`}
    >
      <div className="relative h-full w-full">
        <button
          onClick={toggleExpanded}
          className="absolute top-2 right-2 z-10 rounded-md p-1 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          aria-label={isExpanded ? 'Minimize chat' : 'Expand chat'}
        >
          {isExpanded ? (
            <Minimize2 className="h-4 w-4 cursor-pointer" />
          ) : (
            <Maximize2 className="h-4 w-4 cursor-pointer" />
          )}
        </button>

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
  )
}
