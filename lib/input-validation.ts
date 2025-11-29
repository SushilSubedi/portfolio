/**
 * Input validation and sanitization utilities for chat messages
 * Prevents prompt injection, oversized payloads, and malicious content
 */

const MAX_MESSAGE_LENGTH = 1000
const MAX_MESSAGES_PER_REQUEST = 20
const MAX_TOTAL_CONTENT_LENGTH = 5000

// Patterns that might indicate prompt injection attempts
const SUSPICIOUS_PATTERNS = [
  /ignore\s+(previous|above|all)\s+instructions?/i,
  /you\s+are\s+now/i,
  /new\s+instructions?:/i,
  /system\s*:/i,
  /\[SYSTEM\]/i,
  /<\|im_start\|>/i,
  /<\|im_end\|>/i,
]

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export interface Message {
  role: string
  content: string
}

/**
 * Validate message array structure and content
 */
export function validateMessages(messages: unknown): ValidationResult {
  // Check if messages is an array
  if (!Array.isArray(messages)) {
    return {
      isValid: false,
      error: 'Messages must be an array',
    }
  }

  // Check array length
  if (messages.length === 0) {
    return {
      isValid: false,
      error: 'Messages array cannot be empty',
    }
  }

  if (messages.length > MAX_MESSAGES_PER_REQUEST) {
    return {
      isValid: false,
      error: `Too many messages. Maximum ${MAX_MESSAGES_PER_REQUEST} messages allowed`,
    }
  }

  let totalContentLength = 0

  // Validate each message
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i]

    // Check message structure
    if (!message || typeof message !== 'object') {
      return {
        isValid: false,
        error: `Invalid message at index ${i}`,
      }
    }

    const { role, content } = message as Message

    // Validate role
    if (!role || typeof role !== 'string') {
      return {
        isValid: false,
        error: `Invalid role at message index ${i}`,
      }
    }

    if (!['user', 'assistant', 'system'].includes(role)) {
      return {
        isValid: false,
        error: `Invalid role "${role}" at message index ${i}. Must be user, assistant, or system`,
      }
    }

    // Validate content
    if (typeof content !== 'string') {
      return {
        isValid: false,
        error: `Invalid content at message index ${i}. Content must be a string`,
      }
    }

    if (content.length === 0) {
      return {
        isValid: false,
        error: `Empty content at message index ${i}`,
      }
    }

    if (content.length > MAX_MESSAGE_LENGTH) {
      return {
        isValid: false,
        error: `Message at index ${i} exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters`,
      }
    }

    totalContentLength += content.length

    // Check for suspicious patterns (only in user messages)
    if (role === 'user') {
      const suspiciousPattern = SUSPICIOUS_PATTERNS.find((pattern) =>
        pattern.test(content),
      )
      if (suspiciousPattern) {
        return {
          isValid: false,
          error: 'Message contains suspicious content',
        }
      }
    }
  }

  // Check total content length
  if (totalContentLength > MAX_TOTAL_CONTENT_LENGTH) {
    return {
      isValid: false,
      error: `Total content length exceeds maximum of ${MAX_TOTAL_CONTENT_LENGTH} characters`,
    }
  }

  return { isValid: true }
}

/**
 * Sanitize message content to remove potentially harmful characters
 */
export function sanitizeContent(content: string): string {
  // Remove null bytes
  let sanitized = content.replace(/\0/g, '')

  // Trim excessive whitespace
  sanitized = sanitized.trim()

  // Limit consecutive newlines
  sanitized = sanitized.replace(/\n{4,}/g, '\n\n\n')

  return sanitized
}
