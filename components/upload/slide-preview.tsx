'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SlidePreview as SlidePreviewType } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SlidePreviewProps {
  slides: SlidePreviewType[]
  className?: string
}

export function SlidePreview({ slides, className }: SlidePreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0))
  }

  if (slides.length === 0) {
    return null
  }

  const currentSlide = slides[currentIndex]

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Preview</h3>
        <span className="text-xs text-gray-500">
          {currentIndex + 1} / {slides.length}
        </span>
      </div>

      <div className="relative">
        {/* Slide container */}
        <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden relative">
          {currentSlide.thumbnail ? (
            <img
              src={currentSlide.thumbnail}
              alt={currentSlide.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-gray-200 rounded-lg animate-pulse" />
                <p className="text-sm text-gray-500">Generating preview...</p>
              </div>
            </div>
          )}

          {/* Slide title overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h4 className="text-white text-sm font-medium">
              {currentSlide.title}
            </h4>
          </div>
        </div>

        {/* Navigation buttons */}
        {slides.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="flex justify-center space-x-1">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                index === currentIndex
                  ? 'bg-primary'
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}