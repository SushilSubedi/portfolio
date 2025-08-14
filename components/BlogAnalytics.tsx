 'use client'

 import { useEffect } from 'react'

 interface BlogAnalyticsProps {
   slug: string
   title: string
 }

 /**
  * Fires a custom Google Analytics event for blog post views.
  */
 export default function BlogAnalytics({ slug, title }: BlogAnalyticsProps) {
   useEffect(() => {
     if (
       process.env.NODE_ENV !== 'production' ||
       typeof window === 'undefined'
     ) {
       return
     }
     const gtag = (window as any).gtag
     if (typeof gtag === 'function') {
       gtag('event', 'blog_view', {
         event_category: 'Blog',
         event_label: title,
         slug,
       })
     }
   }, [slug, title])
   return null
 }