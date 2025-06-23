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

  return (
    <div
      className={`relative rounded-l shadow-lg transition-all duration-300 ${isExpanded ? 'fixed inset-4 z-50 h-full w-[98%] max-w-none shadow-2xl' : 'w-full'}`}
    >
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
  )
}
