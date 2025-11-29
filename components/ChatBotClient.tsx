'use client'

import dynamic from 'next/dynamic'

// Dynamically import the ChatBot component on the client only
const ChatBot = dynamic(() => import('@/components/ui/chatbot'), { ssr: false })

interface ChatBotClientProps {
  isMobileModal?: boolean
}

export default function ChatBotClient({ isMobileModal = false }: ChatBotClientProps) {
  return <ChatBot isMobileModal={isMobileModal} />
}
