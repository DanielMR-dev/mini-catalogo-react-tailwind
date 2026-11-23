const paths = {
  bag: 'M5 8h14l2 13H3L5 8Zm4 1V6a3 3 0 0 1 6 0v3',
  heart: 'M20.8 8.6c0 4.3-8.8 9.4-8.8 9.4S3.2 12.9 3.2 8.6a4.5 4.5 0 0 1 8.8-1.3 4.5 4.5 0 0 1 8.8 1.3Z',
  search: 'm20 20-4.3-4.3M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z',
  chevron: 'm6 9 6 6 6-6',
  alert: 'M12 8v4m0 4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
}

export function Icon({ name, className }: { name: keyof typeof paths; className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  )
}
