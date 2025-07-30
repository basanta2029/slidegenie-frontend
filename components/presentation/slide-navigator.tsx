import { Slide } from '@/types'

interface SlideNavigatorProps {
  slides: Slide[]
  currentIndex: number
  onSelectSlide: (index: number) => void
}

export default function SlideNavigator({
  slides,
  currentIndex,
  onSelectSlide
}: SlideNavigatorProps) {
  return (
    <div className="p-4 space-y-2">
      {slides.map((slide, index) => {
        const isActive = index === currentIndex
        const slideTitle = slide.content.data?.title || `Slide ${index + 1}`
        
        return (
          <button
            key={slide.id}
            onClick={() => onSelectSlide(index)}
            className={`w-full text-left p-3 rounded-lg transition-all ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className={`text-sm font-medium ${
                isActive ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}>
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${
                  isActive ? 'text-primary-foreground' : ''
                }`}>
                  {slideTitle}
                </p>
                {slide.content.type && (
                  <p className={`text-xs mt-1 ${
                    isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  }`}>
                    {slide.content.type}
                  </p>
                )}
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}