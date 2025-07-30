import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Presentation - SlideGenie',
  description: 'View and edit your presentation',
}

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}