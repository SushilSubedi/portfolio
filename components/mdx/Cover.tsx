import Image from 'next/image'

const Cover = ({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}) => {
  return (
    <figure className="mb-6">
      <Image
        src={src}
        alt={alt}
        width={width || 1200}
        height={height || 675}
        className="h-auto w-full rounded-lg object-cover shadow-md"
        priority
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default Cover
