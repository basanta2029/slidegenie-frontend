'use client'

import { cn } from '@/lib/utils'

interface TemplatePreviewProps {
  category: 'academic' | 'business' | 'creative' | 'minimal'
  className?: string
}

export function TemplatePreview({ category, className }: TemplatePreviewProps) {
  const getPreviewElements = () => {
    switch (category) {
      case 'academic':
        return (
          <>
            <div className="absolute top-4 left-4 right-4">
              <div className="h-2 bg-blue-600 rounded w-3/4 mb-2" />
              <div className="h-1.5 bg-blue-400 rounded w-1/2" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 space-y-1">
              <div className="h-1 bg-gray-300 rounded" />
              <div className="h-1 bg-gray-300 rounded w-5/6" />
              <div className="h-1 bg-gray-300 rounded w-4/6" />
            </div>
          </>
        )
      case 'business':
        return (
          <>
            <div className="absolute top-4 left-4 w-1/3">
              <div className="h-12 bg-green-600 rounded mb-2" />
            </div>
            <div className="absolute top-4 right-4 w-1/2">
              <div className="h-2 bg-gray-700 rounded mb-1" />
              <div className="h-1.5 bg-gray-500 rounded w-3/4" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
              <div className="h-8 bg-gray-200 rounded" />
              <div className="h-8 bg-gray-200 rounded" />
              <div className="h-8 bg-gray-200 rounded" />
            </div>
          </>
        )
      case 'creative':
        return (
          <>
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500 rounded-bl-full opacity-70" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-pink-500 rounded-tr-full opacity-70" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-3 bg-purple-700 rounded w-24 mb-1" />
              <div className="h-2 bg-purple-500 rounded w-16 mx-auto" />
            </div>
          </>
        )
      case 'minimal':
        return (
          <>
            <div className="absolute top-1/3 left-8 right-8">
              <div className="h-2 bg-gray-800 rounded w-2/3 mb-2" />
              <div className="h-1 bg-gray-400 rounded w-1/2" />
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="h-0.5 bg-gray-300 rounded mb-1" />
              <div className="h-0.5 bg-gray-300 rounded w-4/5" />
            </div>
          </>
        )
    }
  }

  return (
    <div className={cn('relative w-full h-full bg-white', className)}>
      {getPreviewElements()}
    </div>
  )
}