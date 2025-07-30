'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { X, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProgressIndicator } from '@/components/upload/progress-indicator'
import { SlidePreview } from '@/components/upload/slide-preview'
import { useWebSocket } from '@/hooks/use-websocket'
import { GenerationProgress } from '@/types'
import { toast } from 'sonner'
import { presentationService } from '@/services/presentation.service'

export default function ProgressPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const generationId = searchParams.get('id')
  
  const [progress, setProgress] = useState<GenerationProgress>({
    id: generationId || '',
    stage: 'analyzing',
    progress: 0,
    preview: [],
  })
  
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // WebSocket connection
  const { isConnected, lastMessage } = useWebSocket({
    url: `${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'}/generation/${generationId}`,
    onMessage: (data: GenerationProgress) => {
      setProgress(data)
      
      // Check if generation is complete
      if (data.progress === 100 && data.stage === 'finalizing') {
        setTimeout(() => {
          setIsComplete(true)
          toast.success('Presentation generated successfully!')
          // Redirect to the presentation view/edit page
          setTimeout(() => {
            router.push(`/presentations/${data.id}/edit`)
          }, 2000)
        }, 1000)
      }
    },
    onError: (error) => {
      console.error('WebSocket error:', error)
      setError('Connection lost. Trying to reconnect...')
    },
    onClose: () => {
      if (!isComplete) {
        setError('Connection to server lost')
      }
    },
  })

  // Simulate progress for demo purposes
  useEffect(() => {
    if (!isConnected) {
      // Simulate progress when not connected to real WebSocket
      const stages: GenerationProgress['stage'][] = ['analyzing', 'structuring', 'generating', 'finalizing']
      let currentProgress = 0
      let stageIndex = 0

      const interval = setInterval(() => {
        currentProgress += Math.random() * 10 + 5
        
        if (currentProgress >= 100) {
          currentProgress = 100
          clearInterval(interval)
          setIsComplete(true)
          
          setTimeout(() => {
            router.push(`/presentations/demo-id/edit`)
          }, 2000)
        }

        // Update stage based on progress
        if (currentProgress >= 80) stageIndex = 3
        else if (currentProgress >= 40) stageIndex = 2
        else if (currentProgress >= 20) stageIndex = 1

        setProgress({
          id: generationId || 'demo',
          stage: stages[stageIndex],
          progress: Math.min(currentProgress, 100),
          currentSlide: Math.floor(currentProgress / 100 * 15),
          totalSlides: 15,
          message: getProgressMessage(stages[stageIndex], currentProgress),
          preview: generateMockPreviews(Math.floor(currentProgress / 100 * 15)),
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isConnected, generationId, router])

  const handleCancel = async () => {
    if (confirm('Are you sure you want to cancel the generation?')) {
      try {
        if (generationId) {
          await presentationService.cancelGeneration(generationId)
        }
        router.push('/create')
      } catch (error) {
        console.error('Failed to cancel generation:', error)
        toast.error('Failed to cancel generation')
      }
    }
  }

  const handleRetry = async () => {
    setError(null)
    setProgress({
      id: generationId || '',
      stage: 'analyzing',
      progress: 0,
      preview: [],
    })
    
    try {
      if (generationId) {
        await presentationService.retryGeneration(generationId)
        toast.success('Retrying generation...')
      }
    } catch (error) {
      console.error('Failed to retry generation:', error)
      toast.error('Failed to retry generation')
      setError('Failed to retry generation')
    }
  }

  const estimatedTime = () => {
    const remainingProgress = 100 - progress.progress
    const secondsPerPercent = 2 // Rough estimate
    const remainingSeconds = remainingProgress * secondsPerPercent
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = remainingSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Generation Error
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => router.push('/create')}
              className="flex-1"
            >
              Go Back
            </Button>
            <Button onClick={handleRetry} className="flex-1">
              Retry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Presentation Ready!
          </h2>
          <p className="text-gray-600 mb-6">
            Your presentation has been generated successfully. Redirecting...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Generating Your Presentation
            </h1>
            <p className="text-gray-600">
              Estimated time remaining: {estimatedTime()}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}
            disabled={isComplete}
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <ProgressIndicator progress={progress} />
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <SlidePreview slides={progress.preview || []} />
            </div>

            {/* Connection Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'
                }`} />
                <span className="text-sm text-gray-600">
                  {isConnected ? 'Connected' : 'Simulating progress (WebSocket not connected)'}
                </span>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                Did you know?
              </h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Your presentation will be saved automatically</li>
                <li>• You can edit all slides after generation</li>
                <li>• AI analyzes your content structure for optimal flow</li>
                <li>• Templates are customizable after generation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper functions
function getProgressMessage(stage: GenerationProgress['stage'], progress: number): string {
  const messages = {
    analyzing: [
      'Reading your document...',
      'Extracting key concepts...',
      'Identifying main topics...',
    ],
    structuring: [
      'Organizing content flow...',
      'Creating slide outline...',
      'Determining optimal structure...',
    ],
    generating: [
      'Creating slide content...',
      'Generating visuals...',
      'Adding transitions...',
    ],
    finalizing: [
      'Applying final touches...',
      'Optimizing layout...',
      'Preparing for viewing...',
    ],
  }

  const stageMessages = messages[stage]
  const messageIndex = Math.floor((progress / 100) * stageMessages.length)
  return stageMessages[Math.min(messageIndex, stageMessages.length - 1)]
}

function generateMockPreviews(count: number): any[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `slide-${i + 1}`,
    title: `Slide ${i + 1}`,
    order: i + 1,
  }))
}