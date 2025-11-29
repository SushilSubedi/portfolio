'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useChat } from '@ai-sdk/react'
import { Maximize2, Minimize2 } from 'lucide-react'

import { initialMessages } from '@/data/gemini/chatConfig'

import Form from './Form'
import MessageBox from './messageBox'

interface ChatBotProps {
  isMobileModal?: boolean
}

export default function Page({ isMobileModal = false }: ChatBotProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const { messages, input, handleSubmit, handleInputChange, status } = useChat({
    api: '/api/gemini',
    initialMessages,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpanded(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setIsExpanded])

  const ChatContent = (
    <div
      className={`rounded-lg shadow-lg transition-all duration-300 ${
        isExpanded && !isMobileModal
          ? 'fixed inset-4 z-[100] flex flex-col bg-zinc-900/95 shadow-2xl backdrop-blur-xl'
          : 'relative flex h-[450px] w-full flex-col xl:h-[500px]'
      }`}
    >
      <div className="relative flex h-full w-full flex-col">
        {!isMobileModal && (
          <button
            onClick={toggleExpanded}
            className="absolute right-2 top-2 z-10 rounded-md p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
            aria-label={isExpanded ? 'Minimize chat' : 'Expand chat'}
          >
            {isExpanded ? (
              <Minimize2 className="h-4 w-4 cursor-pointer" />
            ) : (
              <Maximize2 className="h-4 w-4 cursor-pointer" />
            )}
          </button>
        )}

        <MessageBox
          messages={messages}
          isAIMessageLoading={status === 'submitted'}
          isExpanded={isMobileModal ? true : isExpanded}
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

  if (mounted && isExpanded && !isMobileModal) {
    return (
      <>
        <div className="h-[450px] w-full opacity-0 xl:h-[500px]" aria-hidden="true" />
        {createPortal(ChatContent, document.body)}
      </>
    )
  }

  return ChatContent
}


