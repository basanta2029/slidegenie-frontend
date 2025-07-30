'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Template } from '@/types'
import { TemplatePreview } from './template-preview'

interface TemplateSelectorProps {
  templates: Template[]
  selectedId?: string
  onSelect: (templateId: string) => void
  className?: string
}

// Mock templates for demonstration
const DEFAULT_TEMPLATES: Template[] = [
  {
    id: 'academic-modern',
    name: 'Academic Modern',
    description: 'Clean and professional design for research presentations',
    category: 'academic',
    thumbnail: '/templates/academic-modern.png',
    slides: [],
  },
  {
    id: 'business-pro',
    name: 'Business Professional',
    description: 'Sleek design for corporate presentations',
    category: 'business',
    thumbnail: '/templates/business-pro.png',
    slides: [],
  },
  {
    id: 'creative-bold',
    name: 'Creative Bold',
    description: 'Vibrant and dynamic design for creative projects',
    category: 'creative',
    thumbnail: '/templates/creative-bold.png',
    slides: [],
  },
  {
    id: 'minimal-elegant',
    name: 'Minimal Elegant',
    description: 'Simple and elegant design focusing on content',
    category: 'minimal',
    thumbnail: '/templates/minimal-elegant.png',
    slides: [],
  },
]

export function TemplateSelector({
  templates = DEFAULT_TEMPLATES,
  selectedId,
  onSelect,
  className,
}: TemplateSelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className={cn('grid grid-cols-2 gap-4', className)}>
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          onMouseEnter={() => setHoveredId(template.id)}
          onMouseLeave={() => setHoveredId(null)}
          className={cn(
            'relative group rounded-lg overflow-hidden border-2 transition-all',
            selectedId === template.id
              ? 'border-primary shadow-lg'
              : 'border-gray-200 hover:border-gray-300'
          )}
        >
          {/* Thumbnail */}
          <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
            <TemplatePreview category={template.category} />
            
            {/* Category badge */}
            <div className="absolute top-2 left-2">
              <span className={cn(
                'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium',
                template.category === 'academic' && 'bg-blue-100 text-blue-700',
                template.category === 'business' && 'bg-green-100 text-green-700',
                template.category === 'creative' && 'bg-purple-100 text-purple-700',
                template.category === 'minimal' && 'bg-gray-100 text-gray-700'
              )}>
                {template.category}
              </span>
            </div>

            {/* Selected indicator */}
            {selectedId === template.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}

            {/* Hover overlay */}
            <div className={cn(
              'absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity',
              hoveredId === template.id ? 'opacity-100' : 'opacity-0'
            )}>
              <span className="text-white text-sm font-medium">
                Select Template
              </span>
            </div>
          </div>

          {/* Template info */}
          <div className="p-4 text-left">
            <h3 className="font-medium text-sm text-gray-900 mb-1">
              {template.name}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2">
              {template.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}