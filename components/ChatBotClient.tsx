'use client'

import dynamic from 'next/dynamic'

// Dynamically import the ChatBot component on the client only
const ChatBot = dynamic(() => import('@/components/ui/chatbot'), { ssr: false })

export default function ChatBotClient() {
  return <ChatBot />
}
