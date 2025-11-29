/**
 * Simple in-memory rate limiter using sliding window algorithm
 * Tracks requests by IP address and enforces configurable limits
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map()
  private readonly limit: number
  private readonly windowMs: number

  constructor(limit: number = 10, windowMs: number = 60000) {
    this.limit = limit
    this.windowMs = windowMs

    // Cleanup old entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000)
  }

  /**
   * Check if request should be allowed
   * @param identifier - Unique identifier (e.g., IP address)
   * @returns Object with isAllowed flag and remaining requests
   */
  check(identifier: string): { isAllowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now()
    const entry = this.requests.get(identifier)

    // No previous requests or window expired
    if (!entry || now > entry.resetTime) {
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      })
      return {
        isAllowed: true,
        remaining: this.limit - 1,
        resetTime: now + this.windowMs,
      }
    }

    // Within rate limit
    if (entry.count < this.limit) {
      entry.count++
      return {
        isAllowed: true,
        remaining: this.limit - entry.count,
        resetTime: entry.resetTime,
      }
    }

    // Rate limit exceeded
    return {
      isAllowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    }
  }

  /**
   * Remove expired entries to prevent memory leaks
   */
  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key)
      }
    }
  }

  /**
   * Reset rate limit for a specific identifier (useful for testing)
   */
  reset(identifier: string): void {
    this.requests.delete(identifier)
  }

  /**
   * Get current stats (useful for monitoring)
   */
  getStats(): { totalTracked: number } {
    return {
      totalTracked: this.requests.size,
    }
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter(10, 60000) // 10 requests per minute
