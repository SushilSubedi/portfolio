'use client'

import { usePathname } from 'next/navigation'

import Navigation from '@/components/ui/Navigation'

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  if (isHome) return null

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 py-2 shadow-sm backdrop-blur-lg dark:bg-zinc-800/80">
      <div className="flex justify-between px-6 py-2">
        <Navigation />
      </div>
    </header>
  )
}
