import { FormProps, MessageBoxProps } from './chatbot'

export type { FormProps, MessageBoxProps }

export interface Part {
  type:
    | 'text'
    | 'reasoning'
    | 'tool-invocation'
    | 'source'
    | 'file'
    | 'step-start'
  text?: string
  reasoning?: string
  toolInvocation?: any
  source?: any
  file?: any
  stepStart?: any
}
