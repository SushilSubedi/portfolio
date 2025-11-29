import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { streamText } from 'ai'

import { chatHistory } from '@/data/gemini/chatConfig'
import { rateLimiter } from '@/lib/rate-limit'
import { validateMessages, sanitizeContent } from '@/lib/input-validation'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
})

/**
 * Get client IP address from request headers
 */
function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIp) {
    return realIp
  }
  
  return 'unknown'
}

/**
 * Create error response with security headers
 */
function createErrorResponse(
  message: string,
  status: number,
  headers?: Record<string, string>,
): Response {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        ...headers,
      },
    },
  )
}

export async function POST(request: Request) {
  try {
    // Validate API key exists
    if (!process.env.GOOGLE_API_KEY) {
      console.error('GOOGLE_API_KEY is not configured')
      return createErrorResponse('Service temporarily unavailable', 503)
    }

    // Get client IP for rate limiting
    const clientIp = getClientIp(request)

    // Check rate limit
    const rateLimitResult = rateLimiter.check(clientIp)
    if (!rateLimitResult.isAllowed) {
      const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
      return createErrorResponse(
        'Too many requests. Please try again later.',
        429,
        {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        },
      )
    }

    // Parse request body
    let data: unknown
    try {
      data = await request.json()
    } catch {
      return createErrorResponse('Invalid JSON in request body', 400)
    }

    // Validate request structure
    if (!data || typeof data !== 'object' || !('messages' in data)) {
      return createErrorResponse('Request must include messages array', 400)
    }

    const { messages } = data as { messages: unknown }

    // Validate messages
    const validationResult = validateMessages(messages)
    if (!validationResult.isValid) {
      return createErrorResponse(
        validationResult.error || 'Invalid message format',
        400,
      )
    }

    // Sanitize message content
    const sanitizedMessages = (messages as Array<{ role: string; content: string }>).map(
      (msg) => ({
        ...msg,
        content: sanitizeContent(msg.content),
      }),
    )

    // Combine with chat history
    const fullMessages = [
      ...JSON.parse(JSON.stringify(chatHistory)),
      ...sanitizedMessages,
    ]

    // Create AI model and generate response
    const model = google('models/gemini-2.0-flash')
    const result = await streamText({ model, messages: fullMessages })

    // Return streaming response with security headers
    const response = result.toDataStreamResponse()
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-RateLimit-Limit', '10')
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString())
    response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString())

    return response
  } catch (error) {
    // Log error for debugging (server-side only)
    console.error('Gemini API error details:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }

    // Return sanitized error to client (no implementation details)
    return createErrorResponse(
      'An error occurred while processing your request. Please try again later.',
      500,
    )
  }
}
