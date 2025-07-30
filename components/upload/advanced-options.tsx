'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PresentationConfig } from '@/types'

interface AdvancedOptionsProps {
  config: Partial<PresentationConfig>
  onChange: (config: Partial<PresentationConfig>) => void
  className?: string
}

const COLOR_SCHEMES = [
  { value: 'default', label: 'Default', colors: ['#3B82F6', '#60A5FA', '#93BBFC'] },
  { value: 'professional', label: 'Professional', colors: ['#1F2937', '#4B5563', '#9CA3AF'] },
  { value: 'nature', label: 'Nature', colors: ['#10B981', '#34D399', '#6EE7B7'] },
  { value: 'warm', label: 'Warm', colors: ['#F59E0B', '#FBBF24', '#FCD34D'] },
  { value: 'elegant', label: 'Elegant', colors: ['#7C3AED', '#A78BFA', '#C4B5FD'] },
]

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ja', label: 'Japanese' },
]

export function AdvancedOptions({
  config,
  onChange,
  className,
}: AdvancedOptionsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateConfig = (key: keyof PresentationConfig, value: any) => {
    onChange({
      ...config,
      [key]: value,
    })
  }

  return (
    <div className={cn('border border-gray-200 rounded-lg', className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700">
          Advanced Options
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-gray-500 transition-transform',
            isExpanded && 'rotate-180'
          )}
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-200">
          {/* Checkboxes */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="citations"
                checked={config.includeCitations || false}
                onCheckedChange={(checked) => updateConfig('includeCitations', checked)}
              />
              <Label
                htmlFor="citations"
                className="text-sm font-normal cursor-pointer"
              >
                Include citations and references
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="math"
                checked={config.includeMath || false}
                onCheckedChange={(checked) => updateConfig('includeMath', checked)}
              />
              <Label
                htmlFor="math"
                className="text-sm font-normal cursor-pointer"
              >
                Support mathematical equations (LaTeX)
              </Label>
            </div>
          </div>

          {/* Color Scheme */}
          <div className="space-y-2">
            <Label htmlFor="colorScheme" className="text-sm">
              Color Scheme
            </Label>
            <Select
              value={config.colorScheme || 'default'}
              onValueChange={(value) => updateConfig('colorScheme', value)}
            >
              <SelectTrigger id="colorScheme" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLOR_SCHEMES.map((scheme) => (
                  <SelectItem key={scheme.value} value={scheme.value}>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {scheme.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span>{scheme.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label htmlFor="language" className="text-sm">
              Language
            </Label>
            <Select
              value={config.language || 'en'}
              onValueChange={(value) => updateConfig('language', value)}
            >
              <SelectTrigger id="language" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Info text */}
          <p className="text-xs text-gray-500 pt-2">
            These options may affect generation time and cost.
          </p>
        </div>
      )}
    </div>
  )
}