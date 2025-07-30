import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slide } from '@/types'

interface PresenterNotesProps {
  currentSlide: Slide
  nextSlide?: Slide
  onClose: () => void
}

export default function PresenterNotes({
  currentSlide,
  nextSlide,
  onClose
}: PresenterNotesProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Presenter View</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Current Slide Notes */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Current Slide Notes
          </h4>
          <div className="bg-muted/50 rounded-lg p-4">
            {currentSlide.notes ? (
              <p className="text-sm whitespace-pre-wrap">{currentSlide.notes}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No speaker notes for this slide
              </p>
            )}
          </div>
        </div>

        {/* Timer */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Presentation Timer
          </h4>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <span className="text-2xl font-mono">00:00</span>
            <p className="text-xs text-muted-foreground mt-1">
              Press spacebar to start/pause
            </p>
          </div>
        </div>

        {/* Next Slide Preview */}
        {nextSlide && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Next Slide
            </h4>
            <div className="bg-muted/50 rounded-lg p-4">
              <h5 className="font-medium mb-2">
                {nextSlide.content.data?.title || 'Next Slide'}
              </h5>
              {nextSlide.notes && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {nextSlide.notes}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Quick Tips */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Quick Tips
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use arrow keys to navigate</li>
            <li>• Press F for fullscreen</li>
            <li>• Press G to show slide grid</li>
            <li>• Press ESC to exit presenter view</li>
          </ul>
        </div>
      </div>
    </div>
  )
}