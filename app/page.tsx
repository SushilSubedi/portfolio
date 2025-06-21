import { Briefcase, MapPin } from 'lucide-react'

import ChatBot from '@/components/ui/chatbot'
import Navigation from '@/components/ui/Navigation'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="relative w-full">
        <div className="absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <Navigation />
        </div>
      </header>

      <main className="relative flex flex-1 flex-col">
        <section className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
              {/* Left side - Hero content */}
              <div className="space-y-6 text-center lg:text-left">
                <div className="space-y-4">
                  <h1
                    className="animate-fade-in-up text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-zinc-100 [animation-delay:0.2s]"
                  >
                    Hello, World!
                    <span className="inline-block animate-bounce">👨‍💻</span>
                  </h1>
                  <p
                    className="animate-fade-in-up text-base leading-7 text-zinc-600 sm:text-lg dark:text-zinc-400 [animation-delay:0.4s]"
                  >
                    Full-stack developer crafting scalable solutions and elegant
                    user experiences.
                    <br />
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      Let's build something amazing together.
                    </span>
                  </p>
                </div>

                <div
                  className="animate-fade-in-up flex items-center justify-center space-x-6 text-sm text-zinc-500 lg:justify-start dark:text-zinc-400 [animation-delay:0.6s]"
                >
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Available for projects</span>
                  </div>
                  <div className="hidden sm:block">•</div>
                  <div className="hidden items-center space-x-2 sm:flex">
                    <MapPin className="h-4 w-4" />
                    <span>Based in Kathmandu, Nepal</span>
                  </div>
                </div>
              </div>

              {/* Right side - ChatBot */}
              <div
                className="animate-fade-in-up flex items-center justify-center [animation-delay:0.8s]"
              >
                <div className="w-full max-w-lg">
                  <ChatBot />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
