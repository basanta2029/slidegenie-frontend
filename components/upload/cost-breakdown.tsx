'use client'

import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PresentationConfig } from '@/types'

interface CostBreakdownProps {
  config: Partial<PresentationConfig>
  className?: string
}

interface CostItem {
  label: string
  value: number
  info?: string
}

export function CostBreakdown({ config, className }: CostBreakdownProps) {
  const calculateCosts = (): CostItem[] => {
    const costs: CostItem[] = []
    
    // Base cost
    costs.push({
      label: 'Base generation',
      value: 0.5,
      info: 'Core AI processing and slide generation',
    })

    // Duration-based cost
    if (config.duration) {
      const durationCost = (config.duration / 10) * 0.3
      costs.push({
        label: `${config.duration} minutes duration`,
        value: durationCost,
        info: 'Longer presentations require more processing',
      })
    }

    // Advanced features
    if (config.includeCitations) {
      costs.push({
        label: 'Citation processing',
        value: 0.2,
        info: 'Extract and format academic citations',
      })
    }

    if (config.includeMath) {
      costs.push({
        label: 'Mathematical equations',
        value: 0.2,
        info: 'LaTeX equation rendering and formatting',
      })
    }

    // Template complexity
    if (config.template && ['creative-bold', 'business-pro'].includes(config.template)) {
      costs.push({
        label: 'Premium template',
        value: 0.1,
        info: 'Advanced design elements and animations',
      })
    }

    return costs
  }

  const costs = calculateCosts()
  const total = costs.reduce((sum, cost) => sum + cost.value, 0)

  return (
    <div className={cn('space-y-3', className)}>
      <div className="space-y-2">
        {costs.map((cost, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <span className="text-gray-600">{cost.label}</span>
              {cost.info && (
                <div className="group relative">
                  <Info className="w-3 h-3 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                    <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                      {cost.info}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-gray-900" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <span className="text-gray-700">${cost.value.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">Total cost</span>
          <span className="text-lg font-semibold text-gray-900">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}