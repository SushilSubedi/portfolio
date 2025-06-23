import { Message } from 'ai'

export type Part = {
  type: string
  text: string
}

export interface MessageBoxProps {
  messages: any[]
  isAIMessageLoading: boolean
  isExpanded?: boolean
}

export type FormProps = {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  status: string
}
