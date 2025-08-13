'use client'

import { usePathname } from 'next/navigation'

import Navigation from '@/components/ui/Navigation'

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  if (isHome) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/20 bg-white/10 py-1 backdrop-blur-xl dark:border-zinc-700/20 dark:bg-zinc-900/10">
      <div className="flex justify-between px-6">
        <Navigation />
      </div>
    </header>
  )
}
