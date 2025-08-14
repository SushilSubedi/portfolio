'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID?: string
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isProduction = process.env.NODE_ENV === 'production'

  useEffect(() => {
    if (
      !GA_MEASUREMENT_ID ||
      !isProduction ||
      typeof window === 'undefined' ||
      navigator.doNotTrack === '1' ||
      navigator.doNotTrack === 'yes'
    ) {
      return
    }
    const gtagFn = (window as any).gtag
    if (typeof gtagFn !== 'function') {
      return
    }
    const query = searchParams.toString()
    const page_path = query ? `${pathname}?${query}` : pathname
    gtagFn('config', GA_MEASUREMENT_ID, {
      page_path,
      anonymize_ip: true,
    })
  }, [pathname, searchParams, GA_MEASUREMENT_ID, isProduction])

  if (!GA_MEASUREMENT_ID || !isProduction) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname + window.location.search,
              anonymize_ip: true
            });
          `,
        }}
      />
    </>
  )
}
