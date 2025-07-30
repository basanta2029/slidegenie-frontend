import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: {
    default: 'SlideGenie - Academic Presentation Generator',
    template: '%s | SlideGenie',
  },
  description: 'Transform your academic content into professional presentations with AI-powered assistance',
  keywords: ['academic', 'presentation', 'slides', 'AI', 'generator', 'education'],
  authors: [{ name: 'SlideGenie Team' }],
  creator: 'SlideGenie',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://slidegenie.com',
    siteName: 'SlideGenie',
    title: 'SlideGenie - Academic Presentation Generator',
    description: 'Transform your academic content into professional presentations',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SlideGenie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SlideGenie - Academic Presentation Generator',
    description: 'Transform your academic content into professional presentations',
    images: ['/og-image.png'],
    creator: '@slidegenie',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}