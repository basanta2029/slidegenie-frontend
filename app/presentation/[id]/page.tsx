'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Share2, 
  Edit, 
  Download,
  Grid,
  X,
  Users,
  MessageSquare
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { presentationService } from '@/services/presentation.service'
import { Presentation, Slide } from '@/types'
import SlideViewer from '@/components/presentation/slide-viewer'
import SlideNavigator from '@/components/presentation/slide-navigator'
import ShareModal from '@/components/presentation/share-modal'
import PresenterNotes from '@/components/presentation/presenter-notes'
import KeyboardShortcuts from '@/components/presentation/keyboard-shortcuts'
import CollaboratorAvatars from '@/components/presentation/collaborator-avatars'

export default function PresentationViewerPage() {
  const params = useParams()
  const router = useRouter()
  const presentationId = params.id as string
  
  const [presentation, setPresentation] = useState<Presentation | null>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showThumbnails, setShowThumbnails] = useState(false)
  const [showPresenterView, setShowPresenterView] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)

  useEffect(() => {
    loadPresentation()
  }, [presentationId])

  const loadPresentation = async () => {
    try {
      setIsLoading(true)
      const data = await presentationService.getPresentation(presentationId)
      setPresentation(data)
    } catch (error) {
      console.error('Failed to load presentation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const currentSlide = presentation?.slides[currentSlideIndex]
  const nextSlide = presentation?.slides[currentSlideIndex + 1]

  const navigateSlide = useCallback((direction: 'prev' | 'next') => {
    if (!presentation) return
    
    if (direction === 'prev' && currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1)
    } else if (direction === 'next' && currentSlideIndex < presentation.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }, [currentSlideIndex, presentation])

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index)
    setShowThumbnails(false)
  }

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigateSlide('prev')
      if (e.key === 'ArrowRight') navigateSlide('next')
      if (e.key === 'f' || e.key === 'F') toggleFullscreen()
      if (e.key === 'g' || e.key === 'G') setShowThumbnails(!showThumbnails)
      if (e.key === 'p' || e.key === 'P') setShowPresenterView(!showPresenterView)
      if (e.key === 'Escape') {
        if (showThumbnails) setShowThumbnails(false)
        if (showPresenterView) setShowPresenterView(false)
        if (showShareModal) setShowShareModal(false)
      }
      if (e.key === '?') setShowShortcuts(!showShortcuts)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [navigateSlide, showThumbnails, showPresenterView, showShareModal, showShortcuts])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading presentation...</p>
        </div>
      </div>
    )
  }

  if (!presentation || !currentSlide) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive mb-4">Presentation not found</p>
          <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Header Bar */}
      {!isFullscreen && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-background/95 backdrop-blur border-b">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard')}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <h1 className="text-lg font-semibold">{presentation.title}</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <CollaboratorAvatars presentationId={presentationId} />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowThumbnails(!showThumbnails)}
              >
                <Grid className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/presentation/${presentationId}/edit`)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowShareModal(true)}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/presentation/${presentationId}/export`)}
              >
                <Download className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative h-screen flex">
        {/* Slide Thumbnails Sidebar */}
        {showThumbnails && (
          <div className="absolute left-0 top-0 bottom-0 z-30 w-64 bg-background border-r overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Slides</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowThumbnails(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <SlideNavigator
              slides={presentation.slides}
              currentIndex={currentSlideIndex}
              onSelectSlide={goToSlide}
            />
          </div>
        )}

        {/* Slide Viewer */}
        <div className="flex-1 relative">
          <SlideViewer
            slide={currentSlide}
            isFullscreen={isFullscreen}
            slideNumber={currentSlideIndex + 1}
            totalSlides={presentation.slides.length}
          />

          {/* Navigation Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-10">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => navigateSlide('prev')}
              disabled={currentSlideIndex === 0}
              className="bg-background/80 backdrop-blur"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="px-4 py-2 bg-background/80 backdrop-blur rounded-md">
              <span className="text-sm font-medium">
                {currentSlideIndex + 1} / {presentation.slides.length}
              </span>
            </div>
            
            <Button
              variant="secondary"
              size="icon"
              onClick={() => navigateSlide('next')}
              disabled={currentSlideIndex === presentation.slides.length - 1}
              className="bg-background/80 backdrop-blur"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Presenter View Toggle */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowPresenterView(!showPresenterView)}
            className="absolute bottom-8 right-8 bg-background/80 backdrop-blur"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Presenter View
          </Button>
        </div>

        {/* Presenter Notes */}
        {showPresenterView && (
          <div className="absolute right-0 top-0 bottom-0 z-30 w-96 bg-background border-l">
            <PresenterNotes
              currentSlide={currentSlide}
              nextSlide={nextSlide}
              onClose={() => setShowPresenterView(false)}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      {showShareModal && (
        <ShareModal
          presentationId={presentationId}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {showShortcuts && (
        <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />
      )}
    </div>
  )
}