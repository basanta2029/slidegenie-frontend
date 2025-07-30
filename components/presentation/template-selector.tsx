import { SlideLayout } from '@/types'
import { 
  Layout, 
  LayoutGrid, 
  Square, 
  Columns, 
  Image as ImageIcon,
  Quote,
  Type
} from 'lucide-react'

interface TemplateSelectorProps {
  currentLayout: SlideLayout
  onSelectLayout: (layout: SlideLayout) => void
}

const layouts: {
  value: SlideLayout
  label: string
  icon: React.ReactNode
  description: string
}[] = [
  {
    value: 'title',
    label: 'Title Slide',
    icon: <Type className="w-5 h-5" />,
    description: 'Large centered title with optional subtitle'
  },
  {
    value: 'title-content',
    label: 'Title & Content',
    icon: <Layout className="w-5 h-5" />,
    description: 'Standard slide with title and body text'
  },
  {
    value: 'two-column',
    label: 'Two Columns',
    icon: <Columns className="w-5 h-5" />,
    description: 'Side-by-side content layout'
  },
  {
    value: 'image-right',
    label: 'Image Right',
    icon: <LayoutGrid className="w-5 h-5" />,
    description: 'Content on left, image on right'
  },
  {
    value: 'image-left',
    label: 'Image Left',
    icon: <LayoutGrid className="w-5 h-5 scale-x-[-1]" />,
    description: 'Image on left, content on right'
  },
  {
    value: 'full-image',
    label: 'Full Image',
    icon: <ImageIcon className="w-5 h-5" />,
    description: 'Full-screen image with optional caption'
  },
  {
    value: 'comparison',
    label: 'Comparison',
    icon: <Square className="w-5 h-5" />,
    description: 'Two items side-by-side for comparison'
  },
  {
    value: 'quote',
    label: 'Quote',
    icon: <Quote className="w-5 h-5" />,
    description: 'Centered quote with attribution'
  }
]

export default function TemplateSelector({ currentLayout, onSelectLayout }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {layouts.map((layout) => (
        <button
          key={layout.value}
          onClick={() => onSelectLayout(layout.value)}
          className={`
            p-4 border rounded-lg text-left transition-all
            ${currentLayout === layout.value
              ? 'border-primary bg-primary/5 ring-2 ring-primary'
              : 'border-border hover:border-muted-foreground'
            }
          `}
        >
          <div className="flex items-start gap-3">
            <div className={`
              p-2 rounded
              ${currentLayout === layout.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
              }
            `}>
              {layout.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{layout.label}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {layout.description}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}