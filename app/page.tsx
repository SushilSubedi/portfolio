'use client'

import { Briefcase, MapPin, MessageCircle, X } from 'lucide-react'
import ChatBotClient from '@/components/ChatBotClient'
import Navigation from '@/components/ui/Navigation'
import FloatingParticles from '@/components/FloatingParticles'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="flex h-full flex-col">
      <Navigation />

      <main className="relative flex flex-1 flex-col">
        <section className="relative flex flex-1 items-center justify-center overflow-hidden px-2 sm:px-6 lg:px-8">
          {/* Floating Particles Background */}
          <FloatingParticles />
          
          <div className="relative z-10 mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              {/* Left side - Hero content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6 text-center lg:text-left"
              >
                <div className="space-y-6">
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
                  >
                    <span className="block text-zinc-100">Crafting</span>
                    <span className="bg-gradient-to-r from-zinc-100 to-zinc-500 bg-clip-text text-transparent">
                      Exceptional Digital Experiences
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mx-auto max-w-2xl text-lg leading-8 text-zinc-400 lg:mx-0"
                  >
                    I&apos;m a passionate software engineer specializing in
                    building scalable web applications and intuitive user
                    interfaces. Let&apos;s turn your vision into reality.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex flex-col items-center justify-center gap-4 text-sm text-zinc-500 sm:flex-row lg:justify-start"
                >
                  <Link 
                    href="/contact-me"
                    className="flex items-center gap-2 rounded-full bg-zinc-900/50 px-4 py-1.5 ring-1 ring-zinc-800 transition-colors hover:bg-zinc-800/80"
                  >
                    <Briefcase className="h-4 w-4 text-zinc-400" />
                    <span>Available for projects</span>
                  </Link>
                  <div className="flex items-center gap-2 rounded-full bg-zinc-900/50 px-4 py-1.5 ring-1 ring-zinc-800">
                    <MapPin className="h-4 w-4 text-zinc-400" />
                    <span>Based in Kathmandu, Nepal</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right side - ChatBot (hidden on mobile) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="hidden items-center justify-center lg:flex"
              >
                <div className="w-full max-w-lg">
                  <ChatBotClient />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Chat Button (mobile only) */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800/90 text-zinc-100 shadow-lg ring-1 ring-zinc-700/50 backdrop-blur-xl transition-all duration-300 hover:bg-zinc-700/90 hover:scale-110 lg:hidden"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Modal (mobile only) */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col justify-end bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsChatOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative flex h-[85dvh] w-full flex-col rounded-t-3xl bg-zinc-950 p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsChatOpen(false)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800/50 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>

              {/* ChatBot */}
              <div className="flex-1 overflow-hidden">
                <ChatBotClient isMobileModal={true} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


