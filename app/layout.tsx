import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '이규빈 포트폴리오',
  description: 'Backend Developer Portfolio',
  openGraph: {
    title: '이규빈 포트폴리오',
    description: 'Backend Developer Portfolio',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '이규빈 포트폴리오',
    description: 'Backend Developer Portfolio',
    images: ['/og-image.png'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}