import { MoreVertical, Copy, Trash2, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Slide } from '@/types'

interface SlideListProps {
  slides: Slide[]
  selectedIndex: number
  onSelectSlide: (index: number) => void
  onReorderSlides: (startIndex: number, endIndex: number) => void
  onDuplicateSlide: (index: number) => void
  onDeleteSlide: (index: number) => void
}

export default function SlideList({
  slides,
  selectedIndex,
  onSelectSlide,
  onReorderSlides,
  onDuplicateSlide,
  onDeleteSlide
}: SlideListProps) {
  const generateThumbnail = (slide: Slide) => {
    const { data } = slide.content
    const title = data.title || `Slide ${slide.order + 1}`
    
    return (
      <div className="w-full aspect-[16/9] bg-white rounded border p-2 text-xs">
        <p className="font-medium truncate">{title}</p>
        {data.content && (
          <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">
            {data.content.replace(/<[^>]*>/g, '')}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="p-4 space-y-2">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`
            relative group transition-all
            ${selectedIndex === index ? 'ring-2 ring-primary' : ''}
          `}
        >
          <div
            onClick={() => onSelectSlide(index)}
            className={`
              cursor-pointer rounded-lg overflow-hidden
              ${selectedIndex === index ? 'bg-primary/10' : 'hover:bg-muted'}
            `}
          >
            <div className="p-2">
              <div className="flex items-start gap-2">
                <div className="flex items-center gap-1">
                  <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 cursor-move" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  {generateThumbnail(slide)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions Menu */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                >
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => onDuplicateSlide(index)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDeleteSlide(index)}
                  disabled={slides.length <= 1}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}