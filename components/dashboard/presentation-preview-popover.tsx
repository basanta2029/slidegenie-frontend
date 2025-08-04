"use client"

import * as React from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { FileText as FileTextIcon, Clock as ClockIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Slide {
  id: string
  order: number
  title?: string
  thumbnail?: string
}

interface PresentationPreviewPopoverProps {
  presentationId: string
  title: string
  description?: string
  slides?: Slide[]
  slideCount: number
  lastModified: Date
  template: string
  children: React.ReactNode
  className?: string
  isLoading?: boolean
}

export function PresentationPreviewPopover({
  presentationId,
  title,
  description,
  slides = [],
  slideCount,
  lastModified,
  template,
  children,
  className,
  isLoading = false,
}: PresentationPreviewPopoverProps) {
  const [shouldLoad, setShouldLoad] = React.useState(false)
  const [loadedSlides, setLoadedSlides] = React.useState<Slide[]>([])
  const [loading, setLoading] = React.useState(false)

  // Mock function to simulate fetching slides
  // Replace this with actual API call to fetch presentation slides
  const fetchSlides = React.useCallback(async () => {
    if (!shouldLoad || loadedSlides.length > 0) return
    
    setLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock slides data - replace with actual API call
      const mockSlides: Slide[] = Array.from({ length: Math.min(6, slideCount) }, (_, i) => ({
        id: `${presentationId}-slide-${i + 1}`,
        order: i + 1,
        title: `Slide ${i + 1}`,
        thumbnail: undefined, // In real implementation, this would be the actual thumbnail URL
      }))
      
      setLoadedSlides(mockSlides)
    } catch (error) {
      console.error("Failed to fetch slides:", error)
    } finally {
      setLoading(false)
    }
  }, [presentationId, slideCount, shouldLoad, loadedSlides.length])

  React.useEffect(() => {
    if (shouldLoad) {
      fetchSlides()
    }
  }, [shouldLoad, fetchSlides])

  const displaySlides = slides.length > 0 ? slides : loadedSlides

  return (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild onMouseEnter={() => setShouldLoad(true)}>
        {children}
      </HoverCardTrigger>
      <HoverCardContent 
        className={cn("w-[400px] p-0 overflow-hidden", className)}
        side="right"
        align="start"
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="p-4 pb-0 space-y-2">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold leading-none">{title}</h4>
              {description && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {description}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileTextIcon className="h-3 w-3" />
                {slideCount} slides
              </span>
              <Badge variant="outline" className="text-xs">
                {template}
              </Badge>
              <span className="flex items-center gap-1">
                <ClockIcon className="h-3 w-3" />
                {formatDistanceToNow(lastModified, { addSuffix: true })}
              </span>
            </div>
          </div>

          {/* Slides Grid */}
          <div className="px-4 pb-4">
            <div className="grid grid-cols-3 gap-2">
              {(loading || isLoading) ? (
                // Loading skeletons
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-1">
                    <Skeleton className="aspect-[16/9] rounded" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                ))
              ) : displaySlides.length > 0 ? (
                // Actual slides
                displaySlides.slice(0, 6).map((slide) => (
                  <div key={slide.id} className="space-y-1">
                    <div className="aspect-[16/9] rounded bg-muted border border-border overflow-hidden">
                      {slide.thumbnail ? (
                        <img 
                          src={slide.thumbnail} 
                          alt={slide.title || `Slide ${slide.order}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                          <FileTextIcon className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {slide.title || `Slide ${slide.order}`}
                    </p>
                  </div>
                ))
              ) : (
                // Empty state
                <div className="col-span-3 py-8 text-center text-xs text-muted-foreground">
                  No slide previews available
                </div>
              )}
            </div>
            
            {displaySlides.length > 6 && (
              <p className="mt-2 text-xs text-center text-muted-foreground">
                +{displaySlides.length - 6} more slides
              </p>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}