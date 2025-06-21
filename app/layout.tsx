import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

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

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-gradient-to-br from-white via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900`}
      >
        <GoogleAnalytics
          GA_MEASUREMENT_ID={String(process.env.GOOGLE_ANALYTICS_ID)}
        />
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <Header />
            <div className="relative mx-auto flex w-full max-w-screen-xl flex-1 flex-col justify-between px-4 pt-4">
              <div className="flex h-full w-full flex-1 justify-center">
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
