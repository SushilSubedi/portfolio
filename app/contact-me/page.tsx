'use client'

import { useState } from 'react'

type FormData = {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<FormData>

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string>('')

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' }) // clear error on input
  }

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="flex w-full items-center justify-center px-2 py-6 sm:px-4 sm:py-12">
      <div className="w-full max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Get in Touch
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            I&apos;d love to hear from you! Fill out the form and I’ll get back
            to you shortly.
          </p>
        </div>

        {status && (
          <div
            className={`mb-6 rounded-md px-4 py-3 text-center font-medium ${
              submitted
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
            }`}
          >
            {status}
          </div>
        )}

        {!submitted ? (
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
                  className={`w-full rounded-md border bg-white px-4 py-2.5 text-zinc-900 shadow-sm focus:ring-1 focus:outline-none dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400 ${
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
                  className={`w-full rounded-md border bg-white px-4 py-2.5 text-zinc-900 shadow-sm focus:ring-1 focus:outline-none dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400 ${
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
                className={`w-full rounded-md border bg-white px-4 py-2.5 text-zinc-900 shadow-sm focus:ring-1 focus:outline-none dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400 ${
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
        ) : (
          <div className="mt-10 text-center">
            <h3 className="text-2xl font-semibold text-green-500 dark:text-green-400">
              Thank you!
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Your message has been successfully sent. Let&apos;s build
              something amazing together!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
