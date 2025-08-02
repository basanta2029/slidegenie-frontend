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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || '',
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
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Suppress MetaMask and other extension errors in development
                if (typeof window !== 'undefined') {
                  const originalError = console.error;
                  const originalWarn = console.warn;
                  
                  console.error = (...args) => {
                    const errorString = args[0]?.toString?.() || '';
                    if (
                      errorString.includes('MetaMask') ||
                      errorString.includes('ethereum') ||
                      errorString.includes('chrome-extension://') ||
                      errorString.includes('Failed to connect')
                    ) {
                      return; // Suppress these errors
                    }
                    originalError.apply(console, args);
                  };
                  
                  console.warn = (...args) => {
                    const warnString = args[0]?.toString?.() || '';
                    if (warnString.includes('MetaMask') || warnString.includes('ethereum')) {
                      return; // Suppress these warnings
                    }
                    originalWarn.apply(console, args);
                  };
                }
              `,
            }}
          />
        )}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}