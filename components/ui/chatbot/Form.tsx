'use client'

import React, { memo } from 'react'
import { Send } from 'lucide-react'

import { FormProps } from '@/constants/types/index'

const Form: React.FC<FormProps> = ({
  input,
  handleInputChange,
  handleSubmit,
  handleKeyDown,
  status,
}) => {
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-end space-x-2 rounded-lg border border-zinc-700/50 bg-zinc-900/60 p-3 shadow-lg backdrop-blur-xl">
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about my tech stack, projects, or development experience..."
          rows={1}
          autoFocus
          className="flex-1 resize-none bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
          style={{
            minHeight: '24px',
            maxHeight: '120px',
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement
            target.style.height = 'auto'
            target.style.height = Math.min(target.scrollHeight, 120) + 'px'
          }}
        />
        <button
          type="submit"
          className={`flex items-center justify-center rounded-md p-2 transition-all duration-200 ${
            status === 'submitted' || !input.trim()
              ? 'cursor-not-allowed bg-zinc-700/50 text-zinc-500'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          disabled={status === 'submitted' || !input.trim()}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  )
}

export default memo(Form)
