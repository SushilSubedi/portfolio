import Image from 'next/image'

interface BlogImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: string
}

export default function BlogImage({
  src,
  alt,
  width = 800,
  height = 400,
  caption,
}: BlogImageProps) {
  // Calculate aspect ratio for padding-bottom trick
  const aspectRatio = (height / width) * 100

  return (
    <figure className="my-8 w-full max-w-full">
      <div
        className="relative w-full overflow-hidden rounded-none bg-zinc-100 sm:rounded-lg dark:bg-zinc-800"
        style={{ paddingBottom: `${aspectRatio}%` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="bg-zinc-400 object-contain md:object-cover"
          unoptimized={src.startsWith('http')}
          sizes="100vw"
          priority={false}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
