import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Guest Book',
  description: 'A minimalist guest book application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
