'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import logo from '@/public/icons/logo.png'
import { motion } from 'framer-motion'

const links = [
  { href: '/projects', label: 'Projects', key: 'projects' },
  { href: '/about', label: 'About', key: 'about' },
  { href: '/blog', label: 'Blog', key: 'blog' },
  { href: '/contact-me', label: 'Contact', key: 'contact' },
]

const Navigation = () => {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredPath, setHoveredPath] = useState(pathname)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const isHome = pathname === '/'

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset hoveredPath when pathname changes to prevent pill from sticking
  useEffect(() => {
    setHoveredPath(pathname)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  
  // Check if we're on sitemap or terms pages
  const isUtilityPage = pathname === '/sitemap' || pathname === '/terms-and-policies'

  return (
    <motion.div
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: isHome ? 0.5 : 0,
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <nav
        className={cn(
          'flex w-full max-w-5xl items-center justify-between rounded-2xl border px-4 py-3 shadow-lg transition-all duration-300',
          isUtilityPage
            ? 'border-zinc-700/70 bg-zinc-900/95 backdrop-blur-xl'
            : 'border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-900/80',
        )}
      >
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 transition-opacity hover:opacity-80 dark:text-zinc-100"
          >
            <Image
              src={logo}
              alt="Sushil Logo"
              height="40"
              width="40"
              className="rounded-full"
              priority
            />
            <span>Sushil Subedi</span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden items-center gap-x-1 md:flex">
          {links.map(({ href, label, key }) => {
            const isActive = pathname === href
            return (
              <Link
                key={key}
                href={href}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'text-zinc-900 dark:text-zinc-100'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100',
                )}
                onMouseEnter={() => setHoveredPath(href)}
                onMouseLeave={() => setHoveredPath(pathname)}
              >
                <span className="relative z-10">{label}</span>
                {hoveredPath === href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 z-0 rounded-full bg-zinc-100 dark:bg-zinc-800"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-zinc-900 to-transparent dark:via-zinc-100" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            className="flex cursor-pointer items-center justify-center rounded-full p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full right-0 left-0 mt-2 overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/95 p-2 shadow-xl backdrop-blur-md md:hidden dark:border-zinc-800/50 dark:bg-zinc-900/95"
          >
            <div className="flex flex-col space-y-1">
              {links.map(({ href, label, key }) => {
                const isActive = pathname === href
                return (
                  <Link
                    key={key}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'rounded-xl px-4 py-3 text-base font-medium transition-all duration-200',
                      isActive
                        ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                        : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100',
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
    </motion.div>
  )
}

export default Navigation
