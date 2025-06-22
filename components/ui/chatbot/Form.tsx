'use client'

import React, { memo } from 'react'
import { Send } from 'lucide-react'

const Form: React.FC<any> = ({
  input,
  handleInputChange,
  handleSubmit,
  handleKeyDown,
  status,
}) => {
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-end space-x-2 rounded-lg border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about my tech stack, projects, or development experience..."
          rows={1}
          autoFocus
          className="flex-1 resize-none bg-transparent text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder-zinc-500"
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
              ? 'cursor-not-allowed bg-zinc-200 text-zinc-400 dark:bg-zinc-700 dark:text-zinc-500'
              : 'bg-zinc-800 text-white hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300'
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
