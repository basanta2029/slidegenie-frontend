'use client'

import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DurationSliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

const DURATION_PRESETS = [5, 10, 15, 20, 30, 45, 60]

export function DurationSlider({
  value,
  onChange,
  min = 5,
  max = 60,
  step = 5,
  className,
}: DurationSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100

  const estimatedSlides = Math.ceil(value / 2) // Rough estimate: 2 minutes per slide

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            Presentation Duration
          </span>
        </div>
        <div className="text-right">
          <span className="text-2xl font-semibold text-gray-900">{value}</span>
          <span className="text-sm text-gray-500 ml-1">minutes</span>
        </div>
      </div>

      {/* Slider */}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, rgb(59 130 246) 0%, rgb(59 130 246) ${percentage}%, rgb(229 231 235) ${percentage}%, rgb(229 231 235) 100%)`,
          }}
        />
        
        {/* Tick marks */}
        <div className="flex justify-between mt-2">
          {DURATION_PRESETS.filter(d => d >= min && d <= max).map((duration) => (
            <button
              key={duration}
              onClick={() => onChange(duration)}
              className={cn(
                'text-xs font-medium transition-colors',
                value === duration ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
              )}
            >
              {duration}
            </button>
          ))}
        </div>
      </div>

      {/* Estimated slides */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Estimated slides:</span>
        <span className="font-medium text-gray-700">~{estimatedSlides} slides</span>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: rgb(59 130 246);
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: rgb(59 130 246);
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  )
}