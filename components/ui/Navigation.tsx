'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { cn } from '@/lib/utils'

const links = [
  { href: '/projects', label: 'Projects', key: '5' },
  { href: '/about-me', label: 'About', key: '2' },
  { href: '/blog', label: 'Blog', key: '3' },
  { href: '/contact-me', label: 'Contact', key: '4' },
]

const Navigation = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="relative z-50 flex w-full items-center justify-between">
      {/* Logo/Name */}
      <div className="flex-shrink-0">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-zinc-900 transition-colors hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300"
        >
          Sushil Subedi
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden items-center gap-x-8 md:flex">
        {links.map(({ href, label, key }) => {
          const isActive = pathname === href
          return (
            <Link
              key={key}
              href={href}
              className={cn(
                'relative px-1 py-2 text-base font-medium transition-colors duration-200',
                'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100',
                isActive && 'text-zinc-900 dark:text-zinc-100',
              )}
            >
              {label}
              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-zinc-900 dark:bg-zinc-100" />
              )}
            </Link>
          )
        })}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center md:hidden">
        <button
          className="flex cursor-pointer items-center justify-center rounded-md p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
          ) : (
            <Menu className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="animate-fade-in absolute top-14 right-0 mt-2 w-full rounded-xl border border-zinc-200 bg-white/95 p-4 ring-1 shadow-xl shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm md:hidden dark:border-zinc-700 dark:bg-zinc-800/95 dark:shadow-zinc-900/20 dark:ring-white/10"
        >
          <div className="flex flex-col space-y-2">
            {links.map(({ href, label, key }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'rounded-md px-4 py-3 text-base font-medium transition-all duration-200',
                    'text-zinc-700 dark:text-zinc-300',
                    'hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-700 dark:hover:text-white',
                    isActive &&
                      'bg-zinc-100 font-semibold text-zinc-900 dark:bg-zinc-700 dark:text-white',
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
