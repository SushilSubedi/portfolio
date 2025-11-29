import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { cn } from '@/lib/utils'
import { Suspense } from 'react'

import './globals.css'
import Header from './header'
import Footer from './footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: 'Sushil Subedi - JS & Rails Developer',
  description:
    'A dedicated and professional software engineering working on tech industry for more than 4 years.',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('font-sans antialiased', inter.variable)}
        suppressHydrationWarning={true}
      >
        {process.env.NODE_ENV === 'production' &&
          process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <Suspense fallback={null}>
              <GoogleAnalytics
                GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
              />
            </Suspense>
          )}
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          storageKey="theme"
          defaultTheme="dark"
          forcedTheme="dark"
        >
          <div className="relative min-h-screen w-full bg-black">
            {/* Pearl Mist Background with Top Glow */}
            <div
              className="absolute inset-0 z-0"
              style={{
                background:
                  'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000',
              }}
            />
            <div className="relative z-10 flex min-h-screen w-full flex-col font-[family-name:var(--font-inter)]">
              <Header />
              <div className="relative mx-auto flex w-full max-w-screen-xl flex-1 flex-col justify-between px-2 pt-2 sm:px-4 sm:pt-4">
                <div className="flex h-full w-full flex-1 justify-center">
                  {children}
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
