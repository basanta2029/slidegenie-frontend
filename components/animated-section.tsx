'use client'

import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade-in' | 'slide-in-up' | 'slide-in-down' | 'slide-in-left' | 'slide-in-right'
  delay?: number
}

export function AnimatedSection({ 
  children, 
  className,
  animation = 'fade-in',
  delay = 0 
}: AnimatedSectionProps) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  })

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? `animate-${animation} opacity-100` : 'opacity-0',
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards' 
      }}
    >
      {children}
    </div>
  )
}