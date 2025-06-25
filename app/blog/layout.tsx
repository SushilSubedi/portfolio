'use client'

export default function LayoutBlogPost({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      <div className="pointer-events-none fixed top-0 left-0 z-10 h-12 w-full bg-gradient-to-b from-white to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:from-zinc-950" />
      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
