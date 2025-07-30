import { Slide } from '@/types'

interface SlideViewerProps {
  slide: Slide
  isFullscreen?: boolean
  slideNumber: number
  totalSlides: number
}

export default function SlideViewer({
  slide,
  isFullscreen = false,
  slideNumber,
  totalSlides
}: SlideViewerProps) {
  const renderContent = () => {
    const { type, data } = slide.content

    switch (type) {
      case 'text':
        return (
          <div className="prose prose-lg max-w-none">
            {data.title && (
              <h1 className="text-4xl font-bold mb-8">{data.title}</h1>
            )}
            {data.content && (
              <div 
                className="text-xl leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            )}
          </div>
        )
      
      case 'image':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            {data.title && (
              <h2 className="text-3xl font-bold mb-6">{data.title}</h2>
            )}
            <img
              src={data.url}
              alt={data.alt || 'Slide image'}
              className="max-w-full max-h-[70vh] object-contain"
            />
            {data.caption && (
              <p className="mt-4 text-lg text-muted-foreground">{data.caption}</p>
            )}
          </div>
        )
      
      case 'mixed':
        return (
          <div className="h-full">
            {data.title && (
              <h2 className="text-3xl font-bold mb-6">{data.title}</h2>
            )}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </div>
        )
      
      default:
        return (
          <div className="text-center text-muted-foreground">
            <p>Unsupported content type</p>
          </div>
        )
    }
  }

  const layoutClasses = {
    'title': 'flex items-center justify-center text-center',
    'title-content': 'flex flex-col justify-center',
    'two-column': 'grid grid-cols-2 gap-8',
    'image-right': 'grid grid-cols-2 gap-8',
    'image-left': 'grid grid-cols-2 gap-8',
    'full-image': 'flex items-center justify-center',
    'comparison': 'grid grid-cols-2 gap-8',
    'quote': 'flex items-center justify-center text-center'
  }

  return (
    <div className={`relative h-full flex items-center justify-center ${
      isFullscreen ? 'p-16' : 'p-8'
    }`}>
      <div className={`w-full max-w-7xl mx-auto ${
        isFullscreen ? 'h-full' : 'aspect-[16/9]'
      } bg-white rounded-lg shadow-2xl p-12`}>
        <div className={`h-full ${layoutClasses[slide.layout] || ''}`}>
          {renderContent()}
        </div>
      </div>
      
      {/* Slide Number */}
      {!isFullscreen && (
        <div className="absolute bottom-4 right-4 text-sm text-muted-foreground">
          {slideNumber} / {totalSlides}
        </div>
      )}
    </div>
  )
}