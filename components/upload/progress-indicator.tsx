'use client'

import { cn } from '@/lib/utils'
import { Check, Loader2 } from 'lucide-react'
import { GenerationProgress } from '@/types'

interface ProgressIndicatorProps {
  progress: GenerationProgress
  className?: string
}

const STAGES = [
  {
    id: 'analyzing',
    label: 'Analyzing content',
    description: 'Understanding your document structure',
  },
  {
    id: 'structuring',
    label: 'Understanding structure',
    description: 'Organizing information into slides',
  },
  {
    id: 'generating',
    label: 'Generating slides',
    description: 'Creating your presentation',
  },
  {
    id: 'finalizing',
    label: 'Finalizing presentation',
    description: 'Adding final touches',
  },
]

export function ProgressIndicator({ progress, className }: ProgressIndicatorProps) {
  const currentStageIndex = STAGES.findIndex((s) => s.id === progress.stage)

  return (
    <div className={cn('space-y-8', className)}>
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700">
            {STAGES[currentStageIndex]?.label || 'Processing...'}
          </span>
          <span className="text-gray-500">{progress.progress}%</span>
        </div>
        
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress.progress}%` }}
          />
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>

        {progress.message && (
          <p className="text-sm text-gray-600 mt-1">{progress.message}</p>
        )}
      </div>

      {/* Stage indicators */}
      <div className="space-y-4">
        {STAGES.map((stage, index) => {
          const isCompleted = index < currentStageIndex
          const isCurrent = index === currentStageIndex
          const isPending = index > currentStageIndex

          return (
            <div
              key={stage.id}
              className={cn(
                'flex items-start space-x-3',
                isPending && 'opacity-50'
              )}
            >
              <div className="flex-shrink-0 mt-0.5">
                {isCompleted ? (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                ) : isCurrent ? (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-gray-300 rounded-full" />
                )}
              </div>

              <div className="flex-1">
                <h4 className={cn(
                  'text-sm font-medium',
                  isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                )}>
                  {stage.label}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {stage.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Slide count */}
      {progress.currentSlide && progress.totalSlides && (
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Generating slide {progress.currentSlide} of {progress.totalSlides}
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}