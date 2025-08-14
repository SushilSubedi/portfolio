'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react'

type FormData = {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<FormData>

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const validate = () => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setLoading(true)
    setStatus('')
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (response.ok) {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'contact_form_submission', {
            event_category: 'Contact',
            event_label: 'Contact Form Submission',
            value: 1,
          })
        }
        setStatus('Message sent successfully!')
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus(data.error || 'Failed to send message.')
      }
    } catch {
      setStatus('Something went wrong. Please try again later.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="mt-10 text-center">
        <h3 className="text-2xl font-semibold text-green-500 dark:text-green-400">
          Thank you!
        </h3>
        <p className="mt-2 text-zinc-300 dark:text-zinc-400">
          Your message has been successfully sent. Let&apos;s build something amazing
          together!
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl dark:text-zinc-100">
          Get in Touch
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300 dark:text-zinc-400">
          I&apos;d love to hear from you! Fill out the form and I&apos;ll get back to you
          shortly.
        </p>
      </div>
      {status && (
        <div
          className={`mb-6 rounded-md px-4 py-3 text-center font-medium ${
            status.includes('success')
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
          }`}
        >
          {status}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Name
            </label>
            <input
              name="name"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={`w-full rounded-md border bg-white/80 px-4 py-2.5 text-zinc-900 shadow-sm backdrop-blur-sm focus:ring-1 focus:outline-none dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder-zinc-400 dark:backdrop-blur-sm ${
                errors.name
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 dark:border-zinc-700 dark:focus:border-zinc-600'
              }`}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full rounded-md border bg-white/80 px-4 py-2.5 text-zinc-900 shadow-sm backdrop-blur-sm focus:ring-1 focus:outline-none dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder-zinc-400 dark:backdrop-blur-sm ${
                errors.email
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 dark:border-zinc-700 dark:focus:border-zinc-600'
              }`}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here..."
            className={`w-full rounded-md border bg-white/80 px-4 py-2.5 text-zinc-900 shadow-sm backdrop-blur-sm focus:ring-1 focus:outline-none dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder-zinc-400 dark:backdrop-blur-sm ${
              errors.message
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 dark:border-zinc-700 dark:focus:border-zinc-600'
            }`}
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-500">{errors.message}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-block w-full rounded-md bg-zinc-800 px-8 py-3 font-semibold text-white transition hover:bg-zinc-700 focus:ring-4 focus:ring-zinc-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </>
  )
}
