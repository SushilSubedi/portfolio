'use client'

import { Briefcase, MapPin } from 'lucide-react'
import ChatBotClient from '@/components/ChatBotClient'
import Navigation from '@/components/ui/Navigation'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <Navigation />

      <main className="relative flex flex-1 flex-col">
        <section className="flex flex-1 items-center justify-center px-2 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              {/* Left side - Hero content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8 text-center lg:text-left"
              >
                <div className="space-y-6">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
                  >
                    <span className="block text-zinc-100">Crafting</span>
                    <span className="bg-gradient-to-r from-zinc-100 to-zinc-500 bg-clip-text text-transparent">
                      Exceptional Digital Experiences
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mx-auto max-w-2xl text-lg leading-8 text-zinc-400 lg:mx-0"
                  >
                    I&apos;m a passionate software engineer specializing in
                    building scalable web applications and intuitive user
                    interfaces. Let&apos;s turn your vision into reality.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex flex-col items-center justify-center gap-4 text-sm text-zinc-500 sm:flex-row lg:justify-start"
                >
                  <div className="flex items-center gap-2 rounded-full bg-zinc-900/50 px-4 py-1.5 ring-1 ring-zinc-800">
                    <Briefcase className="h-4 w-4 text-zinc-400" />
                    <span>Available for projects</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-zinc-900/50 px-4 py-1.5 ring-1 ring-zinc-800">
                    <MapPin className="h-4 w-4 text-zinc-400" />
                    <span>Based in Kathmandu, Nepal</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right side - ChatBot */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-center justify-center"
              >
                <div className="w-full max-w-lg">
                  <ChatBotClient />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

