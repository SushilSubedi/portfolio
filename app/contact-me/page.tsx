import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import { SOCIAL_LINKS } from '@/data/data'

export const metadata: Metadata = {
  title: 'Contact Me | Sushil Subedi',
  description:
    'Get in touch with Sushil Subedi to discuss projects, opportunities, or questions.',
}

export default function Contact() {
  return (
    <div className="relative isolate min-h-[calc(100vh-4rem)] bg-white dark:bg-zinc-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-14 pb-20 sm:pt-24 lg:static lg:px-8 lg:py-24">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-zinc-100 ring-1 ring-zinc-900/10 lg:w-1/2 dark:bg-zinc-900/20 dark:ring-white/5">
              <svg
                className="absolute top-[calc(100%-13rem)] -left-56 w-[72.1875rem] transform-gpu blur-3xl lg:top-[calc(50%-13rem)] lg:left-[max(-14rem,calc(100%-59rem))]"
                viewBox="0 0 1155 678"
                aria-hidden="true"
              >
                <path
                  fill="url(#c045816e-8155-4184-b48e-57253eccf9bf)"
                  fillOpacity=".2"
                  d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                />
                <defs>
                  <linearGradient
                    id="c045816e-8155-4184-b48e-57253eccf9bf"
                    x1="1155.49"
                    x2="-78.208"
                    y1=".177"
                    y2="474.645"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#9089FC" />
                    <stop offset={1} stopColor="#FF80B5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
              Get in touch
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              I&apos;d love to hear from you! Whether you have a question about my
              work, want to discuss a potential project, or just want to say hi,
              feel free to drop me a message.
            </p>
            <dl className="mt-10 space-y-4 text-base leading-7 text-zinc-600 dark:text-zinc-300">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <Mail className="h-7 w-6 text-zinc-400" aria-hidden="true" />
                </dt>
                <dd>
                  <a
                    className="hover:text-zinc-900 dark:hover:text-zinc-100"
                    href={`mailto:${SOCIAL_LINKS.EMAIL}`}
                  >
                    {SOCIAL_LINKS.EMAIL}
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <MapPin
                    className="h-7 w-6 text-zinc-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>Kathmandu, Nepal</dd>
              </div>
            </dl>

            <div className="mt-10 flex gap-x-6">
              <Link
                href={SOCIAL_LINKS.GITHUB}
                target="_blank"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" aria-hidden="true" />
              </Link>
              <Link
                href={SOCIAL_LINKS.LINKEDIN}
                target="_blank"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" aria-hidden="true" />
              </Link>
              <Link
                href={SOCIAL_LINKS.TWITTER}
                target="_blank"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" aria-hidden="true" />
              </Link>
              <Link
                href={SOCIAL_LINKS.INSTAGRAM}
                target="_blank"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <div className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="rounded-2xl bg-zinc-50 p-2 ring-1 ring-zinc-200 lg:mx-0 lg:max-w-none dark:bg-zinc-900 dark:ring-zinc-800">
              <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 sm:p-8 dark:bg-zinc-950 dark:ring-white/10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
