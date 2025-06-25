interface BlogPostDateProps {
  dateString: string
  dateFormatted?: string
}

export default function BlogPostDate({
  dateString,
  dateFormatted,
}: BlogPostDateProps) {
  return <time dateTime={dateString}>{dateFormatted || dateString}</time>
}
